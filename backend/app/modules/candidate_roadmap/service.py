from app.modules.candidate_roadmap.prompt import candidate_roadmap_prompt
from app.utils.exception import CustomException
from app.utils.logger import logger
from app.services.llm_service import generate_llm_response

class CandidateRoadmapService:
    @staticmethod
    def generate_roadmap(
        target_role: str,
        experience_level: str,
        matched_skills: list,
        missing_skills: list
    ):
        try:
            prompt = candidate_roadmap_prompt(
                target_role=target_role,
                experience_level=experience_level,
                matched_skills=matched_skills,
                missing_skills=missing_skills)
            
            roadmap_text = generate_llm_response(prompt,0.4)

            logger.info("Candidate learning roadmap generated succesfully")

            return {
                "target_role": target_role,
                "roadmap": roadmap_text
            }

        except Exception as e:
            logger.error("Failed to generate candidate roadmap")
            raise CustomException(e)    
        
        