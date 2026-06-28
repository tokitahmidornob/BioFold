import os

class Config:
    # Swarm API Keys (Mock for Demo)
    HF_API_KEY = os.getenv("HF_API_KEY", "hf_mock_key_123456789")
    
    # Validation Service
    ESMFOLD_API_URL = "https://api.esmatlas.com/foldSequence/v1/pdb/"
    
    # CORS Origins (Allow frontend dev server)
    CORS_ORIGINS = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:4173",
        "http://127.0.0.1:4173"
    ]
