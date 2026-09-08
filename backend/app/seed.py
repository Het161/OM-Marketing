# backend/app/seed.py

"""
Seed the product catalogue on startup.

The SQLite file is deliberately NOT committed — it fills up with customer
enquiries, which must never land in a public repo. Instead the catalogue lives
in `app/seed/products.json` (which is committed) and is loaded into an empty
database automatically. That makes a fresh deploy — Render's ephemeral disk
included — come up with a full catalogue every time.
"""

import json
import logging
from datetime import datetime
from pathlib import Path

from sqlalchemy.orm import Session

from .models import Product

logger = logging.getLogger(__name__)

SEED_FILE = Path(__file__).parent / "seed" / "products.json"


def seed_products(db: Session) -> int:
    """Insert catalogue products if the table is empty. Returns rows added."""
    if db.query(Product).count() > 0:
        return 0

    if not SEED_FILE.exists():
        logger.warning("No seed file at %s — starting with an empty catalogue.", SEED_FILE)
        return 0

    try:
        products = json.loads(SEED_FILE.read_text())
    except (OSError, json.JSONDecodeError):
        logger.exception("Could not read the seed catalogue at %s", SEED_FILE)
        return 0

    now = datetime.utcnow()
    added = 0

    for item in products:
        db.add(
            Product(
                id=item.get("id"),
                name=item["name"],
                category=item["category"],
                description=item.get("description"),
                price=item["price"],
                stock_quantity=item.get("stock_quantity", 0),
                image_url=item.get("image_url"),
                specifications=item.get("specifications"),
                created_at=now,
                updated_at=now,
            )
        )
        added += 1

    try:
        db.commit()
    except Exception:
        db.rollback()
        logger.exception("Failed seeding the catalogue")
        return 0

    logger.info("Seeded %d products into an empty catalogue.", added)
    return added
