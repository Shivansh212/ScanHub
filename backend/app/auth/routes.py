from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.auth.schemas import LoginRequest, TokenResponse
from app.core.security import verify_password
from app.auth.jwt import create_access_token
from app.users.crud import get_user_by_email
from app.core.database import get_db
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter(prefix="/api/v1/auth", tags=["Auth"])

@router.post("/login", response_model=TokenResponse)
def login_user(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = get_user_by_email(db,form_data.username)

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if not verify_password(form_data.password,str(user.hashed_password)):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token  = create_access_token(
        data={"sub": str(user.id), "role": user.role}
    )
    return {"access_token": token}