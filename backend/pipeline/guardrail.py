import time

def check_sequence(sequence: str) -> dict:
    """
    The Biosecurity Guardrail: Cross-references the generated sequence 
    against known banned toxic or hazardous signatures.
    """
    time.sleep(1.0) # Simulate database query latency
    
    # Mock banned signature fragments (e.g. Ricin, Botulinum, Anthrax snippets)
    banned_signatures = {
        "VCPFNTVVAFGAWSDGSGV": "Ricin-like toxicity domain detected",
        "AEVQAQNLNKFKEIEQAN": "Anthrax toxin-like signature detected",
        "SYNYALQDYTDSQISNL": "Botulinum-like protease domain detected"
    }
    
    for signature, warning in banned_signatures.items():
        if signature in sequence:
            return {
                "agent": "The Biosecurity Guardrail",
                "status": "blocked",
                "is_safe": False,
                "message": f"SECURITY HAZARD: {warning}. Generation aborted.",
                "hazard_report": warning
            }
            
    return {
        "agent": "The Biosecurity Guardrail",
        "status": "success",
        "is_safe": True,
        "message": "Clearance Granted. No known hazardous signatures detected."
    }
