from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import json
import os

app = FastAPI()

# Enable CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins during local development
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Bunq Backend API!"}

@app.get("/report")
def get_report():
    try:
        # Ensure the file exists in the same directory where FastAPI is running
        file_path = os.path.join(os.getcwd(), "report.json")
        
        # Read the report data from the JSON file
        with open(file_path, "r") as file:
            report = json.load(file)
        
        # Return the report data as JSON
        return JSONResponse(content=report)
    
    except Exception as e:
        # If there's an error, return a 500 status code with an error message
        return JSONResponse(status_code=500, content={"detail": "Failed to read report.json", "error": str(e)})
