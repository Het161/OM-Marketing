from app.database import SessionLocal
from app.models import Product
from sqlalchemy import func

db = SessionLocal()

try:
    # Update all product categories from plural to singular
    updates = [
        ("weighing_scales", "weighing_scale"),
        ("note_counters", "note_counter"),
        ("mobile_accessories", "mobile_accessory")
    ]
    
    total_updated = 0
    for old_cat, new_cat in updates:
        result = db.query(Product).filter(Product.category == old_cat).update(
            {"category": new_cat},
            synchronize_session=False
        )
        print(f"✅ Updated {result} products: {old_cat} → {new_cat}")
        total_updated += result
    
    db.commit()
    
    print(f"\n🎉 Total updated: {total_updated} products")
    
    # Show new category distribution
    print("\n📊 New Category Distribution:")
    categories = db.query(Product.category, func.count(Product.id)).group_by(Product.category).all()
    for cat, count in categories:
        print(f"  - {cat}: {count} products")
        
except Exception as e:
    db.rollback()
    print(f"❌ Error: {e}")
finally:
    db.close()
