import os
from openai import OpenAI
from dotenv import load_dotenv
from app.utils.exception import CustomException

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def generate_llm_response(
    prompt: str,
    temperature: float,
    system_message: str = "You are a helpful AI assistant.",
    
) -> str:
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": prompt}
            ],
            temperature=temperature
        )

        content =  response.choices[0].message.content
        return content.strip() if content else ""

    except Exception as e:
        raise CustomException(e)
