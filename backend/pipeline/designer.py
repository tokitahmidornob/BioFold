def generate_sequence(prompt: str) -> dict:
    import os, json, re
    from huggingface_hub import InferenceClient

    hf_token = os.getenv("HF_TOKEN")
    fallback_seq = "MKKSRLALVLMVAVAGVVSVAQA"

    if not hf_token:
        return {"status": "error", "message": "HF_TOKEN missing", "sequence": fallback_seq, "clinical_rationale": "Auth error.", "clinicalRationale": "Auth error.", "rationale": "Auth error."}

    target_molecule = prompt

    # Dynamic Chemical Ground-Truth Injector
    CHEM_KNOWLEDGE_BASE = {
        "digoxin": "CRITICAL CHEMICAL FACT: Digoxin (C41H64O14) is a neutral steroid glycoside. It contains ZERO nitrogen atoms and ZERO electrical charge. You MUST strictly use hydrophobic and steric interactions. The words 'electrostatic', 'nitrogen', and 'charge' are STRICTLY BANNED from the rationale.",
        "fentanyl": "CRITICAL CHEMICAL FACT: Fentanyl contains a tertiary amine. Electrostatic interactions with negatively charged residues are highly encouraged."
    }
    
    # Fetch specific constraints, default to an empty string if unknown
    target_lower = target_molecule.lower()
    dynamic_constraint = CHEM_KNOWLEDGE_BASE.get(target_lower, "")

    # 1. Force extreme concision to avoid API truncation
    system_prompt = f"""You are a computational biologist designing a de novo protein.
    CRITICAL RULES:
    1. Respond with ONLY valid JSON.
    2. The clinical_rationale MUST be a 3-paragraph scientific analysis explaining the structural stability of the TIM-barrel and the specific binding mechanism. Limit to ~150 words.
    3. ANTI-HALLUCINATION PROTOCOL: Adapt the binding mechanism to the EXACT true chemical structure of the target molecule. 
    4. THERMODYNAMIC CONSTRAINT: Circulating plasma proteins MUST be water-soluble. Never describe "surface-exposed hydrophobic residues." Hydrophobic interactions MUST be "internally facing."
    5. {dynamic_constraint}
    6. The sequence MUST be 60-100 amino acids.
    7. SYNTAX RULE: Do NOT use double quotes (") inside the text of the clinical_rationale. Use single quotes (') only.
    Format: {{"clinical_rationale": "...", "sequence": "..."}}"""

    try:
        client = InferenceClient(model="meta-llama/Llama-3.1-8B-Instruct", token=hf_token)
        response = client.chat_completion(
            messages=[{"role": "system", "content": system_prompt}, {"role": "user", "content": prompt}],
            max_tokens=1024,
            temperature=0.6
        )

        content = response.choices[0].message.content.strip()

        def parse_llm_response(raw_response):
            # Strip markdown formatting if the LLM added it
            clean_text = raw_response.replace("```json", "").replace("```", "").strip()
            
            try:
                # Attempt Standard Parse
                return json.loads(clean_text)
            except Exception as e:
                print(f"JSON Parse Error. Initiating Auto-Repair: {e}")
                # Regex Failsafe Extraction
                try:
                    # Extract sequence (look for "sequence": "AMINOACIDS")
                    seq_match = re.search(r'"sequence"\s*:\s*"([^"]+)"', clean_text, re.IGNORECASE)
                    sequence = seq_match.group(1).strip() if seq_match else ""
                    
                    # Extract rationale (look for everything between "clinical_rationale": " and ", "sequence")
                    rat_match = re.search(r'"clinical_rationale"\s*:\s*"(.*?)"\s*,?\s*"sequence"', clean_text, re.DOTALL | re.IGNORECASE)
                    rationale = rat_match.group(1).strip() if rat_match else "Rationale partially corrupted during generation, but sequence salvaged successfully."
                    
                    return {
                        "clinical_rationale": rationale,
                        "sequence": sequence
                    }
                except Exception as regex_e:
                    raise ValueError(f"Auto-Repair failed to salvage sequence. Raw Output: {clean_text}")

        ai_data = parse_llm_response(content)

        return {
            "status": "success",
            "sequence": ai_data.get("sequence", fallback_seq).strip().upper(),
            "clinical_rationale": ai_data.get("clinical_rationale", "Rationale truncated by API."),
            "clinicalRationale": ai_data.get("clinical_rationale", "Rationale truncated by API."),
            "rationale": ai_data.get("clinical_rationale", "Rationale truncated by API.")
        }

    except Exception as e:
        error_msg = f"Data Pipeline Error: {str(e)}"
        return {
            "status": "error",
            "message": error_msg,
            "sequence": fallback_seq,
            "clinical_rationale": error_msg,
            "clinicalRationale": error_msg,
            "rationale": error_msg
        }
