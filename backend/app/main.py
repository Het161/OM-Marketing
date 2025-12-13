




# backend/app/main.py
"""
FastAPI Application Entry Point
This is the main entry point for the OM Marketing API
"""
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from .database import engine, Base
from .routes import products, orders, auth, contact

# Create all database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="OM Marketing API",
    description="E-commerce API for weighing scales, note counters, and mobile accessories",
    version="1.0.0"
)

# CORS Configuration - Allow all origins for Vercel preview deployments
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

# Root endpoint
@app.get("/")
async def root():
    """API welcome endpoint"""
    return {
        "message": "Welcome to OM Marketing API!",
        "status": "active",
        "docs": "/docs",
        "version": "1.0.0",
        "frontend": "https://om-marketing-git-main-het-patels-projects-7277c57e.vercel.app"
    }

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring"""
    return {
        "status": "healthy", 
        "service": "OM Marketing API",
        "version": "1.0.0"
    }
# ONE-TIME SEED ENDPOINT (Remove after use!)
from app.seed_data import seed_database

@app.post("/admin/seed-database")
async def seed_db_endpoint():
    """
    ONE-TIME USE: Seeds the database with initial products.
    Call this endpoint once to populate Render database.
    """
    return seed_database()
