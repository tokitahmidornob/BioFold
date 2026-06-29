@echo off
title BioFOld Master Control
echo Waking up the BioFOld Swarm...

:: Start the Python Backend in a new terminal window
start "BioFOld Backend" cmd /k "cd backend && call venv\Scripts\activate.bat && uvicorn main:app --reload"

:: Start the React Frontend in a separate new terminal window
start "BioFOld Frontend" cmd /k "cd frontend && npm run dev"

echo All systems initialized. You may close this window.
