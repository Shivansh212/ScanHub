import os 
from openai import OpenAI
from dotenv import load_dotenv
from app.modules.jd_generator.prompt import build_jd_prompt
from app.utils.exception import CustomException

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class JDGeneratorService:
    @staticmethod
    def generate_jd(data):
        try:
            prompt = build_jd_prompt(data.role,
                                    data.experience_level,
                                    data.skills,
                                    data.company_type)
            
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                        {"role": "system", "content": "You are an expert HR recruiter."},
                        {"role": "user", "content": prompt}
                    ],
                temperature = 0.4    
            )
            return response.choices[0].message.content
        except Exception as e:
            raise CustomException(e)
    