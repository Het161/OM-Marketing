




# # backend/app/main.py
# """
# FastAPI Application Entry Point
# This is the main entry point for the OM Marketing API
# """
# from fastapi import FastAPI, Request
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import JSONResponse
# from .database import engine, Base
# from .routes import products, orders, auth, contact

# # Create all database tables
# Base.metadata.create_all(bind=engine)

# # Initialize FastAPI app
# app = FastAPI(
#     title="OM Marketing API",
#     description="E-commerce API for weighing scales, note counters, and mobile accessories",
#     version="1.0.0"
# )

# # CORS Configuration - Allow all origins for Vercel preview deployments
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Allow ALL origins (required for dynamic Vercel URLs)
#     allow_credentials=False,  # Must be False when using "*"
#     allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
#     allow_headers=["*"],
#     expose_headers=["*"],
#     max_age=3600,
# )

# # Explicit OPTIONS handler for CORS preflight requests
# @app.options("/{full_path:path}")
# async def options_handler(request: Request, full_path: str):
#     """Handle OPTIONS requests for CORS preflight"""
#     return JSONResponse(
#         content={},
#         status_code=200,
#         headers={
#             "Access-Control-Allow-Origin": "*",
#             "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
#             "Access-Control-Allow-Headers": "*",
#             "Access-Control-Max-Age": "3600",
#         }
#     )

# # Include API routers
# app.include_router(products.router, prefix="/api/products", tags=["Products"])
# app.include_router(orders.router, prefix="/api/orders", tags=["Orders"])
# app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
# app.include_router(contact.router, prefix="/api", tags=["Contact"])

# # Root endpoint
# @app.get("/")
# async def root():
#     """API welcome endpoint"""
#     return {
#         "message": "Welcome to OM Marketing API!",
#         "status": "active",
#         "docs": "/docs",
#         "version": "1.0.0",
#         "frontend": "https://om-marketing-git-main-het-patels-projects-7277c57e.vercel.app"
#     }

# # Health check endpoint
# @app.get("/health")
# async def health_check():
#     """Health check endpoint for monitoring"""
#     return {
#         "status": "healthy", 
#         "service": "OM Marketing API",
#         "version": "1.0.0"
#     }
# # ONE-TIME SEED ENDPOINT (Remove after use!)
# from app.seed_data import seed_database

# @app.post("/admin/seed-database")
# async def seed_db_endpoint():
#     """
#     ONE-TIME USE: Seeds the database with initial products.
#     Call this endpoint once to populate Render database.
#     """
#     return seed_database()

# # ADMIN: Fix category names from plural to singular
# @app.post("/admin/fix-categories")
# async def fix_categories():
#     """Update category names from plural to singular for frontend compatibility"""
#     from app.database import SessionLocal
#     from app.models import Product
#     from sqlalchemy import func
    
#     db = SessionLocal()
#     try:
#         # Map old plural names to new singular names
#         updates = [
#             ("weighing_scales", "weighing_scale"),
#             ("note_counters", "note_counter"),
#             ("mobile_accessories", "mobile_accessory")
#         ]
        
#         total_updated = 0
#         results = []
        
#         for old_cat, new_cat in updates:
#             count = db.query(Product).filter(Product.category == old_cat).update(
#                 {"category": new_cat},
#                 synchronize_session=False
#             )
#             if count > 0:
#                 results.append(f"{old_cat} → {new_cat}: {count} products")
#             total_updated += count
        
#         db.commit()
        
#         # Get current distribution
#         categories = db.query(Product.category, func.count(Product.id)).group_by(Product.category).all()
        
#         return {
#             "status": "success",
#             "total_updated": total_updated,
#             "updates": results,
#             "current_categories": [{"name": cat, "count": count} for cat, count in categories]
#         }
        
#     except Exception as e:
#         db.rollback()
#         return {"status": "error", "message": str(e)}
#     finally:
#         db.close()








# backend/app/main.py
"""
FastAPI Application Entry Point
Enhanced with database health checks and better error handling
"""
from fastapi import FastAPI, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy import text, func
import os


from .database import engine, Base, get_db
from .routes import products, orders, auth, contact


# Create all database tables
Base.metadata.create_all(bind=engine)


# Initialize FastAPI app
app = FastAPI(
    title="OM Marketing API",
    description="E-commerce API for weighing scales, note counters, and mobile accessories",
    version="1.0.0"
)


# ✅ Enhanced CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow ALL origins (required for dynamic Vercel URLs)
    allow_credentials=False,  # Must be False when using "*"
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=3600,
)


# Explicit OPTIONS handler for CORS preflight requests
@app.options("/{full_path:path}")
async def options_handler(request: Request, full_path: str):
    """Handle OPTIONS requests for CORS preflight"""
    return JSONResponse(
        content={},
        status_code=200,
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Max-Age": "3600",
        }
    )


# Include API routers
app.include_router(products.router, prefix="/api/products", tags=["Products"])
app.include_router(orders.router, prefix="/api/orders", tags=["Orders"])
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(contact.router, prefix="/api", tags=["Contact"])


# ✅ Enhanced root endpoint
@app.get("/")
async def root():
    """API welcome endpoint"""
    return {
        "message": "OM Marketing API - Welcome! 🎉",
        "status": "active",
        "docs": "/docs",
        "health": "/health",
        "version": "1.0.0",
        "frontend": "https://ommarketing.co.in"
    }


# ✅ Enhanced health check with database connection test
@app.get("/health")
async def health_check(db: Session = Depends(get_db)):
    """
    Health check endpoint that verifies database connection.
    Used by UptimeRobot to keep Render service warm.
    Returns product count to verify data integrity.
    """
    try:
        # Test database connection
        db.execute(text("SELECT 1"))
        db_status = "connected"
        
        # Get product count to verify data
        from .models import Product
        product_count = db.query(Product).count()
        
        # Detect database type
        db_type = "PostgreSQL" if os.getenv('DATABASE_URL') else "SQLite"
        
    except Exception as e:
        db_status = f"error: {str(e)}"
        product_count = 0
        db_type = "unknown"
    
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "service": "OM Marketing API",
        "version": "1.0.0",
        "database": {
            "status": db_status,
            "type": db_type,
            "products_count": product_count
        },
        "message": "All systems operational ✅"
    }


# ✅ ONE-TIME SEED ENDPOINT
from app.seed_data import seed_database


@app.post("/admin/seed-database")
async def seed_db_endpoint():
    """
    ONE-TIME USE: Seeds the database with initial products.
    Call this endpoint once to populate the database.
    Works for both SQLite (local) and PostgreSQL (Render).
    """
    return seed_database()


# ✅ ADMIN: Fix category names
@app.post("/admin/fix-categories")
async def fix_categories(db: Session = Depends(get_db)):
    """
    Update category names from plural to singular for frontend compatibility.
    Example: weighing_scales → weighing_scale
    """
    from .models import Product
    
    try:
        # Map old plural names to new singular names
        updates = [
            ("weighing_scales", "weighing_scale"),
            ("note_counters", "note_counter"),
            ("mobile_accessories", "mobile_accessory")
        ]
        
        total_updated = 0
        results = []
        
        for old_cat, new_cat in updates:
            count = db.query(Product).filter(Product.category == old_cat).update(
                {"category": new_cat},
                synchronize_session=False
            )
            if count > 0:
                results.append(f"{old_cat} → {new_cat}: {count} products")
            total_updated += count
        
        db.commit()
        
        # Get current distribution
        categories = db.query(
            Product.category, 
            func.count(Product.id)
        ).group_by(Product.category).all()
        
        return {
            "status": "success",
            "total_updated": total_updated,
            "updates": results,
            "current_categories": [
                {"name": cat, "count": count} 
                for cat, count in categories
            ]
        }
        
    except Exception as e:
        db.rollback()
        return {
            "status": "error", 
            "message": str(e)
        }


# ✅ ADMIN: Update Product Price by ID
@app.patch("/admin/update-price/{product_id}")
async def update_product_price(
    product_id: int, 
    new_price: float,
    db: Session = Depends(get_db)
):
    """
    Update product price by product ID.
    Usage: PATCH /admin/update-price/15?new_price=6200
    """
    from .models import Product
    
    try:
        product = db.query(Product).filter(Product.id == product_id).first()
        
        if not product:
            return JSONResponse(
                status_code=404,
                content={
                    "status": "error",
                    "message": f"Product with ID {product_id} not found"
                }
            )
        
        old_price = product.price
        product.price = new_price
        db.commit()
        
        return {
            "status": "success",
            "message": f"Price updated successfully",
            "product": {
                "id": product.id,
                "name": product.name,
                "category": product.category,
                "old_price": old_price,
                "new_price": new_price
            }
        }
        
    except Exception as e:
        db.rollback()
        return JSONResponse(
            status_code=500,
            content={
                "status": "error",
                "message": str(e)
            }
        )


# ✅ ADMIN: Update Product Price by Name
@app.patch("/admin/update-price-by-name")
async def update_product_price_by_name(
    product_name: str,
    new_price: float,
    db: Session = Depends(get_db)
):
    """
    Update product price by product name (partial match).
    Usage: PATCH /admin/update-price-by-name?product_name=PRC&new_price=6200
    """
    from .models import Product
    
    try:
        product = db.query(Product).filter(
            Product.name.ilike(f"%{product_name}%")
        ).first()
        
        if not product:
            return JSONResponse(
                status_code=404,
                content={
                    "status": "error",
                    "message": f"Product containing '{product_name}' not found"
                }
            )
        
        old_price = product.price
        product.price = new_price
        db.commit()
        
        return {
            "status": "success",
            "message": f"Price updated successfully",
            "product": {
                "id": product.id,
                "name": product.name,
                "category": product.category,
                "old_price": old_price,
                "new_price": new_price
            }
        }
        
    except Exception as e:
        db.rollback()
        return JSONResponse(
            status_code=500,
            content={
                "status": "error",
                "message": str(e)
            }
        )


# ✅ ADMIN: Bulk Update Multiple Products
@app.post("/admin/bulk-update-prices")
async def bulk_update_prices(
    updates: list[dict],
    db: Session = Depends(get_db)
):
    """
    Bulk update multiple product prices.
    Usage: POST /admin/bulk-update-prices
    Body: [{"id": 15, "price": 6200}, {"id": 34, "price": 6200}]
    """
    from .models import Product
    
    try:
        results = []
        
        for update in updates:
            product_id = update.get("id")
            new_price = update.get("price")
            
            if not product_id or not new_price:
                results.append({
                    "id": product_id,
                    "status": "error",
                    "message": "Missing id or price"
                })
                continue
            
            product = db.query(Product).filter(Product.id == product_id).first()
            
            if not product:
                results.append({
                    "id": product_id,
                    "status": "error",
                    "message": f"Product not found"
                })
                continue
            
            old_price = product.price
            product.price = new_price
            
            results.append({
                "id": product.id,
                "name": product.name,
                "status": "success",
                "old_price": old_price,
                "new_price": new_price
            })
        
        db.commit()
        
        success_count = sum(1 for r in results if r["status"] == "success")
        
        return {
            "status": "completed",
            "total": len(updates),
            "successful": success_count,
            "failed": len(updates) - success_count,
            "results": results
        }
        
    except Exception as e:
        db.rollback()
        return JSONResponse(
            status_code=500,
            content={
                "status": "error",
                "message": str(e)
            }
        )


# ✅ ADMIN: List All Products with Prices
@app.get("/admin/list-products")
async def list_all_products(db: Session = Depends(get_db)):
    """
    List all products with their current prices.
    Useful for seeing what products exist before updating.
    """
    from .models import Product
    
    try:
        products = db.query(Product).order_by(Product.id).all()
        
        return {
            "status": "success",
            "total": len(products),
            "products": [
                {
                    "id": p.id,
                    "name": p.name,
                    "price": p.price,
                    "category": p.category,
                    "stock": p.stock
                }
                for p in products
            ]
        }
        
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={
                "status": "error",
                "message": str(e)
            }
        )
