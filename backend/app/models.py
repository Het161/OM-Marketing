# backend/app/models.py

"""
Think of models as BLUEPRINTS for your database tables.
Just like you create a class Employee and then programmer(Employee),
we're creating classes that represent our database structure!
"""

from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

# This is our BASE class for all products
# Like your 'employee' class that others inherit from!
class Product(Base):
    __tablename__ = "products"
    
    # These are like attributes of your class
    # Column() tells SQLAlchemy "this is a database column"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)  # Product name
    category = Column(String(100), nullable=False)  # weighing_scale, note_counter, mobile_accessory
    description = Column(Text, nullable=True)
    price = Column(Float, nullable=False)
    stock_quantity = Column(Integer, default=0)
    image_url = Column(String(500), nullable=True)
    specifications = Column(Text, nullable=True)  # JSON string for specs
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationship: One product can have many order items
    order_items = relationship("OrderItem", back_populates="product")
    
    # This is like your show() method!
    # It returns a dictionary representation of the product
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "category": self.category,
            "description": self.description,
            "price": self.price,
            "stock_quantity": self.stock_quantity,
            "image_url": self.image_url,
            "specifications": self.specifications
        }


# This inherits behavior but adds specific features
# Just like programmer(employee) inherits from employee!
class WeighingScale(Product):
    """
    Specific product type for weighing scales
    This demonstrates INHERITANCE - a key OOP concept!
    """
    __tablename__ = "weighing_scales"
    
    id = Column(Integer, ForeignKey('products.id'), primary_key=True)
    capacity = Column(String(50))  # e.g., "10kg", "30kg", "200kg"
    platform_size = Column(String(50))  # e.g., "240x290mm"
    accuracy_class = Column(String(20))  # e.g., "III", "OIML"
    type = Column(String(50))  # e.g., "tebal_top", "platform", "crane"
    
    # This polymorphic identity helps SQLAlchemy know this is a WeighingScale
    __mapper_args__ = {
        'polymorphic_identity': 'weighing_scale',
    }


class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    username = Column(String(100), unique=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255))
    phone_number = Column(String(20))
    is_active = Column(Integer, default=1)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    orders = relationship("Order", back_populates="user")


class Order(Base):
    __tablename__ = "orders"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    total_amount = Column(Float, nullable=False)
    status = Column(String(50), default="pending")  # pending, confirmed, shipped, delivered
    shipping_address = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="orders")
    order_items = relationship("OrderItem", back_populates="order")


class Invoice(Base):
    """
    A bill issued to a customer.

    OM Marketing is MSME (Udyam) registered but NOT registered under GST, so
    these are plain invoices / bills of supply: no GSTIN, no tax columns, and
    no tax may be collected on them.
    """

    __tablename__ = "invoices"

    id = Column(Integer, primary_key=True, index=True)

    # Human-facing number, e.g. OM/2026-27/0001 — unique and never reused
    invoice_number = Column(String(40), unique=True, nullable=False, index=True)

    # Unguessable token for the shareable public link
    public_token = Column(String(64), unique=True, nullable=False, index=True)

    # --- Customer -----------------------------------------------------------
    customer_name = Column(String(160), nullable=False)
    customer_email = Column(String(255), nullable=True)
    customer_phone = Column(String(30), nullable=True)
    customer_address = Column(Text, nullable=True)

    # Optional business details
    business_name = Column(String(200), nullable=True)
    business_gstin = Column(String(20), nullable=True)  # the customer's, for their records
    business_notes = Column(Text, nullable=True)

    # --- Money (all rupees) -------------------------------------------------
    subtotal = Column(Float, nullable=False, default=0)
    discount_amount = Column(Float, nullable=False, default=0)
    delivery_charge = Column(Float, nullable=False, default=0)
    total = Column(Float, nullable=False, default=0)
    amount_in_words = Column(String(400), nullable=True)

    # --- Terms --------------------------------------------------------------
    payment_mode = Column(String(40), nullable=True)  # Cash, UPI, Bank transfer, Cheque
    notes = Column(Text, nullable=True)
    terms = Column(Text, nullable=True)

    # draft | sent | paid | cancelled
    status = Column(String(20), nullable=False, default="draft", index=True)

    # The exact moment the bill was raised — shown on the invoice
    issued_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    emailed_at = Column(DateTime, nullable=True)

    items = relationship(
        "InvoiceItem",
        back_populates="invoice",
        cascade="all, delete-orphan",
        order_by="InvoiceItem.position",
    )


class InvoiceItem(Base):
    """One line on an invoice."""

    __tablename__ = "invoice_items"

    id = Column(Integer, primary_key=True, index=True)
    invoice_id = Column(Integer, ForeignKey("invoices.id"), nullable=False, index=True)

    position = Column(Integer, nullable=False, default=0)
    description = Column(String(400), nullable=False)
    unit = Column(String(20), nullable=True, default="Nos")
    quantity = Column(Float, nullable=False, default=1)
    rate = Column(Float, nullable=False, default=0)
    amount = Column(Float, nullable=False, default=0)

    invoice = relationship("Invoice", back_populates="items")


class Enquiry(Base):
    """
    Every lead the website captures — contact messages, quote requests and
    service/AMC bookings all land in this one table so nothing gets lost if
    an email fails to send.
    """

    __tablename__ = "enquiries"

    id = Column(Integer, primary_key=True, index=True)

    # contact | quote | service
    enquiry_type = Column(String(20), nullable=False, default="contact", index=True)

    # Who is asking
    name = Column(String(120), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    phone = Column(String(30), nullable=True)
    company = Column(String(180), nullable=True)

    # What they want
    subject = Column(String(200), nullable=True)
    message = Column(Text, nullable=True)

    # Quote requests: a readable list of the items in their quote cart
    items_summary = Column(Text, nullable=True)
    # Raw JSON of the cart / form payload, kept for reference
    payload = Column(Text, nullable=True)

    # Service bookings
    service_type = Column(String(80), nullable=True)
    preferred_date = Column(String(40), nullable=True)

    # Which page the enquiry came from
    source = Column(String(200), nullable=True)

    # new | contacted | quoted | closed
    status = Column(String(20), nullable=False, default="new", index=True)

    created_at = Column(DateTime, default=datetime.utcnow, index=True)


class OrderItem(Base):
    __tablename__ = "order_items"
    
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey('orders.id'), nullable=False)
    product_id = Column(Integer, ForeignKey('products.id'), nullable=False)
    quantity = Column(Integer, nullable=False)
    price_at_purchase = Column(Float, nullable=False)  # Store price at time of purchase
    
    # Relationships
    order = relationship("Order", back_populates="order_items")
    product = relationship("Product", back_populates="order_items")
