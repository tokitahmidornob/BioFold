import os
import re
from huggingface_hub import InferenceClient

def generate_sequence(prompt: str) -> dict:
    import os, json, re
    hf_token = os.getenv("HF_TOKEN")
    client = InferenceClient(model="meta-llama/Meta-Llama-3-8B-Instruct", token=hf_token)
    
    system_prompt = "You are a computational biologist. Respond ONLY with a valid JSON object with keys 'sequence' and 'clinical_rationale'."

    # Retry logic
    for attempt in range(2):
        try:
            response = client.chat_completion(messages=[{"role":"system","content":system_prompt},{"role":"user","content":prompt}], max_tokens=500)
            content = response.choices[0].message.content
            
            # Nuclear cleaning: extract anything that looks like a JSON block
            match = re.search(r'\{.*\}', content, re.DOTALL)
            if match:
                content = match.group(0)
            
            ai_data = json.loads(content)
            return {
                "status": "success",
                "sequence": ai_data["sequence"].strip().upper(),
                "clinical_rationale": ai_data["clinical_rationale"],
                "clinicalRationale": ai_data["clinical_rationale"],
                "rationale": ai_data["clinical_rationale"]
            }
        except:
            continue
    
    # If we reach here, generation failed
    return {"status": "error", "message": "Failed to parse JSON", "sequence": "MKKSRLALVLMVAVAGVVSVAQA", "clinical_rationale": "Generation error."}
