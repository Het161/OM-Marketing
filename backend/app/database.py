# backend/app/database.py

"""
This file sets up our database connection.
Using SQLite for easy local development - no PostgreSQL setup needed!
"""

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# SQLite Database - creates a file called 'om_marketing.db' in your backend folder
# This is MUCH easier for learning than PostgreSQL!
DATABASE_URL = "sqlite:///./om_marketing.db"

# For production with PostgreSQL, use this instead:
# DATABASE_URL = os.getenv(
#     "DATABASE_URL", 
#     "postgresql://username:password@localhost:5432/om_marketing_db"
# )

# Create the engine
# For SQLite, we need to add connect_args
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}  # Only needed for SQLite
)

# SessionLocal is a 'factory' for creating database sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for all models
Base = declarative_base()

# Dependency function to get database session
def get_db():
    """
    This function creates a new database session for each request.
    It's like opening a connection, doing work, then closing it properly!
    """
    db = SessionLocal()
    try:
        yield db  # Yield gives the session to the route
    finally:
        db.close()  # Always close the connection when done!

