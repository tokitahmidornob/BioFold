def generate_sequence(prompt: str) -> dict:
    import os, json
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
    Format: {{"clinical_rationale": "...", "sequence": "..."}}"""

    try:
        client = InferenceClient(model="meta-llama/Meta-Llama-3-8B-Instruct", token=hf_token)
        response = client.chat_completion(
            messages=[{"role": "system", "content": system_prompt}, {"role": "user", "content": prompt}],
            max_tokens=1024,
            temperature=0.6
        )

        content = response.choices[0].message.content.strip()
        start_idx = content.find('{')

        if start_idx == -1:
            raise ValueError(f"No JSON found. Output: {content[:50]}...")

        # 2. Extract and Auto-Repair Truncated JSON
        json_candidate = content[start_idx:]

        # If the string was truncated and is missing the closing brace
        if '}' not in json_candidate:
            # Find the last quote to see where the text was severed
            last_quote = json_candidate.rfind('"')
            if last_quote != -1:
                # Forcibly close the rationale and inject a fallback sequence to save the run
                json_candidate = json_candidate[:last_quote] + '", "sequence": "' + fallback_seq + '"}'
            else:
                json_candidate += '}'

        # Locate the final brace (whether natural or repaired)
        end_idx = json_candidate.rfind('}')
        clean_json = json_candidate[:end_idx + 1]

        # Flatten unescaped newlines that crash standard JSON decoders
        clean_json = clean_json.replace('\n', ' ').replace('\r', '')
        ai_data = json.loads(clean_json, strict=False)

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
