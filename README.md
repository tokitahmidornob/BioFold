---
title: BioFold Engine
emoji: 🧬
colorFrom: blue
colorTo: indigo
sdk: docker
pinned: false
---
# BioFold: Multi-Agent LLM Protein Sequence Generator

*Attributed to the **H.O.L.M.E.S. (Home for Observation, Logic, Mastery, Engineering, and Science)** Initiative.*

BioFOld is a cutting-edge, agent-driven platform designed to autonomously generate and validate novel protein sequences. By leveraging inverse folding principles, the system conditions biological targets, generates candidates using highly specialized LLMs, and verifies them through robust biosecurity checks and 3D structural predictions.

## Architecture

The system is composed of two primary stacks:
- **Backend (FastAPI & Python):** Handles the orchestration of the AI swarm, orchestrates biological modeling APIs, and manages safety protocols.
- **Frontend (React & TailwindCSS):** A sleek, professional, and data-centric UI (inspired by the AlphaFold2 aesthetic) that visualizes the generation pipeline and resulting 3D protein structures.

### The 3-Agent Swarm
The core generation is powered by a coordinated swarm of three specialized agents:
1. **The Bio-Designer:** Specializes in interacting with Hugging Face biological LLMs for inverse folding and sequence generation based on target constraints.
2. **The Biosecurity Guardrail:** Cross-references the generated amino acid sequences against known toxin and pathogen databases to ensure absolute biosecurity before synthesis.
3. **The Validator:** Routes safe, cleared sequences through the ESMFold2 API to predict 3D structural stability and viability.

## Local Installation

### Prerequisites
- Python 3.10+
- Node.js 18+ & npm

### Backend Setup
1. Navigate to the `backend` directory.
2. Create and activate a virtual environment:
   ```bash
   cd backend
   python -m venv venv
   # On Windows
   venv\Scripts\activate
   # On macOS/Linux
   source venv/bin/activate
   ```
3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the FastAPI development server:
   ```bash
   uvicorn main:app --reload
   ```
   The backend will be available at `http://localhost:8000`.

### Frontend Setup
1. Navigate to the `frontend` directory.
2. Install the Node modules:
   ```bash
   cd frontend
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`.

## Usage
Launch the frontend, upload a target structural `.pdb` file or provide a biological function prompt, and click "Initialize Pipeline". The system will trigger the Bio-Designer, pass the result through the Biosecurity Guardrail, and finally render the predicted structure using the Validator.
