# backend/app/main.py

"""
This is the ENTRY POINT of your FastAPI application!
Like the main() function in other programs.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routes import products, orders, auth
from app.routes import contact


# Create all database tables
# This reads your models and creates the actual database tables!
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="OM Marketing API",
    description="E-commerce API for weighing scales, note counters, and mobile accessories",
    version="1.0.0"
)

# CORS middleware - allows your frontend to talk to your backend
# This is IMPORTANT for security!
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://your-frontend-domain.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE)
    allow_headers=["*"],  # Allow all headers
)

# Include routers - these are like 'sections' of your API
# Each router handles related endpoints
app.include_router(products.router, prefix="/api/products", tags=["Products"])
app.include_router(orders.router, prefix="/api/orders", tags=["Orders"])
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(contact.router, prefix="/api", tags=["contact"])

# Root endpoint - like a welcome message!
@app.get("/")
async def root():
    """
    This is a simple endpoint to check if the API is running.
    Try visiting http://localhost:8000/ after starting the server!
    """
    return {
        "message": "Welcome to OM Marketing API!",
        "docs": "/docs",  # FastAPI auto-generates interactive API docs!
        "version": "1.0.0"
    }

# Health check endpoint - useful for monitoring
@app.get("/health")
async def health_check():
    """Check if the API is healthy and responding"""
    return {"status": "healthy", "service": "OM Marketing API"}
