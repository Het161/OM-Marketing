# backend/update_categories.py

from app.database import SessionLocal
from app.models import Product

db = SessionLocal()

# Map products to proper categories
category_mapping = {
    # Table Top Scales (compact, under 50kg)
    1: "table_top_scales",      # UNIQUE Tebal Top Scale
    4: "table_top_scales",      # Mini Weighing Scale
    
    # Platform Scales (heavy-duty, flat platforms)
    2: "platform_scales",       # Platform Scale 400×400mm
    5: "platform_scales",       # MS Chekar Platform
    6: "platform_scales",       # 600×600mm Platform Scale
    
    # Industrial Scales (large capacity, industrial use)
    3: "industrial_scales",     # OCS Crane Scale (15 Ton)
    8: "industrial_scales",     # Explosion-Proof Indicator
    
    # Accessories (note counters, etc.)
    7: "accessories",           # Note Counter
}

print("📂 Updating product categories...\n")

for product_id, category in category_mapping.items():
    product = db.query(Product).filter(Product.id == product_id).first()
    if product:
        old_category = product.category
        product.category = category
        print(f"✅ {product.name[:45]}")
        print(f"   {old_category} → {category}\n")

db.commit()
db.close()

print("✨ Done! Categories updated.")
