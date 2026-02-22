"""
FastAPI application entry point.
Configures CORS, includes routers, and sets up the application.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routes import health

# Initialize FastAPI application
app = FastAPI(
    title="AI Learning Assistant API",
    description="Backend API for AI-powered learning platform with PDF/YouTube processing, flashcards, quizzes, and chat",
    version="1.0.0",
    docs_url="/docs",  # Swagger UI
    redoc_url="/redoc",  # ReDoc
)

# Configure CORS middleware
# Allows frontend (Next.js) to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)


# Include routers
# Add more routers here as you build features
app.include_router(health.router, prefix="/api")


@app.get("/")
async def root():
    """
    Root endpoint.
    Provides basic API information.
    """
    return {
        "message": "AI Learning Assistant API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/api/health"
    }


# Lifecycle events
@app.on_event("startup")
async def startup_event():
    """
    Runs when the application starts.
    Can be used for:
        - Initializing database connections
        - Loading ML models
        - Setting up cache
    """
    print("🚀 Starting AI Learning Assistant API...")
    print(f"📊 Environment: {settings.ENVIRONMENT}")
    print(f"🔧 Debug mode: {settings.DEBUG}")


@app.on_event("shutdown")
async def shutdown_event():
    """
    Runs when the application shuts down.
    Clean up resources here.
    """
    print("👋 Shutting down AI Learning Assistant API...")
