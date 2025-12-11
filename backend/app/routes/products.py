# backend/app/routes/products.py

"""
This file contains all the API endpoints related to products.
Think of each function as a 'handler' for a specific URL!
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database import get_db
from ..models import Product
from ..schemas import ProductCreate, ProductResponse, ProductUpdate

# Create a router - this groups related endpoints together
router = APIRouter()

# ============ CREATE PRODUCT ============
@router.post("/", response_model=ProductResponse, status_code=201)
async def create_product(
    product: ProductCreate,  # This validates incoming JSON data!
    db: Session = Depends(get_db)  # This gets a database session
):
    """
    Create a new product in the database.
    
    This endpoint accepts JSON data like:
    {
        "name": "Digital Weighing Scale 30kg",
        "category": "weighing_scale",
        "description": "High-precision digital scale",
        "price": 2500.00,
        "stock_quantity": 15,
        "image_url": "/images/scale-30kg.jpg"
    }
    """
    # Create a new Product instance from the validated data
    db_product = Product(**product.model_dump())
    
    # Add to database session
    db.add(db_product)
    
    # Commit the transaction (save to database)
    db.commit()
    
    # Refresh to get the generated ID and timestamps
    db.refresh(db_product)
    
    return db_product


# ============ GET ALL PRODUCTS ============
@router.get("/", response_model=List[ProductResponse])
async def get_products(
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(100, ge=1, le=100, description="Max records to return"),
    category: Optional[str] = Query(None, description="Filter by category"),
    db: Session = Depends(get_db)
):
    """
    Get a list of products with optional filtering and pagination.
    
    Examples:
    - GET /api/products/ - Get first 100 products
    - GET /api/products/?category=weighing_scale - Get only weighing scales
    - GET /api/products/?skip=20&limit=10 - Get products 21-30
    """
    # Start building the query
    query = db.query(Product)
    
    # Apply category filter if provided
    if category:
        query = query.filter(Product.category == category)
    
    # Apply pagination and execute
    products = query.offset(skip).limit(limit).all()
    
    return products


# ============ GET SINGLE PRODUCT ============
@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    """
    Get a single product by its ID.
    
    Example: GET /api/products/5
    """
    # Query the database for the product
    product = db.query(Product).filter(Product.id == product_id).first()
    
    # If not found, raise a 404 error
    if not product:
        raise HTTPException(
            status_code=404,
            detail=f"Product with ID {product_id} not found"
        )
    
    return product


# ============ UPDATE PRODUCT ============
@router.put("/{product_id}", response_model=ProductResponse)
async def update_product(
    product_id: int,
    product_update: ProductUpdate,
    db: Session = Depends(get_db)
):
    """
    Update an existing product.
    You can update any field or all fields!
    """
    # Find the product
    db_product = db.query(Product).filter(Product.id == product_id).first()
    
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Update only the fields that were provided
    update_data = product_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_product, field, value)
    
    # Commit changes
    db.commit()
    db.refresh(db_product)
    
    return db_product


# ============ DELETE PRODUCT ============
@router.delete("/{product_id}", status_code=204)
async def delete_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    """
    Delete a product from the database.
    Returns 204 No Content on success.
    """
    db_product = db.query(Product).filter(Product.id == product_id).first()
    
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    db.delete(db_product)
    db.commit()
    
    return None  # 204 response has no body


# ============ SEARCH PRODUCTS ============
@router.get("/search/", response_model=List[ProductResponse])
async def search_products(
    q: str = Query(..., min_length=1, description="Search query"),
    db: Session = Depends(get_db)
):
    """
    Search products by name or description.
    
    Example: GET /api/products/search/?q=digital
    """
    # Search in both name and description
    products = db.query(Product).filter(
        (Product.name.ilike(f"%{q}%")) | 
        (Product.description.ilike(f"%{q}%"))
    ).all()
    
    return products
