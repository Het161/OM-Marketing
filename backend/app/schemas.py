# backend/app/schemas.py

"""
Pydantic schemas are like 'contracts' or 'rules' for your API data.
They validate incoming data and format outgoing data.
Think of them as the 'shape' your data must have!
"""

from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime

# ============ PRODUCT SCHEMAS ============

class ProductBase(BaseModel):
    """
    Base schema that other product schemas inherit from.
    This is inheritance in action - just like programmer(employee)!
    """
    name: str = Field(..., min_length=1, max_length=255)
    category: str = Field(..., description="weighing_scale, note_counter, mobile_accessory")
    description: Optional[str] = None
    price: float = Field(..., gt=0, description="Price must be greater than 0")
    stock_quantity: int = Field(default=0, ge=0)
    image_url: Optional[str] = None
    specifications: Optional[str] = None


class ProductCreate(ProductBase):
    """
    Used when creating a new product.
    Inherits all fields from ProductBase!
    """
    pass


class ProductUpdate(BaseModel):
    """
    Used when updating a product.
    All fields are optional - you can update just one field!
    """
    name: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = Field(None, gt=0)
    stock_quantity: Optional[int] = Field(None, ge=0)
    image_url: Optional[str] = None
    specifications: Optional[str] = None


class ProductResponse(ProductBase):
    """
    This is what the API returns when you GET a product.
    It includes the database-generated fields like id and timestamps.
    """
    id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        # This tells Pydantic to work with SQLAlchemy models
        from_attributes = True


# ============ USER SCHEMAS ============

class UserBase(BaseModel):
    email: EmailStr  # EmailStr validates email format!
    username: str = Field(..., min_length=3, max_length=100)
    full_name: Optional[str] = None
    phone_number: Optional[str] = None


class UserCreate(UserBase):
    """When registering, user provides a password"""
    password: str = Field(..., min_length=8)


class UserResponse(UserBase):
    """When returning user data, NEVER include the password!"""
    id: int
    is_active: int
    created_at: datetime
    
    class Config:
        from_attributes = True


# ============ ORDER SCHEMAS ============

class OrderItemBase(BaseModel):
    product_id: int
    quantity: int = Field(..., gt=0)


class OrderItemCreate(OrderItemBase):
    pass


class OrderItemResponse(OrderItemBase):
    id: int
    order_id: int
    price_at_purchase: float
    
    class Config:
        from_attributes = True


class OrderBase(BaseModel):
    shipping_address: str


class OrderCreate(OrderBase):
    items: List[OrderItemCreate]  # List of products to order


class OrderResponse(OrderBase):
    id: int
    user_id: int
    total_amount: float
    status: str
    created_at: datetime
    order_items: List[OrderItemResponse]
    
    class Config:
        from_attributes = True
