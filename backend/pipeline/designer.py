import os
import re
from huggingface_hub import InferenceClient

def generate_sequence(prompt: str) -> dict:
    import os, json, re
    hf_token = os.getenv("HF_TOKEN")
    client = InferenceClient(model="meta-llama/Meta-Llama-3-8B-Instruct", token=hf_token)
    
    system_prompt = """You are a computational biologist designing a true de novo protein.
    You MUST respond with ONLY a valid JSON object. No markdown, no conversational text outside the JSON.
    CRITICAL INSTRUCTIONS: 
    1. You must ensure high sequence diversity to maintain structural integrity. Do NOT repeat motifs endlessly.
    2. The sequence must be 60 to 120 amino acids long.
    3. You MUST write the rationale FIRST to establish your design context.
    Format: {"clinical_rationale": "Write your detailed 2-paragraph medical explanation here FIRST.", "sequence": "YOUR_DE_NOVO_AMINO_ACID_SEQUENCE"}"""

    try:
        # Temperature 0.6 allows for true de novo creativity while avoiding chaotic loops
        response = client.chat_completion(
            messages=[{"role":"system","content":system_prompt},{"role":"user","content":prompt}], 
            max_tokens=2048,
            temperature=0.6
        )
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
