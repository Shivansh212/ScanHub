from pydantic import BaseModel
from typing import List

class CandidateRoadmapRequest(BaseModel):
    target_role: str
    experience_level: str
    matched_skills: List[str]
    missing_skills: List[str]


class RoadmapPhase(BaseModel):
    phase_title: str
    duration: str
    focus_areas: List[str]
    suggestions: List[str]


class CandidateRoadmapResponse(BaseModel):
    target_role: str
    roadmap: List[RoadmapPhase]