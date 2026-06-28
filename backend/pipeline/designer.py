import random
import time

def generate_sequence(prompt: str) -> dict:
    """
    The Bio-Designer: Uses a deterministic mapping for known demo targets, 
    otherwise generates a randomized but plausible sequence.
    """
    prompt_lower = prompt.lower()
    
    # Pre-computed mapping for the hackathon demo
    target_mappings = {
        "pet plastic": "MQTNPYARGVKNGVPLDAPSVQGLSTWTPFAPSSQAQYFDEAKARAAKAGAKVGVAFA", # Mock PETase snippet
        "cellulose": "MNKVQKNLIFVAIACMLCGATSAAQTSLTNQYNYAAWQAATGSYGTLATSSYTTADW",  # Mock Cellulase snippet
        "spike protein": "MFVFLVLLPLVSSQCVNLTTRTQLPPAYTNSFTRGVYYPDKVFRSSVLHSTQDLFLPF", # SARS-CoV-2 snippet
        "anthrax": "MKKRKNCFIIVIIIAIIFIAGSGVLAEVQAQNLNKFKEIEQANLDKFKEIEQANLDK", # Banned signature
        "ricin": "MKPIKVTIYVLLLGVLYLSQVAADVCPFNTVVAFGAWSDGSGVYTAANHLEFTSFVE",   # Banned signature
    }
    
    time.sleep(1.5) # Simulate generation latency
    
    # Check if a known target is in the prompt
    generated_seq = None
    for key, seq in target_mappings.items():
        if key in prompt_lower:
            generated_seq = seq
            break
            
    if not generated_seq:
        # Generate randomized plausible sequence (e.g. 50-80 AAs)
        amino_acids = "ACDEFGHIKLMNPQRSTVWY"
        length = random.randint(50, 80)
        generated_seq = ''.join(random.choices(amino_acids, k=length))
        
    return {
        "agent": "The Bio-Designer",
        "status": "success",
        "sequence": generated_seq,
        "message": f"Successfully generated sequence of length {len(generated_seq)} based on target constraints."
    }
