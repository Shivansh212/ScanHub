from pydantic import BaseModel

class SkillGapRequest(BaseModel):
    job_description : str
    resume_text : str
