# backend/app/routes/auth.py

"""
Authentication Routes
Handles user registration and login
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User
from ..schemas import UserCreate, UserResponse

router = APIRouter()

@router.post("/register", response_model=UserResponse, status_code=201)
async def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    """Register a new user"""
    # Check if user exists
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
    
    # Create new user (password hashing will be added later)
    db_user = User(
        email=user.email,
        username=user.username,
        hashed_password=user.password,  # TODO: Add proper hashing
        full_name=user.full_name,
        phone_number=user.phone_number
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user

@router.post("/login")
async def login(
    username: str,
    password: str,
    db: Session = Depends(get_db)
):
    """User login"""
    user = db.query(User).filter(User.username == username).first()
    
    if not user or user.hashed_password != password:  # TODO: Add proper password checking
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password"
        )
    
    return {"message": "Login successful", "user_id": user.id}
