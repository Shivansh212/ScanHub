from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from app.core.config import settings

SECRET_KEY = settings.SECRET_KEY
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES

def create_access_token(data: dict, expires_delta: timedelta | None= None):
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else :
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)   # type:ignore

    return encoded_jwt

def verify_token(token : str):
    try:
        payload = jwt.decode(
            token,
            str(SECRET_KEY),
            ALGORITHM
        )
        return payload
    except JWTError:
        return None