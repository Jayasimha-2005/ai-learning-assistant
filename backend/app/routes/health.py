"""
Health check endpoint.
Provides basic API health status and database connectivity check.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.core.database import get_db

router = APIRouter(tags=["Health"])


@router.get("/health")
async def health_check(db: AsyncSession = Depends(get_db)):
    """
    Health check endpoint.
    
    Returns:
        - API status
        - Database connectivity status
        
    This endpoint is useful for:
        - Load balancer health checks
        - Monitoring systems
        - Deployment verification
    """
    try:
        # Test database connection
        await db.execute(text("SELECT 1"))
        db_status = "connected"
    except Exception as e:
        db_status = f"disconnected: {str(e)}"
    
    return {
        "status": "ok",
        "database": db_status,
        "message": "AI Learning Assistant API is running"
    }
