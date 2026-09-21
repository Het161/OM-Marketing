# backend/app/main.py

"""
Entry point of the OM Marketing FastAPI application.
"""

import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .database import Base, SessionLocal, engine
from .models import User
from .routes import auth, enquiries, invoices, orders, products
from .seed import seed_products
from .security import hash_password

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-8s %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)

# Create all database tables from the models
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    description=(
        "API for OM Marketing — weighing scales, note counters, mobile "
        "accessories, service bookings and customer enquiries."
    ),
    version="1.1.0",
)

# Only the origins listed in CORS_ORIGINS may call this API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

app.include_router(products.router, prefix="/api/products", tags=["Products"])
app.include_router(orders.router, prefix="/api/orders", tags=["Orders"])
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(enquiries.router, prefix="/api/enquiries", tags=["Enquiries"])
app.include_router(invoices.router, prefix="/api/invoices", tags=["Invoices (admin)"])
app.include_router(invoices.public_router, prefix="/api/public", tags=["Public bill link"])


def _ensure_admin(db) -> None:
    """
    Create the first admin account from ADMIN_USERNAME / ADMIN_PASSWORD.

    Runs only when no users exist, so it never overwrites a password that has
    since been changed from inside the portal.
    """
    if db.query(User).count() > 0:
        return

    username = (settings.ADMIN_USERNAME or "").strip().lower()
    password = settings.ADMIN_PASSWORD

    if not username or not password:
        logger.warning(
            "No admin account yet. Set ADMIN_USERNAME and ADMIN_PASSWORD and restart "
            "to create one — the billing portal cannot be used until you do."
        )
        return

    if len(password) < 8:
        logger.error("ADMIN_PASSWORD is shorter than 8 characters — refusing to create the account.")
        return

    db.add(
        User(
            username=username,
            email=settings.ADMIN_EMAIL or settings.OWNER_EMAIL or f"{username}@example.com",
            hashed_password=hash_password(password),
            full_name=settings.ADMIN_NAME,
            is_active=1,
        )
    )
    db.commit()
    logger.info("Created the first admin account: %s", username)


@app.on_event("startup")
async def startup_checks() -> None:
    # A fresh deploy (or Render's ephemeral disk) starts with an empty database,
    # so load the committed catalogue into it.
    db = SessionLocal()
    try:
        seed_products(db)
        _ensure_admin(db)
    finally:
        db.close()

    if settings.email_enabled:
        logger.info("Email enabled — notifications go to %s", settings.OWNER_EMAIL)
    else:
        logger.warning(
            "Email DISABLED. Set SMTP_USER, SMTP_PASSWORD and OWNER_EMAIL in "
            "backend/.env to turn on enquiry emails. Enquiries are still saved "
            "to the database."
        )
    logger.info("CORS origins: %s", ", ".join(settings.CORS_ORIGINS))


@app.get("/")
async def root():
    return {
        "message": "Welcome to OM Marketing API!",
        "docs": "/docs",
        "version": "1.1.0",
    }


@app.get("/health")
async def health_check():
    """Health probe — also reports whether email is wired up."""
    return {
        "status": "healthy",
        "service": settings.APP_NAME,
        "email_configured": settings.email_enabled,
    }
