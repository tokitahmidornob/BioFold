import os
import re
from huggingface_hub import InferenceClient

def generate_sequence(prompt: str) -> dict:
    """
    The Bio-Designer: Uses a Hugging Face LLM to generate a protein sequence based on the prompt.
    """
    hf_token = os.getenv("HF_TOKEN")
    
    if not hf_token:
        # Fallback if no token is provided
        return {
            "agent": "The Bio-Designer",
            "status": "error",
            "sequence": None,
            "message": "HF_TOKEN environment variable not set. Cannot access the AI engine."
        }
        
    client = InferenceClient(model="meta-llama/Meta-Llama-3-8B-Instruct", token=hf_token)
    
    system_prompt = """You are an elite computational biologist. 
Based on the user's prompt, you must design a novel, biologically viable protein sequence.
Respond ONLY with a valid JSON object containing exactly two keys:
1. "sequence": A string of only valid uppercase amino acid letters (A, C, D, E, F, G, H, I, K, L, M, N, P, Q, R, S, T, V, W, Y). Max 200 length.
2. "clinical_rationale": A detailed 2-paragraph medical explanation of how this specific sequence targets the problem, its structural properties, and the pathological consequences it averts.
Do not include markdown formatting like ```json in the output. Just the raw JSON."""

    try:
        # Call the LLM (ensure your specific client syntax matches this intent)
        response = client.text_generation(f"{system_prompt}\n\nUser Prompt: {prompt}", max_new_tokens=400)
        
        # Parse the dynamic JSON response
        import json
        ai_data = json.loads(response.strip())
        
        return {
            "agent": "The Bio-Designer",
            "status": "success",
            "sequence": ai_data["sequence"],
            "clinical_rationale": ai_data["clinical_rationale"],
            "message": "Sequence dynamically generated via Meta-Llama-3."
        }
    except Exception as e:
        return {
            "agent": "The Bio-Designer",
            "status": "error",
            "sequence": None,
            "message": f"Dynamic generation failed: {str(e)}"
        }
