from fastapi import APIRouter, Depends, File, Form, UploadFile
from typing import List
from app.auth.roles import require_role
from app.modules.resume_ranker.service import ResumeRankerService
from fastapi.responses import JSONResponse
from app.utils.exception import CustomException
from app.utils.logger import logger
from app.modules.resume_ranker.ingestion import ResumeIngestion
import pandas as pd
import shutil
import os


router = APIRouter(prefix="/api/v1/recruiter", tags=["Recruiter"])

RAW_DIR = "data/raw"
PROCESSED_DIR = "data/processed"

os.makedirs(RAW_DIR, exist_ok=True)
os.makedirs(PROCESSED_DIR, exist_ok=True)

@router.post("/rank")
def rank_resumes(job_description : str = Form(...), 
                 resumes : List[UploadFile] = File(...),
                 user = Depends(require_role("recruiter"))):
    try:
        for old_file in os.listdir(RAW_DIR):
            os.remove(os.path.join(RAW_DIR,old_file))
        for file in resumes:
            filename = file.filename if file.filename else "resume.pdf"
            file_path = os.path.join(RAW_DIR, filename)
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
        logger.info(f"Uploaded resumes saved to data/raw")

        ingestion = ResumeIngestion(RAW_DIR,PROCESSED_DIR)
        ingestion.ingest_resumes()

        processed_file = os.path.join(PROCESSED_DIR, "resume_texts.csv")
        if not os.path.exists(processed_file):
            return JSONResponse(
                status_code=400,
                content={"error": "No resumes were processed"}
            )
        
        df = pd.read_csv(processed_file)

        resumes_data = df.to_dict(orient="records")

        ranked_results = ResumeRankerService.rank_resumes(job_description,resumes_data)
        logger.info("Resume ranking completed successfully")

        return {
            "job_description": job_description[:200],
            "results": ranked_results
        }
    

    except CustomException as ce:
        logger.error(str(ce))
        return JSONResponse(
            status_code=500,
            content={"error": "Resume processing failed"}
        )
        
    except Exception as e:
        logger.error(str(e))
        return JSONResponse(
            status_code=500,
            content={"error": "Unexpected server error"}
        )