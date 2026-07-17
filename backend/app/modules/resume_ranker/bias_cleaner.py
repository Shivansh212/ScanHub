import re
from app.utils.logger import logger
from app.utils.exception import CustomException

class BiasCleaner:
    """
    Removes personal & demographic information from resume text
    to ensure bias-reduced scoring.
    """

    EMAIL_REGEX = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b"
    PHONE_REGEX = r"\b(\+?\d{1,3}[\s-]?)?\d{10}\b"
    URL_REGEX = r"(https?://\S+|www\.\S+)"

    BIAS_HEADERS = [
        "name",
        "email",
        "phone",
        "contact",
        "address",
        "linkedin",
        "github",
        "portfolio",
        "dob",
        "date of birth",
        "gender",
        "nationality",
        "marital status"
    ]

    @staticmethod
    def clean(text : str):
        try:
            if not text :
                return ""
            
            original_len = len(text)

            text = re.sub(BiasCleaner.EMAIL_REGEX, " ", text)
            text = re.sub(BiasCleaner.PHONE_REGEX, " ", text)
            text = re.sub(BiasCleaner.URL_REGEX, " ", text)

            for header in BiasCleaner.BIAS_HEADERS:
                pattern = rf"{header}\s*:.*"
                text = re.sub(pattern," ", text, flags=re.IGNORECASE)

            text = re.sub(r"\s+", " ", text).strip()

            logger.info(
                f"BiasCleaner applied | Reduced text from {original_len} to {len(text)} characters"
            )

            return text    

        except Exception as e:
            logger.error(f"Bias cleaning failed {e}")
            raise CustomException(e)
