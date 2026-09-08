# backend/app/config.py

"""
Central place for every setting that comes from the environment.

Nothing secret is hardcoded here — values are read from backend/.env in
development and from real environment variables in production.
"""

import os
from functools import lru_cache

from dotenv import load_dotenv

load_dotenv()


def _bool(name: str, default: bool = False) -> bool:
    return os.getenv(name, str(default)).strip().lower() in {"1", "true", "yes", "on"}


def _list(name: str, default: str = "") -> list[str]:
    raw = os.getenv(name, default)
    return [item.strip() for item in raw.split(",") if item.strip()]


class Settings:
    """Application settings, loaded once and reused."""

    APP_NAME: str = os.getenv("APP_NAME", "OM Marketing API")
    DEBUG: bool = _bool("DEBUG", True)

    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./om_marketing.db")

    SECRET_KEY: str = os.getenv("SECRET_KEY", "change-me")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

    # --- Who is allowed to call this API -------------------------------------
    # The live domains are in the default on purpose: if CORS_ORIGINS is ever
    # missing from the host's environment, the production site must still be
    # able to reach the API rather than having every request blocked.
    CORS_ORIGINS: list[str] = _list(
        "CORS_ORIGINS",
        "https://www.ommarketing.co.in,"
        "https://ommarketing.co.in,"
        "https://om-marketing.vercel.app,"
        "http://localhost:3000,"
        "http://127.0.0.1:3000",
    )

    # --- Outgoing email (Gmail SMTP) -----------------------------------------
    SMTP_HOST: str = os.getenv("SMTP_HOST", "smtp.gmail.com")
    SMTP_PORT: int = int(os.getenv("SMTP_PORT", "587"))
    SMTP_USER: str = os.getenv("SMTP_USER", "")
    # Gmail app passwords are shown with spaces; strip them so either form works.
    SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD", "").replace(" ", "")
    MAIL_FROM: str = os.getenv("MAIL_FROM", "") or os.getenv("SMTP_USER", "")
    MAIL_FROM_NAME: str = os.getenv("MAIL_FROM_NAME", "OM Marketing")

    # Where the enquiry notifications land
    OWNER_EMAIL: str = os.getenv("OWNER_EMAIL", "")

    # --- Business details used in emails and on the site ---------------------
    BUSINESS_NAME: str = os.getenv("BUSINESS_NAME", "OM Marketing")
    BUSINESS_PHONE: str = os.getenv("BUSINESS_PHONE", "+919825247312")
    BUSINESS_PHONE_DISPLAY: str = os.getenv("BUSINESS_PHONE_DISPLAY", "98252 47312")
    BUSINESS_EMAIL: str = os.getenv(
        "BUSINESS_EMAIL", "ommarketing.weighingscale1@gmail.com"
    )
    BUSINESS_ADDRESS: str = os.getenv(
        "BUSINESS_ADDRESS", "Naroda, Ahmedabad, Gujarat, India"
    )
    SITE_URL: str = os.getenv("SITE_URL", "http://localhost:3000")

    @property
    def email_enabled(self) -> bool:
        """Email is only attempted when SMTP is actually configured."""
        return bool(self.SMTP_USER and self.SMTP_PASSWORD and self.OWNER_EMAIL)


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
