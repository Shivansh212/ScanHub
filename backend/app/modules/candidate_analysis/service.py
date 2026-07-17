import re
from app.modules.candidate_analysis.score_calculator import ResumeScoreCalculator
from app.modules.candidate_analysis.feedback_engine import ResumeFeedbackEngine
from app.modules.candidate_analysis.schemas import ResumeAnalysisResponse
from app.utils.logger import logger
from app.utils.exception import CustomException

class CandidateAnalysisService:
    @staticmethod
    def analyze_resume( 
        resume_text: str,
        job_description: str,
        jd_skills: list
    ):
        try:
            resume_text_lower = resume_text.lower()

            matched_skills = [

                skill for skill in jd_skills if skill.lower() in resume_text_lower

            ]

            missing_skills = list(set(jd_skills)-set(matched_skills))

            resume_score = ResumeScoreCalculator.calculate_score(resume_text,
                                                                 job_description,
                                                                 matched_skills,
                                                                 jd_skills
                                                                )
            
            feedback = ResumeFeedbackEngine.generate_feedback(missing_skills,resume_score)

            logger.info("Candidate resume analysis completed")

            return ResumeAnalysisResponse(
                resume_score=resume_score,
                matched_skills=matched_skills,
                missing_skills=missing_skills,
                suggestions=feedback
            )

        except Exception as e:
            raise CustomException(e)

