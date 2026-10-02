# backend/app/seed.py

"""
Keep the product catalogue in step with the committed seed file.

The SQLite file is deliberately NOT committed — it fills up with customer
enquiries and invoices, which must never land in a public repo. The catalogue
itself lives in `app/data/products.json`, which is committed, and is reconciled
into the database on every startup.

Reconciling rather than only filling an empty table matters: the catalogue is
edited by changing that JSON file, so an insert-only seeder meant a price
change, a renamed photograph or a discontinued line never reached a database
that already had rows. Products are reference data with no customer content, so
rewriting them is safe; the one thing we will not do is delete a product that
an order still points at.
"""

import json
import logging
from datetime import datetime
from pathlib import Path

from sqlalchemy.orm import Session

from .models import OrderItem, Product

logger = logging.getLogger(__name__)

SEED_FILE = Path(__file__).parent / "data" / "products.json"

# Catalogue columns owned by the seed file. Anything not listed here is left
# alone, so stock counts edited in the admin survive a redeploy.
FIELDS = ("name", "category", "description", "price", "image_url", "specifications")


def seed_products(db: Session) -> int:
    """Sync the catalogue from the seed file. Returns rows added or changed."""
    if not SEED_FILE.exists():
        logger.warning("No seed file at %s — leaving the catalogue alone.", SEED_FILE)
        return 0

    try:
        items = json.loads(SEED_FILE.read_text())
    except (OSError, json.JSONDecodeError):
        logger.exception("Could not read the seed catalogue at %s", SEED_FILE)
        return 0

    if not isinstance(items, list) or not items:
        logger.warning("Seed catalogue at %s is empty — leaving the catalogue alone.", SEED_FILE)
        return 0

    now = datetime.utcnow()
    existing = {p.id: p for p in db.query(Product).all()}
    seen: set[int] = set()
    added = updated = 0

    for item in items:
        pid = item.get("id")
        if pid is None:
            continue
        seen.add(pid)
        row = existing.get(pid)

        if row is None:
            db.add(
                Product(
                    id=pid,
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
            continue

        changes = {
            f: item.get(f) for f in FIELDS if getattr(row, f) != item.get(f)
        }
        if changes:
            for field, value in changes.items():
                setattr(row, field, value)
            row.updated_at = now
            updated += 1

    # Lines no longer in the catalogue. Keep any that an order points at, so
    # order history never loses the product it was placed against.
    retired = 0
    for pid, row in existing.items():
        if pid in seen:
            continue
        if db.query(OrderItem).filter(OrderItem.product_id == pid).count():
            logger.info("Product %s is off the catalogue but kept: an order references it.", pid)
            continue
        db.delete(row)
        retired += 1

    try:
        db.commit()
    except Exception:
        db.rollback()
        logger.exception("Failed syncing the catalogue")
        return 0

    if added or updated or retired:
        logger.info(
            "Catalogue synced: %d added, %d updated, %d retired.", added, updated, retired
        )
    return added + updated
