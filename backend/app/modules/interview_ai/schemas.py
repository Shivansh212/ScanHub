from pydantic import BaseModel
from typing import List

class InterviewRequest(BaseModel):
    role: str
    experience_level: str
    skills: List[str]
    job_description: str