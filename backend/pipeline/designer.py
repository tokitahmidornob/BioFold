import os
import re
from huggingface_hub import InferenceClient

def generate_sequence(prompt: str) -> dict:
    """
    The Bio-Designer: Dynamically generates a protein sequence and clinical rationale via Llama-3.
    """
    normalized_prompt = prompt.lower()
    hf_token = os.getenv("HF_TOKEN")
        
    if not hf_token:
        return {
            "agent": "The Bio-Designer",
            "status": "error",
            "sequence": None,
            "clinical_rationale": "Authentication Error: HF_TOKEN is missing.",
            "message": "HF_TOKEN environment variable not set."
        }
            
    client = InferenceClient(model="meta-llama/Meta-Llama-3-8B-Instruct", token=hf_token)
    
    system_prompt = """You are an elite computational biologist. 
    Based on the user's prompt, you must design a novel, biologically viable protein sequence.
    Respond ONLY with a valid JSON object containing exactly two keys:
    1. "sequence": A string of only valid uppercase amino acid letters. Max 200 length.
    2. "clinical_rationale": A detailed 2-paragraph medical explanation of how this specific sequence targets the problem.
    Do not include any conversational filler. Just the raw JSON object."""

    try:
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt}
        ]
        # Call the conversational endpoint
        response = client.chat_completion(messages=messages, max_tokens=500)
        
        # Extract the raw text from the chat response object
        raw_text = response.choices[0].message.content
        
        # Robust Markdown Cleaning
        cleaned_response = raw_text.strip()
        if cleaned_response.startswith("```"):
            cleaned_response = cleaned_response.split("\n", 1)[1]
        if cleaned_response.endswith("```"):
            cleaned_response = cleaned_response.rsplit("```", 1)[0]
        cleaned_response = cleaned_response.strip()
        
        import json
        ai_data = json.loads(cleaned_response)
        
        return {
            "agent": "The Bio-Designer",
            "status": "success",
            "sequence": ai_data.get("sequence", "").strip().upper(),
            "clinical_rationale": ai_data.get("clinical_rationale", "No rationale generated."),
            "clinicalRationale": ai_data.get("clinical_rationale", "No rationale generated."),
            "rationale": ai_data.get("clinical_rationale", "No rationale generated."),
            "message": "Sequence dynamically generated successfully."
        }
    except Exception as e:
        fallback_rationale = f"Dynamic analysis execution encountered an issue: {str(e)}. Processing fallback structural profiling."
        return {
            "agent": "The Bio-Designer",
            "status": "error",
            "sequence": "MKKSRLALVLMVAVAGVVSVAQA", # Safe fallback structural sequence
            "clinical_rationale": fallback_rationale,
            "clinicalRationale": fallback_rationale,
            "rationale": fallback_rationale,
            "message": f"Dynamic generation failed: {str(e)}"
        }
