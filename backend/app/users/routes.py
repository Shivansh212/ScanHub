from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.auth.deps import get_current_user
from app.core.database import get_db
from app.users import schemas, crud

router = APIRouter(
    prefix="/api/v1/auth",
    tags=["Authentication"]
)

@router.post("/register", response_model=schemas.UserResponse)
def register_user(user:schemas.UserCreate, db:Session=Depends(get_db)):

    existing_user = crud.get_user_by_email(db,user.email)

    if existing_user:
        raise HTTPException(
            status_code= status.HTTP_400_BAD_REQUEST,
            detail= "Email already registered"
        )
    
    new_user = crud.create_user(db,user)

    return new_user

@router.get("/profile", response_model=schemas.UserResponse)
def get_profile(
    current_user = Depends(get_current_user)
):
    return current_user