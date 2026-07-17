from pydantic import BaseModel
from typing import List, Optional

class JDRequest(BaseModel):
    role : str
    experience_level : str
    skills : Optional[List[str]] = None
    company_type : Optional[str] = None
    

class JDResponse(BaseModel):
    jobe_title : str
    about_role : str
    responsibilities : List[str]
    required_skills: List[str]
    preferred_skills: List[str] 