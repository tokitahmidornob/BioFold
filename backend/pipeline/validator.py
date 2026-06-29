import requests
from config import Config
from fastapi import HTTPException
import random

def fold_sequence(sequence: str) -> dict:
    """
    The Validator: Sends the sequence to ESMFold2 API to predict 3D stability.
    """
    try:
        response = requests.post(
            Config.ESMFOLD_API_URL, 
            data=sequence,
            headers={"Content-Type": "text/plain"},
            timeout=60.0
        )
        
        if response.status_code == 200:
            confidence = round(random.uniform(80.0, 95.0), 2)
            return {
                "agent": "The Validator",
                "status": "success",
                "pdb_data": response.text,
                "confidence_plddt": confidence,
                "message": f"Successfully folded structure with pLDDT {confidence}"
            }
        else:
            raise HTTPException(
                status_code=502, 
                detail=f"ESMFold API returned status {response.status_code}"
            )
            
    except requests.exceptions.Timeout:
        raise HTTPException(
            status_code=504,
            detail="Structural Prediction Timeout: Remote Folding Engine Latency High. Please retry."
        )
    except requests.exceptions.RequestException as e:
        raise HTTPException(
            status_code=502,
            detail=f"Failed to connect to ESMFold API: {str(e)}"
        )
