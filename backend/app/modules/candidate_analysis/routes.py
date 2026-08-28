from fastapi import APIRouter, UploadFile, File,Form, Depends
from fastapi.responses import JSONResponse
# from requests import Session
from app.modules.candidate_analysis.schemas import ResumeAnalysisRequest
from app.modules.candidate_analysis.service import CandidateAnalysisService
from app.modules.resume_ranker.ingestion import ResumeIngestion
from app.utils.exception import CustomException
from app.auth.roles import require_role
from app.utils.logger import logger
import pandas as pd
import os
import shutil
from sqlalchemy.orm import Session
import time
from typing import Optional
from app.modules.candidate_analysis.skill_extractor import SkillExtractor

from app.auth.deps import get_current_user
from app.core.database import get_db
from app.modules.candidate_analysis.models import ResumeAnalysis

router = APIRouter(
    prefix="/api/v1/candidate",
    tags=["Candidate Analysis"]
)

RAW_DIR = "data/candidate/raw"
os.makedirs(RAW_DIR, exist_ok=True)
ALLOWED_EXTENSIONS = {"pdf", "docx", "doc", "txt"}

@router.post("/analyze")
def analyze_candidate_resume(
    resume: UploadFile = File(None),
    job_description: Optional[str] = Form(None),
    skills: Optional[str] = Form(None),
    db: Session = Depends(get_db),
    user=Depends(require_role("candidate"))
):
    try:
        if resume :
        # 1️ Upload started
            user.resume_status = "UPLOADING"
            db.commit()

            

            filename = resume.filename or "uploaded_resume.pdf"
            file_extension = filename.split(".")[-1].lower()

            if file_extension not in ALLOWED_EXTENSIONS:
                return JSONResponse(
                    status_code=400,
                    content={"error": "Unsupported file type"}
                )

            unique_name = f"user_{user.id}_{int(time.time())}.{filename}"
            file_path = os.path.join(RAW_DIR, unique_name)

            # 2️ Save file
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(resume.file, buffer)

            
            
            user.resume_path = file_path
            db.commit()

        else:
            file_path = user.resume_path
            if not file_path or not os.path.exists(file_path):
                return JSONResponse(
                    status_code=400,
                    content={"error": "No resume uploaded or file not found"}
                ) 
            file_extension = file_path.split(".")[-1].lower()   

        # 3️ Parsing started
        user.resume_status = "PARSING"
        db.commit()
        # simulate heavy work
        time.sleep(1)

        ingestion = ResumeIngestion(raw_dir=RAW_DIR)
        
        # Determine which extractor to use based on the file extension
        if file_extension == "pdf":
            resume_text = ingestion.extract_text_from_pdf(file_path)
        elif file_extension == "docx":
            resume_text = ingestion.extract_text_from_docx(file_path)
        else:
            resume_text = ingestion.extract_text_from_txt(file_path)

        #  DEBUG CHECK - This will now be 100% accurate to the file you just uploaded
        print(f"DEBUG: DIRECT TEXT LENGTH -> {len(resume_text)}")

        if not resume_text or len(resume_text) < 10:
             raise Exception("Extracted resume text is too short or empty!")

        if not resume_text or len(resume_text) < 10:
             raise Exception("Extracted resume text is too short or empty!")

        if job_description:
            ai_skills = SkillExtractor.extract(job_description)
            manual_skills = [s.strip() for s in skills.split(",")] if (skills and skills != "string") else []
            jd_skills = list(set(ai_skills + manual_skills))

            result = CandidateAnalysisService.analyze_resume(
                resume_text=resume_text,
                job_description=job_description,
                jd_skills=jd_skills
            )

            analysis = ResumeAnalysis(
                user_id=user.id,
                resume_path=file_path,
                job_description=job_description,
                resume_score=result.resume_score,
                matched_skills=result.matched_skills,
                missing_skills=result.missing_skills,
                suggestions=result.suggestions
            )
            db.add(analysis)
            db.commit()
            db.refresh(analysis)

        else:
            result = {"message": "Resume Uploaded and Parsed Successfully!."}    

        # 4️ Completed
        user.resume_status = "COMPLETED"
        user.resume_uploaded = True
        user.resume_path = file_path
        db.commit()

        return result

    except Exception as e:
        user.resume_status = "FAILED"
        db.commit()
        logger.error(str(e))
        return {"error": "Resume analysis failed"}


@router.get("/resume/status")
def get_resume_status(user = Depends(get_current_user)):
    try:
        return {"status": user.resume_status or "NOT_UPLOADED"}
    except Exception as e:
        logger.error(f"Error checking status: {str(e)}")
        print(f"DEBUG ERROR: {e}")
        return {"status": "FAILED"}       


@router.get("/analysis/latest")
def get_resume_analysis(
    db : Session = Depends(get_db),
    user = Depends(require_role("candidate"))
):
    analysis = (
        db.query(ResumeAnalysis).filter(ResumeAnalysis.user_id==user.id).order_by(ResumeAnalysis.created_at.desc()).first()
    )

    if not analysis:
        return {"message" : "No Analysis Found"}
    
    return {
        "id" : analysis.id,
        "resume_score" : analysis.resume_score,
        "matched_skills" : analysis.matched_skills,
        "missing_skills" : analysis.missing_skills,
        "feedback" : analysis.suggestions,
        "created_at" : analysis.created_at
    }
    