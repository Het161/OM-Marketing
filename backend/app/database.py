# backend/app/database.py
"""
Database configuration that works for BOTH:
- SQLite (local development - easy!)
- PostgreSQL (Render production - with connection handling)
"""

from sqlalchemy import create_engine, event, exc, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool
import os

# ✅ Get database URL from environment (Render sets this)
DATABASE_URL = os.getenv('DATABASE_URL')

# Determine if we're using PostgreSQL or SQLite
IS_POSTGRES = DATABASE_URL is not None and 'postgres' in DATABASE_URL
IS_SQLITE = not IS_POSTGRES

# ✅ Configure database based on environment
if IS_POSTGRES:
    # Fix for Render PostgreSQL - replace postgres:// with postgresql://
    if DATABASE_URL.startswith('postgres://'):
        DATABASE_URL = DATABASE_URL.replace('postgres://', 'postgresql://', 1)
    
    print(f"🐘 Using PostgreSQL (Production)")
    
    # Create engine with connection handling for Render free tier
    engine = create_engine(
        DATABASE_URL,
        poolclass=NullPool,  # Disable connection pooling for free tier
        connect_args={
            "connect_timeout": 10,
            "options": "-c timezone=utc"
        },
        pool_pre_ping=True,  # Verify connections before using
        echo=False
    )
    
    # ✅ Add pessimistic disconnect handling for PostgreSQL
    @event.listens_for(engine, "connect")
    def receive_connect(dbapi_conn, connection_record):
        """Handle new connections"""
        connection_record.info['pid'] = os.getpid()

    @event.listens_for(engine, "checkout")
    def receive_checkout(dbapi_conn, connection_record, connection_proxy):
        """Handle connection checkout - check if stale"""
        pid = os.getpid()
        if connection_record.info.get('pid') != pid:
            connection_record.connection = connection_proxy.connection = None
            raise exc.DisconnectionError(
                "Connection record belongs to pid %s, attempting to check out in pid %s" %
                (connection_record.info['pid'], pid)
            )

else:
    # SQLite for local development - MUCH easier!
    DATABASE_URL = "sqlite:///./om_marketing.db"
    print(f"📦 Using SQLite (Local Development)")
    
    # Create engine for SQLite
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False}  # Only needed for SQLite
    )

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create base class for models
Base = declarative_base()

# ✅ Dependency to get DB session with auto-reconnect
def get_db():
    """
    Database session dependency with automatic reconnection.
    Works for both SQLite (local) and PostgreSQL (Render).
    """
    db = SessionLocal()
    try:
        if IS_POSTGRES:
            # Test the connection for PostgreSQL
            db.execute(text("SELECT 1"))
        yield db
    except exc.DBAPIError as e:
        # Connection was invalidated - try once more (PostgreSQL)
        if IS_POSTGRES and e.connection_invalidated:
            db.close()
            db = SessionLocal()
            yield db
        else:
            raise
    finally:
        db.close()
