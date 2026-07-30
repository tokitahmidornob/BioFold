import os

class Config:
    # HF Inference API token is consumed directly in pipeline/designer.py
    # via os.getenv("HF_TOKEN"). It must be set as a Space secret — no
    # hardcoded defaults. A missing token now raises a RuntimeError.

    # Validation Service (public, no auth required)
    ESMFOLD_API_URL = "https://api.esmatlas.com/foldSequence/v1/pdb/"

    # CORS Origins (Allow frontend dev server and production)
    CORS_ORIGINS = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:4173",
        "http://127.0.0.1:4173"
    ]
