from app.database import SessionLocal
from app.models import Product
import json

with open("products_export.json", "r") as f:
    products_data = json.load(f)

db = SessionLocal()
try:
    for product_data in products_data:
        product = Product(**product_data)
        db.add(product)
    
    db.commit()
    count = db.query(Product).count()
    print(f"✅ Imported {len(products_data)} products! Total in DB: {count}")
    
except Exception as e:
    db.rollback()
    print(f"❌ Error: {e}")
finally:
    db.close()
