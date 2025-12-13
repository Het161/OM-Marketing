from app.database import SessionLocal
from app.models import Product

SEED_PRODUCTS = [
    # ========== WEIGHING SCALES ==========
    {
        "name": "Table Top Weighing Scale 10KG",
        "category": "weighing_scales",
        "price": 2500.00,
        "description": "Compact digital table top weighing scale for retail and commercial use",
        "stock_quantity": 50,
        "image_url": "/images/Micro-mini.jpeg",
        "specifications": "Capacity: 10KG, Digital Display, Compact Design"
    },
    {
        "name": "Digital Weighing Scale 20KG",
        "category": "weighing_scales",
        "price": 3500.00,
        "description": "Precision digital scale with 20KG capacity for general purpose weighing",
        "stock_quantity": 45,
        "image_url": "/images/Mini-20KG.jpeg",
        "specifications": "Capacity: 20KG, LED Display, High Precision"
    },
    {
        "name": "Table Top Scale 30KG Standard",
        "category": "weighing_scales",
        "price": 4000.00,
        "description": "Professional table top weighing scale with 30KG capacity",
        "stock_quantity": 60,
        "image_url": "/images/30kg-tebal-scale.jpg",
        "specifications": "Capacity: 30KG, Platform: 240x290mm, Digital Display"
    },
    {
        "name": "Table Top Scale 30KG Handmade Premium",
        "category": "weighing_scales",
        "price": 4500.00,
        "description": "Handcrafted premium quality 30KG weighing scale with superior build",
        "stock_quantity": 35,
        "image_url": "/images/30kg-tebal-scale.jpg",
        "specifications": "Capacity: 30KG, Handmade Quality, Durable Construction"
    },
    {
        "name": "Platform Scale 300x300mm Chicken 50/100KG",
        "category": "weighing_scales",
        "price": 5500.00,
        "description": "Stainless steel chicken platform scale for poultry and meat industry",
        "stock_quantity": 40,
        "image_url": "/images/300*300mm-Chicken-ss.jpeg",
        "specifications": "Capacity: 100KG, Platform: 300x300mm, SS Construction"
    },
    {
        "name": "Platform Scale 400x400mm Chicken 100/200KG",
        "category": "weighing_scales",
        "price": 6500.00,
        "description": "Heavy duty chicken platform scale with stainless steel platform",
        "stock_quantity": 35,
        "image_url": "/images/chekar-platform.jpeg",
        "specifications": "Capacity: 200KG, Platform: 400x400mm, SS Chicken Type"
    },
    {
        "name": "Platform Scale 400x400mm Regular 100/200KG",
        "category": "weighing_scales",
        "price": 7000.00,
        "description": "Industrial platform scale for general purpose weighing applications",
        "stock_quantity": 30,
        "image_url": "/images/platform-scale.jpg",
        "specifications": "Capacity: 200KG, Platform: 400x400mm, MS Construction"
    },
    {
        "name": "Platform Scale 500x500mm Chicken 100/200/300KG",
        "category": "weighing_scales",
        "price": 7500.00,
        "description": "Large chicken platform scale for wholesale poultry operations",
        "stock_quantity": 28,
        "image_url": "/images/500*500ms.jpeg",
        "specifications": "Capacity: 300KG, Platform: 500x500mm, SS Chicken Type"
    },
    {
        "name": "Platform Scale 500x500mm Regular 100/200/300KG",
        "category": "weighing_scales",
        "price": 8000.00,
        "description": "Heavy duty platform scale for industrial weighing requirements",
        "stock_quantity": 25,
        "image_url": "/images/platform-Scale.jpeg",
        "specifications": "Capacity: 300KG, Platform: 500x500mm, MS Regular"
    },
    {
        "name": "Platform Scale 600x600mm Chicken 100/200/300/500KG",
        "category": "weighing_scales",
        "price": 8500.00,
        "description": "Extra large stainless steel chicken platform scale",
        "stock_quantity": 20,
        "image_url": "/images/600-600mm-ss-Regular.jpg",
        "specifications": "Capacity: 500KG, Platform: 600x600mm, SS Construction"
    },
    {
        "name": "Platform Scale 600x600mm Regular 100/200/300/500KG",
        "category": "weighing_scales",
        "price": 8900.00,
        "description": "Heavy duty industrial platform scale with large weighing area",
        "stock_quantity": 18,
        "image_url": "/images/600-600mm-ss-Regular.jpg",
        "specifications": "Capacity: 500KG, Platform: 600x600mm, Regular MS"
    },
    {
        "name": "Platform Scale 750x750mm Regular 100/200/300/500KG",
        "category": "weighing_scales",
        "price": 12500.00,
        "description": "Extra large industrial platform scale for heavy duty applications",
        "stock_quantity": 15,
        "image_url": "/images/750*750mm.jpeg",
        "specifications": "Capacity: 500KG, Platform: 750x750mm, Heavy Duty"
    },
    
    # ========== SPECIALIZED SCALES ==========
    {
        "name": "OCS Crane Scale 15 Ton Industrial",
        "category": "weighing_scales",
        "price": 45000.00,
        "description": "Heavy duty crane scale for industrial weighing applications",
        "stock_quantity": 8,
        "image_url": "/images/crane-scale.jpeg",
        "specifications": "Capacity: 15 Ton, Digital Display, Industrial Grade"
    },
    {
        "name": "Floor Scale Heavy Duty Industrial",
        "category": "weighing_scales",
        "price": 35000.00,
        "description": "Industrial floor scale for warehouse and logistics",
        "stock_quantity": 12,
        "image_url": "/images/Floor-Scale.jpeg",
        "specifications": "Heavy Duty, Large Platform, Digital Display"
    },
    {
        "name": "Jewelry Scale Precision 0.01g",
        "category": "weighing_scales",
        "price": 1500.00,
        "description": "High precision scale for jewelry and gems",
        "stock_quantity": 40,
        "image_url": "/images/Jewellery.jpeg",
        "specifications": "Precision: 0.01g, Capacity: 500g, Digital Display"
    },
    {
        "name": "PRC Electronic Scale Digital",
        "category": "weighing_scales",
        "price": 3200.00,
        "description": "Multi-purpose electronic weighing scale",
        "stock_quantity": 35,
        "image_url": "/images/PRC-Scale.jpeg",
        "specifications": "Digital Display, Multi-function, Portable"
    },
    {
        "name": "Contech Weighing Scale Industrial",
        "category": "weighing_scales",
        "price": 18500.00,
        "description": "Professional industrial weighing solution",
        "stock_quantity": 10,
        "image_url": "/images/Contech.jpeg",
        "specifications": "Industrial Grade, High Accuracy, Durable"
    },
    
    # ========== NOTE COUNTING MACHINES ==========
    {
        "name": "Note Counting Machine Basic",
        "category": "note_counters",
        "price": 12000.00,
        "description": "High-speed currency counter with fake note detection",
        "stock_quantity": 25,
        "image_url": "/images/Basic-NoteMachine.jpeg",
        "specifications": "Speed: 1000 notes/min, UV Detection, LED Display"
    },
    {
        "name": "Note Counter Advanced Multi-Currency",
        "category": "note_counters",
        "price": 25000.00,
        "description": "Advanced note counter with multi-currency support and fake detection",
        "stock_quantity": 15,
        "image_url": "/images/note-counter.jpg",
        "specifications": "Multi-currency, UV+MG+IR Detection, 1200 notes/min"
    },
    {
        "name": "Professional Note Counting Machine",
        "category": "note_counters",
        "price": 35000.00,
        "description": "Professional grade note counter for banks and financial institutions",
        "stock_quantity": 8,
        "image_url": "/images/Basic-Note-Machine.jpeg",
        "specifications": "Speed: 1500 notes/min, Advanced Detection, Professional Grade"
    },
    
    # ========== MOBILE ACCESSORIES ==========
    {
        "name": "Mobile Screen Protector Tempered Glass",
        "category": "mobile_accessories",
        "price": 199.00,
        "description": "Premium tempered glass screen protector with 9H hardness",
        "stock_quantity": 200,
        "image_url": None,
        "specifications": "9H Hardness, Anti-scratch, Crystal Clear"
    },
    {
        "name": "Fast Charging USB Cable Type-C",
        "category": "mobile_accessories",
        "price": 299.00,
        "description": "High-speed USB Type-C charging cable with fast charging support",
        "stock_quantity": 150,
        "image_url": None,
        "specifications": "Length: 1.5m, Fast charging, Durable braided cable"
    },
    {
        "name": "Wireless Bluetooth Earbuds TWS",
        "category": "mobile_accessories",
        "price": 1299.00,
        "description": "True wireless earbuds with charging case and long battery life",
        "stock_quantity": 60,
        "image_url": None,
        "specifications": "Bluetooth 5.0, 20hr battery life, Touch controls"
    },
    {
        "name": "Premium Phone Back Cover Shockproof",
        "category": "mobile_accessories",
        "price": 399.00,
        "description": "Shockproof phone back cover with raised edges for screen protection",
        "stock_quantity": 180,
        "image_url": None,
        "specifications": "Shockproof, Anti-slip grip, Raised edges"
    },
    {
        "name": "Magnetic Car Phone Holder 360°",
        "category": "mobile_accessories",
        "price": 599.00,
        "description": "360° rotating magnetic car phone mount for safe driving",
        "stock_quantity": 90,
        "image_url": None,
        "specifications": "Universal fit, Strong magnet, 360° rotation"
    },
    {
        "name": "Power Bank 20000mAh Fast Charge",
        "category": "mobile_accessories",
        "price": 1999.00,
        "description": "High capacity power bank with dual USB ports and fast charging",
        "stock_quantity": 45,
        "image_url": None,
        "specifications": "Capacity: 20000mAh, Fast charging, Dual USB ports"
    },
]

def seed_database():
    """Seed the database with initial products"""
    db = SessionLocal()
    try:
        # Check if already seeded
        existing_count = db.query(Product).count()
        if existing_count > 0:
            return {
                "status": "already_seeded",
                "message": f"Database already has {existing_count} products",
                "count": existing_count
            }
        
        # Add all products
        for product_data in SEED_PRODUCTS:
            product = Product(**product_data)
            db.add(product)
        
        db.commit()
        
        final_count = db.query(Product).count()
        return {
            "status": "success",
            "message": f"Successfully seeded {len(SEED_PRODUCTS)} products",
            "count": final_count
        }
    except Exception as e:
        db.rollback()
        return {
            "status": "error",
            "message": str(e)
        }
    finally:
        db.close()
