import os
from openai import OpenAI
from app.utils.logger import logger
from app.utils.exception import CustomException
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
def get_embedding(text):
    try:
        text = text.replace("\n", " ")
        response = client.embeddings.create(
            model="text-embedding-3-small",
            input=text
        )
        return response.data[0].embedding
    except Exception as e:
        logger.error("Embedding generation failed")
        raise CustomException(e)