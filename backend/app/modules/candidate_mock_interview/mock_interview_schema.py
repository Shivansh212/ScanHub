from pydantic import BaseModel
from typing import List

class MockInterviewResponse(BaseModel):
    technical_questions: List[str]
    coding_questions: List[str]
    scenario_questions: List[str]
    weak_area_questions: List[str]