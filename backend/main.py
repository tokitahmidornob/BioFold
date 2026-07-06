from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import time

from config import Config
from pipeline.designer import generate_sequence
from pipeline.guardrail import check_sequence
from pipeline.validator import fold_sequence

app = FastAPI(title="Bio-LLM Swarm API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://bio-fold.vercel.app", 
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DesignRequest(BaseModel):
    target_prompt: str = Field(..., min_length=1, max_length=1000)
    target_pdb: str | None = None

class DesignResponse(BaseModel):
    status: str
    sequence: str | None = None
    pdb_data: str | None = None
    is_safe: bool = False
    logs: list[dict]
    clinical_rationale: str | None = None

@app.post("/api/v1/design-protein", response_model=DesignResponse)
async def design_protein(request: DesignRequest):
    logs = []
    
    # 1. Bio-Designer Agent
    start_time = time.time()
    designer_res = generate_sequence(request.target_prompt)
    designer_res["elapsed_ms"] = round((time.time() - start_time) * 1000)
    logs.append(designer_res)
    
    sequence = designer_res.get("sequence")
    if not sequence:
        raise HTTPException(status_code=500, detail="Sequence generation failed.")
        
    # 2. Biosecurity Guardrail Agent
    start_time = time.time()
    guardrail_res = check_sequence(sequence)
    guardrail_res["elapsed_ms"] = round((time.time() - start_time) * 1000)
    logs.append(guardrail_res)
    
    if not guardrail_res.get("is_safe"):
        return DesignResponse(
            status="blocked",
            sequence=sequence,
            pdb_data=None,
            is_safe=False,
            logs=logs
        )
        
    # 3. Validator Agent
    start_time = time.time()
    validator_res = fold_sequence(sequence, designer_res)
    validator_res["elapsed_ms"] = round((time.time() - start_time) * 1000)
    logs.append(validator_res)
    
    return DesignResponse(
        status="success",
        sequence=sequence,
        pdb_data=validator_res.get("pdb_data"),
        is_safe=True,
        logs=logs,
        clinical_rationale=designer_res.get("clinical_rationale")
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
