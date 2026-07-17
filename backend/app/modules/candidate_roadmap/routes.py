from fastapi import APIRouter, Depends
from app.modules.candidate_roadmap.schemas import CandidateRoadmapRequest
from app.modules.candidate_roadmap.service import CandidateRoadmapService
from app.utils.exception import CustomException
from app.utils.logger import logger
from app.auth.roles import require_role

router = APIRouter(
    prefix="/api/v1/candidate/roadmap",
    tags=["Candidate Roadmap"]
)

@router.post("/generate")
def generate_candidate_roadmap(request:CandidateRoadmapRequest,
                               user = Depends(require_role("candidate"))
                               ):
    try:
        result = CandidateRoadmapService.generate_roadmap(
            request.target_role,
            request.experience_level,
            request.matched_skills,
            request.missing_skills
        )

        return result
    except CustomException as e:
        logger.error(str(e))
        return {"error": "Roadmap generation failed"}
    except Exception as e:
        logger.error(str(e))
        return {"error": "Unexpected server error"}