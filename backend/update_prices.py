# backend/update_prices.py

from app.database import SessionLocal
from app.models import Product

db = SessionLocal()

# 💰 UPDATE YOUR PRICES HERE:
price_updates = {
    "UNIQUE Tebal": 4000.00,
    "Platform Scale 400": 8500.00,
    "OCS Crane": 45000.00,
    "Mini Weighing": 3500.00,
    "500*500mm MS Chekar": 7500.00,
    "600×600mm": 8500.00,
    "INFRES": 8500.00,
    "Explosion-Proof": 25000.00,
}

print("💰 Updating prices...\n")

for name_keyword, new_price in price_updates.items():
    product = db.query(Product).filter(Product.name.contains(name_keyword)).first()
    if product:
        old_price = product.price
        product.price = new_price
        print(f"✅ {product.name}")
        print(f"   ₹{old_price:,.0f} → ₹{new_price:,.0f}\n")

db.commit()
db.close()

print("✨ Done! Prices updated in database.")
