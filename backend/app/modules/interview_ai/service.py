import os
from openai import OpenAI
from app.modules.interview_ai.prompt import build_interview_prompt
from app.utils.exception import CustomException
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class InterviewQuestionService:

    @staticmethod
    def generate_questions(data):
        try:
            prompt = build_interview_prompt(data.role,
                                            data.experience_level,
                                            data.skills,
                                            data.job_description)
            
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role" : "system", "content": "You are a senior technical interviewer."},
                    {"role" : "user", "content" : prompt}
                ],
                temperature=0.5
            )
            return response.choices[0].message.content

        except Exception as e:
            raise CustomException(e)