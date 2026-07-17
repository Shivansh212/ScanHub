import re, string
from app.utils.exception import CustomException

class TextPreprocessor:
    def clean_text(self, text: str) -> str:
        try:
            text = text.lower()
            text = re.sub(f"[{re.escape(string.punctuation)}]", " ", text)
            text = re.sub(r"\d+", " ", text)
            text = re.sub(r"\s+", " ", text)
            return text.strip()
        except Exception as e:
            raise CustomException(e)
