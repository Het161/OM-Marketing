# backend/add_sample_products.py

"""
Script to add sample products based on OM Marketing's actual inventory
Run this once to populate your database with products!
"""

import requests
import json

BASE_URL = "http://127.0.0.1:8000/api/products/"

# Sample products with CORRECT image paths matching your images folder
products = [
    {
        "name": "UNIQUE Tebal Top Scale 10/20/30kg - 240x290mm",
        "category": "weighing_scale",
        "description": "High-precision digital tebal top weighing scale with stainless steel platform. Perfect for retail shops, kitchens, and small businesses.",
        "price": 2500.00,
        "stock_quantity": 25,
        "image_url": "/images/30kg-tebal-scale.jpg",  # ✅ Correct filename
        "specifications": json.dumps({
            "capacity": "10/20/30kg",
            "platform_size": "240x290mm",
            "accuracy": "±5g",
            "display": "LED",
            "power": "Rechargeable battery",
            "brand": "UNIQUE"
        })
    },
    {
        "name": "Platform Scale 400x400mm - 200kg Capacity",
        "category": "weighing_scale",
        "description": "Heavy-duty platform scale ideal for warehouses, industries, and heavy goods weighing. Comes with digital indicator.",
        "price": 8500.00,
        "stock_quantity": 10,
        "image_url": "/images/platform-scale.jpg",  # ✅ Correct filename
        "specifications": json.dumps({
            "capacity": "200kg",
            "platform_size": "400x400mm",
            "accuracy": "±20g",
            "display": "Digital LED display",
            "material": "Mild Steel platform",
            "power": "AC/DC"
        })
    },
    {
        "name": "OCS Crane Scale 15 Ton Industrial Grade",
        "category": "weighing_scale",
        "description": "Professional crane scale for industrial use. Features overload protection and remote display.",
        "price": 45000.00,
        "stock_quantity": 5,
        "image_url": "/images/crane-scale.jpg",  # ✅ Correct filename
        "specifications": json.dumps({
            "capacity": "15 Ton (15000kg)",
            "accuracy_class": "III",
            "power": "DC 6V",
            "graduation": "5kg",
            "model": "OCS-15T",
            "features": "Remote display, Overload protection"
        })
    },
    {
        "name": "Mini Weighing Scale 10/20kg MS Series",
        "category": "weighing_scale",
        "description": "Compact and portable weighing scale perfect for small shops, jewelry stores, and retail counters.",
        "price": 3500.00,
        "stock_quantity": 50,
        "image_url": "/images/mini-scale.jpg",  # ✅ Correct filename
        "specifications": json.dumps({
            "capacity": "10/20kg",
            "platform_size": "230x310mm",
            "accuracy": "±2g",
            "display": "LCD",
            "power": "Rechargeable",
            "brand": "UNIQUE"
        })
    },
    {
        "name": "MS Chekar Platform 500x500mm - 500kg",
        "category": "weighing_scale",
        "description": "Heavy-duty MS Chekar platform scale with non-slip surface. Ideal for industrial weighing applications.",
        "price": 12500.00,
        "stock_quantity": 8,
        "image_url": "/images/chekar-platform.jpg",  # ✅ Correct filename
        "specifications": json.dumps({
            "capacity": "500kg",
            "platform_size": "500x500mm",
            "accuracy": "±50g",
            "platform_type": "MS Chekar (Anti-slip)",
            "display": "Digital indicator",
            "power": "AC adapter"
        })
    },
    {
        "name": "600×600mm Platform Scale 100/200/300/500kg",
        "category": "weighing_scale",
        "description": "Versatile stainless steel platform scale available in multiple capacities. Suitable for various commercial applications.",
        "price": 15000.00,
        "stock_quantity": 12,
        "image_url": "/images/ss-platform-600.jpg",  # ✅ Correct filename
        "specifications": json.dumps({
            "capacity": "100/200/300/500kg",
            "platform_size": "600x600mm",
            "material": "Stainless Steel",
            "accuracy": "±20g",
            "display": "LED digital",
            "power": "AC/DC"
        })
    },
    {
        "name": "INFRES SuperTech-IN Banknote Counter",
        "category": "note_counter",
        "description": "High-speed automatic currency note counting machine with counterfeit detection. Perfect for banks, retail stores, and cash-heavy businesses.",
        "price": 8500.00,
        "stock_quantity": 15,
        "image_url": "/images/note-counter.jpg",  # ✅ Correct filename
        "specifications": json.dumps({
            "speed": "1000 notes/minute",
            "display": "LED display",
            "features": "UV detection, Magnetic detection, Auto start/stop",
            "hopper_capacity": "200 notes",
            "brand": "INFRES SuperTech-IN"
        })
    },
    {
        "name": "Explosion-Proof Weighing Indicator 2 Ton",
        "category": "weighing_scale",
        "description": "Specialized explosion-proof weighing indicator for hazardous environments. Certified for industrial safety.",
        "price": 35000.00,
        "stock_quantity": 3,
        "image_url": "/images/Heavy-meter.jpeg",  # ✅ Correct filename
        "specifications": json.dumps({
            "capacity": "2 Ton (2000kg)",
            "certification": "Explosion-proof rated",
            "display": "LED",
            "power": "DC power supply",
            "environment": "Hazardous area approved"
        })
    }
]

def add_products():
    """Add all sample products to the database"""
    print("🚀 Adding sample products to OM Marketing database...\n")
    
    success_count = 0
    for i, product in enumerate(products, 1):
        try:
            response = requests.post(BASE_URL, json=product)
            if response.status_code == 201:
                print(f"✅ [{i}/{len(products)}] Added: {product['name']}")
                success_count += 1
            else:
                print(f"❌ [{i}/{len(products)}] Failed: {product['name']}")
                print(f"   Error: {response.text}")
        except Exception as e:
            print(f"❌ [{i}/{len(products)}] Error adding {product['name']}: {str(e)}")
    
    print(f"\n✨ Finished! Successfully added {success_count}/{len(products)} products.")
    print("\n📋 You can view them at:")
    print("   - API: http://127.0.0.1:8000/api/products/")
    print("   - Docs: http://127.0.0.1:8000/docs")
    print("   - Frontend: http://localhost:3000/products")

if __name__ == "__main__":
    add_products()
