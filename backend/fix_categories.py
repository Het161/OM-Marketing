# backend/fix_categories.py

from app.database import SessionLocal
from app.models import Product

db = SessionLocal()

# Categorize all products into 3 main categories
category_mapping = {
    # WEIGHING SCALES (all scales go here)
    1: "weighing_scale",   # UNIQUE Tebal Top Scale
    2: "weighing_scale",   # Platform Scale 400×400mm
    3: "weighing_scale",   # OCS Crane Scale
    4: "weighing_scale",   # Mini Weighing Scale
    5: "weighing_scale",   # MS Chekar Platform
    6: "weighing_scale",   # 600×600mm Platform Scale
    8: "weighing_scale",   # Explosion-Proof Indicator (weighing)
    
    # NOTE COUNTERS
    7: "note_counter",     # Note Counter
}

print("📂 Updating product categories to match homepage...\n")

for product_id, category in category_mapping.items():
    product = db.query(Product).filter(Product.id == product_id).first()
    if product:
        old_category = product.category
        product.category = category
        print(f"✅ {product.name[:50]}")
        print(f"   {old_category} → {category}\n")

db.commit()
db.close()

print("✨ Done! Categories now match homepage structure.")
print("\nNow you have:")
print("  • weighing_scale - All types of scales")
print("  • note_counter - Note counting machines")
print("  • accessories - Parts & components")
