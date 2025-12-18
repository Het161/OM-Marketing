# # backend/update_prices.py

# from app.database import SessionLocal
# from app.models import Product

# db = SessionLocal()

# # 💰 UPDATE YOUR PRICES HERE:
# price_updates = {
#     "UNIQUE Tebal": 4000.00,
#     "Platform Scale 400": 8500.00,
#     "OCS Crane": 45000.00,
#     "Mini Weighing": 3500.00,
#     "500*500mm MS Chekar": 7500.00,
#     "600×600mm": 8500.00,
#     "INFRES": 8500.00,
#     "Explosion-Proof": 25000.00,
# }

# print("💰 Updating prices...\n")

# for name_keyword, new_price in price_updates.items():
#     product = db.query(Product).filter(Product.name.contains(name_keyword)).first()
#     if product:
#         old_price = product.price
#         product.price = new_price
#         print(f"✅ {product.name}")
#         print(f"   ₹{old_price:,.0f} → ₹{new_price:,.0f}\n")

# db.commit()
# db.close()

# print("✨ Done! Prices updated in database.")






"""
Script to update product prices in the database
"""
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Product

def list_all_products():
    """List all products with their current prices"""
    db = SessionLocal()
    try:
        products = db.query(Product).order_by(Product.id).all()
        print("\n📦 ALL PRODUCTS IN DATABASE:")
        print("=" * 70)
        for p in products:
            print(f"ID: {p.id:3d} | ₹{p.price:8,.2f} | {p.name}")
        print("=" * 70)
        print(f"Total: {len(products)} products\n")
    finally:
        db.close()

def update_price_by_id(product_id: int, new_price: float):
    """Update product price by ID"""
    db = SessionLocal()
    try:
        product = db.query(Product).filter(Product.id == product_id).first()
        
        if not product:
            print(f"❌ Product with ID {product_id} not found!")
            return False
        
        old_price = product.price
        product.price = new_price
        db.commit()
        
        print(f"\n✅ SUCCESS!")
        print(f"   Product: {product.name}")
        print(f"   Old Price: ₹{old_price:,.2f}")
        print(f"   New Price: ₹{new_price:,.2f}\n")
        return True
        
    except Exception as e:
        db.rollback()
        print(f"❌ ERROR: {str(e)}")
        return False
    finally:
        db.close()

def update_price_by_name(product_name: str, new_price: float):
    """Update product price by name (partial match)"""
    db = SessionLocal()
    try:
        product = db.query(Product).filter(
            Product.name.ilike(f"%{product_name}%")
        ).first()
        
        if not product:
            print(f"❌ Product containing '{product_name}' not found!")
            print("💡 Tip: Run list_all_products() to see available products")
            return False
        
        old_price = product.price
        product.price = new_price
        db.commit()
        
        print(f"\n✅ SUCCESS!")
        print(f"   Product: {product.name}")
        print(f"   Old Price: ₹{old_price:,.2f}")
        print(f"   New Price: ₹{new_price:,.2f}\n")
        return True
        
    except Exception as e:
        db.rollback()
        print(f"❌ ERROR: {str(e)}")
        return False
    finally:
        db.close()

if __name__ == "__main__":
    print("🔧 Product Price Updater\n")
    
    # First, list all products to find the correct name/ID
    list_all_products()
    
    # Then update the PRC Electronic Scale
    # Option 1: Update by name (if product exists)
    # update_price_by_name("PRC", 6200)
    
    # Option 2: Update by ID (once you know the ID from the list above)
    # update_price_by_id(123, 6200)  # Replace 123 with actual ID
