# backend/app/security.py

"""
Password hashing and admin session tokens.

Uses the `bcrypt` library directly rather than passlib: passlib 1.7.4 reads
`bcrypt.__about__.__version__`, which bcrypt 5.x removed, so the combination
raises at hash time.
"""

import logging
from datetime import datetime, timedelta, timezone
from typing import Optional

import bcrypt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from .config import settings
from .database import get_db
from .models import User

logger = logging.getLogger(__name__)

# `auto_error=False` so we can raise our own 401 with a useful message
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login", auto_error=False)

# bcrypt refuses anything over 72 bytes
MAX_PASSWORD_BYTES = 72


def hash_password(password: str) -> str:
    """Hash a plaintext password with a per-password salt."""
    raw = password.encode("utf-8")[:MAX_PASSWORD_BYTES]
    return bcrypt.hashpw(raw, bcrypt.gensalt()).decode("utf-8")


def verify_password(password: str, hashed: str) -> bool:
    """Check a password against its stored hash. Never raises."""
    try:
        raw = password.encode("utf-8")[:MAX_PASSWORD_BYTES]
        return bcrypt.checkpw(raw, hashed.encode("utf-8"))
    except (ValueError, TypeError):
        # A malformed or legacy plaintext hash must fail closed, not explode.
        return False


def create_access_token(subject: str, expires_minutes: Optional[int] = None) -> str:
    """Issue a signed session token for the admin portal."""
    minutes = expires_minutes or settings.ACCESS_TOKEN_EXPIRE_MINUTES
    expire = datetime.now(timezone.utc) + timedelta(minutes=minutes)
    payload = {"sub": subject, "exp": expire, "iat": datetime.now(timezone.utc)}
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def get_current_user(
    token: Optional[str] = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> User:
    """Resolve the signed-in admin, or refuse the request."""
    unauthorised = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Please sign in again.",
        headers={"WWW-Authenticate": "Bearer"},
    )

    if not token:
        raise unauthorised

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        username = payload.get("sub")
    except JWTError:
        raise unauthorised

    if not username:
        raise unauthorised

    user = db.query(User).filter(User.username == username).first()
    if user is None or not user.is_active:
        raise unauthorised

    return user
