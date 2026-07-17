import json
import os
from openai import OpenAI
from app.modules.candidate_mock_interview.prompt import build_candidate_mock_interview_prompt
from app.utils.exception import CustomException
from dotenv import load_dotenv
from app.modules.candidate_mock_interview.schemas import CandidateMockInterviewResponse


load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class CandidateMockInterviewService:
    @staticmethod
    def generate_mock_interview(data):
        try:
            prompt = build_candidate_mock_interview_prompt(
                target_role=data.target_role,
                experience_level=data.experience_level,
                job_description=data.job_description,
                matched_skills=data.matched_skills,
                missing_skills=data.missing_skills
            )

            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role":"system", "content":"You are a professional interview coach."},
                    {"role":"user", "content":prompt}
                    
                ],

                response_format={"type": "json_object"},
                temperature=0.5
            )

            content = response.choices[0].message.content
            if content is None:
                raise CustomException(Exception("AI failed to generate a response content."))
            
            raw_output = content.strip()

            parse_output = json.loads(raw_output)

            validated_response = CandidateMockInterviewResponse(**parse_output)

            return validated_response.model_dump()
        
        except Exception as e:
            raise CustomException(e)