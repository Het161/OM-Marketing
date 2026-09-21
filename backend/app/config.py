# backend/app/config.py

"""
Central place for every setting that comes from the environment.

Nothing secret is hardcoded here — values are read from backend/.env in
development and from real environment variables in production.
"""

import os
from pathlib import Path
from functools import lru_cache

from dotenv import load_dotenv

load_dotenv()


def _bool(name: str, default: bool = False) -> bool:
    return os.getenv(name, str(default)).strip().lower() in {"1", "true", "yes", "on"}


def _list(name: str, default: str = "") -> list[str]:
    raw = os.getenv(name, default)
    return [item.strip() for item in raw.split(",") if item.strip()]


def _path(name: str, default: Path) -> str:
    """
    Read a filesystem path from the environment.

    A variable that is present but empty (`SIGNATURE_PATH=` in a .env file)
    must fall back to the default — otherwise it resolves to `Path("")`, which
    is the current directory, and `.exists()` happily returns True for it.
    """
    value = (os.getenv(name) or "").strip()
    return value or str(default)


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

    # --- Registrations shown on invoices -------------------------------------
    # OM Marketing is MSME (Udyam) registered but NOT registered under GST, so
    # invoices carry no GSTIN and must not collect tax.
    UDYAM_NUMBER: str = os.getenv("UDYAM_NUMBER", "")

    # A bill is a legal document, so it carries the address registered on the
    # Udyam certificate — which is not the same as the Naroda shop address the
    # website shows customers. Falls back to the shop address if unset.
    REGISTERED_ADDRESS: str = os.getenv("REGISTERED_ADDRESS", "") or os.getenv(
        "BUSINESS_ADDRESS", "Naroda, Ahmedabad, Gujarat, India"
    )
    # Enterprise name exactly as registered
    REGISTERED_NAME: str = os.getenv("REGISTERED_NAME", "OM Marketing")

    # Scanned signature printed on invoices. Kept out of the repo because it is
    # public; supplied in production as a Render Secret File.
    SIGNATURE_PATH: str = _path(
        "SIGNATURE_PATH", Path(__file__).parent / "assets" / "signature.png"
    )
    # Logo printed on invoices (safe to commit — it is public branding)
    INVOICE_LOGO_PATH: str = _path(
        "INVOICE_LOGO_PATH", Path(__file__).parent / "assets" / "invoice-logo.png"
    )
    # --- Where customers pay -------------------------------------------------
    # Kept in the environment, never in the repo: this one is public.
    BANK_NAME: str = os.getenv("BANK_NAME", "")
    BANK_BRANCH: str = os.getenv("BANK_BRANCH", "")
    BANK_ACCOUNT_NAME: str = os.getenv("BANK_ACCOUNT_NAME", "")
    BANK_ACCOUNT: str = os.getenv("BANK_ACCOUNT", "")
    BANK_ACCOUNT_TYPE: str = os.getenv("BANK_ACCOUNT_TYPE", "")
    BANK_IFSC: str = os.getenv("BANK_IFSC", "")
    UPI_ID: str = os.getenv("UPI_ID", "")

    @property
    def bank_details(self) -> list[tuple[str, str]]:
        """Label/value rows for the payment box, skipping anything unset."""
        rows = [
            ("Account Name", self.BANK_ACCOUNT_NAME),
            ("Account No.", self.BANK_ACCOUNT),
            ("IFSC", self.BANK_IFSC),
            ("Bank", " — ".join(b for b in (self.BANK_NAME, self.BANK_BRANCH) if b)),
            ("Account Type", self.BANK_ACCOUNT_TYPE),
            ("UPI", self.UPI_ID),
        ]
        return [(label, value) for label, value in rows if value]

    # --- Admin bootstrap -----------------------------------------------------
    # Used once at startup to create the first admin account if none exists.
    ADMIN_USERNAME: str = os.getenv("ADMIN_USERNAME", "")
    ADMIN_PASSWORD: str = os.getenv("ADMIN_PASSWORD", "")
    ADMIN_EMAIL: str = os.getenv("ADMIN_EMAIL", "")
    ADMIN_NAME: str = os.getenv("ADMIN_NAME", "Het Patel")

    @property
    def email_enabled(self) -> bool:
        """Email is only attempted when SMTP is actually configured."""
        return bool(self.SMTP_USER and self.SMTP_PASSWORD and self.OWNER_EMAIL)


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
