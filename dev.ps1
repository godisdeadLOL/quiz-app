Start-Process powershell -ArgumentList "-Command", "mongod --dbpath ./db/"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; .venv/Scripts/Activate.ps1; uvicorn main:app --host 0.0.0.0 --port 8000 --reload"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"