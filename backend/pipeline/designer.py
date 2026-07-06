import os
import re
from huggingface_hub import InferenceClient

def generate_sequence(prompt: str) -> dict:
    import os, json, re
    hf_token = os.getenv("HF_TOKEN")
    client = InferenceClient(model="meta-llama/Meta-Llama-3-8B-Instruct", token=hf_token)
    
    system_prompt = "You are a computational biologist. Respond ONLY with a valid JSON object with keys 'sequence' and 'clinical_rationale'."

    try:
        response = client.chat_completion(messages=[{"role":"system","content":system_prompt},{"role":"user","content":prompt}], max_tokens=500)
        content = response.choices[0].message.content
        
        # Find the start and end of the JSON object
        start_idx = content.find('{')
        end_idx = content.rfind('}') + 1
        
        if start_idx != -1 and end_idx != -1:
            json_str = content[start_idx:end_idx]
            ai_data = json.loads(json_str)
            
            return {
                "status": "success",
                "sequence": ai_data.get("sequence", "").strip().upper(),
                "clinical_rationale": ai_data.get("clinical_rationale", "No rationale."),
                "clinicalRationale": ai_data.get("clinical_rationale", "No rationale."),
                "rationale": ai_data.get("clinical_rationale", "No rationale.")
            }
        else:
            raise ValueError("No JSON block found in response.")
    except Exception as e:
        return {"status": "error", "message": str(e), "sequence": "MKKSRLALVLMVAVAGVVSVAQA", "clinical_rationale": "Fallback triggered."}
