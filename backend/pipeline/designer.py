import os
import re
from huggingface_hub import InferenceClient

def generate_sequence(prompt: str) -> dict:
    import os, json, re
    hf_token = os.getenv("HF_TOKEN")
    client = InferenceClient(model="meta-llama/Meta-Llama-3-8B-Instruct", token=hf_token)
    
    system_prompt = """You are a computational biologist.
    You MUST respond with ONLY a valid JSON object. No markdown, no conversational text.
    Format: {"sequence": "VALID_AMINO_ACIDS", "clinical_rationale": "Your detailed explanation here."}"""

    try:
        response = client.chat_completion(messages=[{"role":"system","content":system_prompt},{"role":"user","content":prompt}], max_tokens=500)
        content = response.choices[0].message.content
        
        # Secure index mapping
        start_idx = content.find('{')
        end_idx = content.rfind('}')
        
        # Ensure BOTH braces exist and the closing brace is AFTER the opening brace
        if start_idx != -1 and end_idx != -1 and end_idx > start_idx:
            json_str = content[start_idx:end_idx + 1]
            ai_data = json.loads(json_str, strict=False)
            
            return {
                "status": "success",
                "sequence": ai_data.get("sequence", "").strip().upper(),
                "clinical_rationale": ai_data.get("clinical_rationale", "No rationale."),
                "clinicalRationale": ai_data.get("clinical_rationale", "No rationale."),
                "rationale": ai_data.get("clinical_rationale", "No rationale.")
            }
        else:
            # Expose what the LLM actually said if it fails
            raise ValueError(f"Malformed LLM output: {content[:50]}...")
    except Exception as e:
        error_msg = f"Data Pipeline Error: {str(e)}"
        return {
            "status": "error",
            "message": str(e),
            "sequence": "MKKSRLALVLMVAVAGVVSVAQA",
            "clinical_rationale": error_msg,
            "clinicalRationale": error_msg,
            "rationale": error_msg
        }
