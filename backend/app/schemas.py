# backend/app/schemas.py

"""
Pydantic schemas are like 'contracts' or 'rules' for your API data.
They validate incoming data and format outgoing data.
Think of them as the 'shape' your data must have!
"""

import re
from pydantic import BaseModel, EmailStr, Field, field_validator
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


# ============ ENQUIRY SCHEMAS ============

def normalise_indian_mobile(raw: str) -> Optional[str]:
    """
    Return the 10-digit mobile number, or None if it isn't a valid one.

    People write numbers every which way — "98252 47312", "+91-9825247312",
    "09825247312", "(98252) 47312" — so we strip everything that isn't a digit
    and validate what's left, rather than trying to match the formatting.
    """
    digits = re.sub(r"\D", "", raw or "")

    if len(digits) == 12 and digits.startswith("91"):
        digits = digits[2:]
    elif len(digits) == 11 and digits.startswith("0"):
        digits = digits[1:]

    # Indian mobile numbers are 10 digits and start with 6, 7, 8 or 9
    if len(digits) == 10 and digits[0] in "6789":
        return digits
    return None


class EnquiryBase(BaseModel):
    """Fields every enquiry form collects."""

    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=30)
    company: Optional[str] = Field(None, max_length=180)
    message: Optional[str] = Field(None, max_length=4000)
    source: Optional[str] = Field(None, max_length=200)

    # Honeypot: real users never fill this hidden field, bots do.
    website: Optional[str] = Field(None, max_length=200, exclude=True)

    @field_validator("phone")
    @classmethod
    def check_phone(cls, value: Optional[str]) -> Optional[str]:
        """Validated here rather than with `pattern=` so the customer sees a
        readable message instead of a raw regular expression."""
        if value is None or not value.strip():
            return None
        normalised = normalise_indian_mobile(value)
        if normalised is None:
            raise ValueError("Enter a valid 10-digit Indian mobile number")
        return normalised


class ContactCreate(EnquiryBase):
    subject: Optional[str] = Field(None, max_length=200)
    message: str = Field(..., min_length=5, max_length=4000)


class QuoteItem(BaseModel):
    product_id: Optional[int] = None
    name: str = Field(..., max_length=255)
    quantity: int = Field(1, gt=0, le=999)
    price: Optional[float] = Field(None, ge=0)


class QuoteCreate(EnquiryBase):
    items: List[QuoteItem] = Field(..., min_length=1)


class ServiceCreate(EnquiryBase):
    service_type: str = Field(..., max_length=80)
    preferred_date: Optional[str] = Field(None, max_length=40)
    message: Optional[str] = Field(None, max_length=4000)


class EnquiryResponse(BaseModel):
    id: int
    enquiry_type: str
    name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    subject: Optional[str] = None
    message: Optional[str] = None
    items_summary: Optional[str] = None
    service_type: Optional[str] = None
    preferred_date: Optional[str] = None
    source: Optional[str] = None
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class EnquiryAck(BaseModel):
    """What the website gets back after a successful submission."""

    id: int
    reference: str
    message: str
