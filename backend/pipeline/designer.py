def generate_sequence(prompt: str) -> dict:
    import os, json, re
    from huggingface_hub import InferenceClient

    hf_token = os.getenv("HF_TOKEN")

    if not hf_token:
        raise RuntimeError(
            "HF_TOKEN is not configured in this Space's environment secrets. "
            "Go to Space Settings → Variables and secrets → add HF_TOKEN."
        )

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
    1. Respond with ONLY valid JSON. Return ONLY the JSON object, with no markdown, no explanation, and no formatting.
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
            max_tokens=2048,
            temperature=0.6
        )

        content = response.choices[0].message.content.strip()

        def parse_llm_response(raw_response):
            print(f"RAW LLM OUTPUT: {raw_response}")
            
            # Regex Extraction: longest continuous string of valid uppercase amino acid characters
            # Valid: A, C, D, E, F, G, H, I, K, L, M, N, P, Q, R, S, T, V, W, Y
            matches = re.findall(r'[ACDEFGHIKLMNPQRSTVWY]+', raw_response.upper())
            
            if not matches:
                raise ValueError('LLM failed to generate a valid sequence.')
                
            sequence = max(matches, key=len)
            
            if len(sequence) < 20:
                raise ValueError('LLM failed to generate a valid sequence.')
                
            # Extract rationale (look for everything between "clinical_rationale": " and ")
            rat_match = re.search(r'"clinical_rationale"\s*:\s*"(.*?)"', raw_response, re.DOTALL | re.IGNORECASE)
            rationale = rat_match.group(1).strip() if rat_match else "Rationale extracted during robust regex sequence parsing."
            
            return {
                "clinical_rationale": rationale,
                "sequence": sequence
            }

        ai_data = parse_llm_response(content)

        sequence = ai_data.get("sequence", "").strip().upper()
        if not sequence:
            raise ValueError("LLM returned an empty sequence. Cannot continue.")

        return {
            "status": "success",
            "sequence": sequence,
            "clinical_rationale": ai_data.get("clinical_rationale", "Rationale truncated by API."),
            "clinicalRationale": ai_data.get("clinical_rationale", "Rationale truncated by API."),
            "rationale": ai_data.get("clinical_rationale", "Rationale truncated by API.")
        }

    except Exception as e:
        # Re-raise so main.py catches it and returns a proper HTTP 500.
        # Never silently swallow inference errors into a fake success payload.
        raise RuntimeError(f"Bio-Designer inference failure: {str(e)}") from e
