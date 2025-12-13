from app.database import SessionLocal
from app.models import Product
import sys

# Sample products - adjust fields based on your model
products_data = [
    {
        "name": "Platform Scale 500kg",
        "category": "weighing_scales",
        "price": 15000.00,
        "description": "Heavy duty platform scale for industrial use",
        "stock": 50,
        "is_featured": True,
    },
    {
        "name": "Digital Weighing Scale 30kg",
        "category": "weighing_scales",
        "price": 3500.00,
        "description": "Compact digital scale for retail shops",
        "stock": 100,
        "is_featured": True,
    },
    {
        "name": "Note Counting Machine",
        "category": "note_counters",
        "price": 8500.00,
        "description": "High-speed currency note counting machine",
        "stock": 30,
        "is_featured": False,
    },
    {
        "name": "Crane Scale 1000kg",
        "category": "weighing_scales",
        "price": 25000.00,
        "description": "Industrial crane scale with digital display",
        "stock": 20,
        "is_featured": True,
    },
    {
        "name": "Jewelry Scale 500g",
        "category": "weighing_scales",
        "price": 2500.00,
        "description": "Precision scale for jewelry and gold",
        "stock": 75,
        "is_featured": False,
    },
]

db = SessionLocal()
try:
    # Check if products already exist
    existing = db.query(Product).count()
    if existing > 0:
        print(f"⚠️  Database already has {existing} products")
        response = input("Do you want to add more products? (y/n): ")
        if response.lower() != 'y':
            print("Aborted.")
            sys.exit(0)
    
    # Add products
    added = 0
    for product_data in products_data:
        try:
            product = Product(**product_data)
            db.add(product)
            added += 1
        except Exception as e:
            print(f"⚠️  Skipping product '{product_data.get('name')}': {e}")
    
    db.commit()
    print(f"\n✅ Successfully added {added} products!")
    
    # Verify
    total = db.query(Product).count()
    print(f"📊 Total products in database: {total}")
    
    # Show all products
    all_products = db.query(Product).all()
    print("\n📦 All products in database:")
    for p in all_products:
        print(f"  {p.id}. {p.name} - ₹{p.price} ({p.category})")
    
except Exception as e:
    db.rollback()
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
finally:
    db.close()
