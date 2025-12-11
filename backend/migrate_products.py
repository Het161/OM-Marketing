#!/usr/bin/env python3
import sqlite3
import requests
import json
import time

# Connect to local database
conn = sqlite3.connect('om_marketing.db')
conn.row_factory = sqlite3.Row
cursor = conn.cursor()

# Fetch all products
cursor.execute("SELECT name, category, description, price, stock_quantity, image_url, specifications FROM products")
products = cursor.fetchall()

print(f"🔍 Found {len(products)} products in local database\n")
print("=" * 70)

# Upload to production
production_url = "https://om-marketing.onrender.com/api/products/"
success_count = 0
error_count = 0

for idx, product in enumerate(products, 1):
    product_data = {
        "name": product["name"],
        "category": product["category"],
        "description": product["description"] or "",
        "price": float(product["price"]),
        "stock_quantity": int(product["stock_quantity"]),
        "image_url": product["image_url"] or "",
        "specifications": product["specifications"] if product["specifications"] else ""

    }
    
    try:
        print(f"\n[{idx}/{len(products)}] Uploading: {product['name'][:50]}...")
        response = requests.post(production_url, json=product_data, timeout=10)
        
        if response.status_code in [200, 201]:
            print(f"    ✅ SUCCESS - Price: ₹{product['price']} | Stock: {product['stock_quantity']}")
            success_count += 1
        else:
            print(f"    ❌ FAILED - Status: {response.status_code}")
            print(f"    Error: {response.text[:100]}")
            error_count += 1
            
        # Small delay to avoid overwhelming the server
        time.sleep(0.5)
        
    except requests.exceptions.Timeout:
        print(f"    ⏱️  TIMEOUT - Server might be sleeping, retrying in 30s...")
        time.sleep(30)
        try:
            response = requests.post(production_url, json=product_data, timeout=15)
            if response.status_code in [200, 201]:
                print(f"    ✅ RETRY SUCCESS")
                success_count += 1
            else:
                print(f"    ❌ RETRY FAILED")
                error_count += 1
        except Exception as e:
            print(f"    ❌ RETRY ERROR: {str(e)}")
            error_count += 1
            
    except Exception as e:
        print(f"    ❌ ERROR: {str(e)}")
        error_count += 1

conn.close()

print("\n" + "=" * 70)
print(f"\n📊 MIGRATION COMPLETE!")
print(f"✅ Successfully migrated: {success_count} products")
print(f"❌ Failed: {error_count} products")
print(f"📈 Success rate: {(success_count/len(products)*100):.1f}%")
print("\n🌐 Check your products at:")
print("   - https://om-marketing.onrender.com/api/products/")
print("   - https://om-marketing.vercel.app/products")
print("   - http://localhost:3000/products")
