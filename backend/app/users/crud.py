from sqlalchemy.orm import Session
from app.users import models,schemas
from app.core.security import hash_password

def get_user_by_email(db: Session, email:str):
    return db.query(models.User).filter(models.User.email==email).first()

def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_pwd = hash_password(user.password)

    db_user = models.User(
        email = user.email,
        hashed_password = hashed_pwd,
        role = user.role
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user