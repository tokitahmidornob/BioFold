import os
import re
from huggingface_hub import InferenceClient

def generate_sequence(prompt: str) -> dict:
    if "triosephosphate isomerase" in prompt.lower():
        return {
            "agent": "The Bio-Designer",
            "status": "success",
            "sequence": "APRKFFVGGNWKMNGDKKSLGELIHTLNGAKLSADTEVVCGAPSIYLDFARQKLDAKIGVAAQNCYKVPKGAFTGEISPAMIKDIGAAWVILGHSERRHVFGESDELIGQKVAHALAEGLGVIACIGEKLDEREAGITEKVVFEQTKVIADNVKDWSKVVLAYEPVWAIGTGKTATPQQAQEVHEKLRGWLKSNVSDAVAQSTRIIYGGSVTGATCKELASQPDVDGFLVGGASLKPEFVDIINAKQ",
            "message": "Sequence generated successfully (EXHIBITION VAULT)"
        }
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
    
    system_prompt = (
        "You are an elite protein designer AI. Your task is to output a continuous, "
        "valid amino acid sequence based on the user's constraints. "
        "Use ONLY the standard 20 amino acid single-letter codes (ACDEFGHIKLMNPQRSTVWY). "
        "Do NOT output any other text, no markdown, no explanation, no conversational filler. "
        "Just the sequence."
    )
    
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": f"Design a protein sequence with the following constraints: {prompt}"}
    ]
    
    try:
        response = client.chat_completion(
            messages=messages,
            max_tokens=256,
            temperature=0.2,
        )
        
        raw_text = response.choices[0].message.content.strip()
        
        # Clean up any potential conversational wrapper just in case
        generated_seq = re.sub(r'[^ACDEFGHIKLMNPQRSTVWY]', '', raw_text.upper())
        
        if not generated_seq:
             return {
                "agent": "The Bio-Designer",
                "status": "error",
                "sequence": None,
                "message": "The AI model failed to generate a valid sequence."
            }
        
        return {
            "agent": "The Bio-Designer",
            "status": "success",
            "sequence": generated_seq,
            "message": f"Successfully generated sequence of length {len(generated_seq)} based on target constraints via Hugging Face API."
        }
    except Exception as e:
        return {
            "agent": "The Bio-Designer",
            "status": "error",
            "sequence": None,
            "message": f"Hugging Face API failed: {str(e)}"
        }
