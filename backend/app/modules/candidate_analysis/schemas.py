from pydantic import BaseModel
from typing import List

class ResumeAnalysisRequest(BaseModel):
    target_role: str
    skills: List[str]
    job_description: str


class ResumeAnalysisResponse(BaseModel):
    resume_score: float
    matched_skills: List[str]
    missing_skills: List[str]
    suggestions: List[str]