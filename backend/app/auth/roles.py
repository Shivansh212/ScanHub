from fastapi import Depends, HTTPException, status
from app.auth.deps import get_current_user

def require_role(required_role: str):
    def role_checker(user = Depends(get_current_user)):
        print("USER ROLE:", user.role)
        print("REQUIRED ROLE:", required_role)

        if user.role != required_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Insufficient permissions. Your role: {user.role}"
            )
        return user
    return role_checker