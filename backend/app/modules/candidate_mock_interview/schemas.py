from pydantic import BaseModel
from typing import List

class CandidateMockInterviewRequest(BaseModel):
    target_role: str
    experience_level: str
    job_description: str
    matched_skills: List[str]
    missing_skills: List[str]

class CandidateMockInterviewResponse(BaseModel):
    technical_questions: List[str]
    coding_questions: List[str]
    scenario_questions: List[str]
    weak_area_questions: List[str]    