# backend/app/routes/auth.py

"""
Admin authentication for the billing portal.

Passwords are bcrypt-hashed and sessions are signed JWTs. The previous version
of this file stored passwords in plain text and compared them with `==`; that
is replaced here because this portal now holds customer billing data.
"""

import logging

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import User
from ..schemas import LoginRequest, TokenResponse, UserResponse
from ..security import create_access_token, get_current_user, hash_password, verify_password

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/login", response_model=TokenResponse)
async def login(payload: LoginRequest, db: Session = Depends(get_db)):
    """Sign in to the admin portal."""
    username = payload.username.strip().lower()
    user = db.query(User).filter(User.username == username).first()

    # Verify even when the user is missing, so response timing doesn't reveal
    # which usernames exist.
    stored = user.hashed_password if user else "$2b$12$" + "." * 53
    ok = verify_password(payload.password, stored)

    if not user or not ok or not user.is_active:
        logger.info("Failed sign-in attempt for %r", username)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password.",
        )

    return TokenResponse(
        access_token=create_access_token(user.username),
        username=user.username,
        full_name=user.full_name,
    )


@router.get("/me", response_model=UserResponse)
async def me(current: User = Depends(get_current_user)):
    """Who am I? Used by the portal to confirm a session is still valid."""
    return current


@router.post("/change-password", status_code=204)
async def change_password(
    payload: LoginRequest,
    current: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Change the signed-in admin's password.

    `username` carries the current password and `password` the new one, so the
    existing login schema can be reused.
    """
    if not verify_password(payload.username, current.hashed_password):
        raise HTTPException(status_code=400, detail="Your current password is incorrect.")

    if len(payload.password) < 8:
        raise HTTPException(
            status_code=400, detail="Choose a password of at least 8 characters."
        )

    current.hashed_password = hash_password(payload.password)
    db.commit()
    logger.info("Password changed for %s", current.username)
