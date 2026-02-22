"""
Chunk model for storing document segments with embeddings.
Each chunk represents a portion of a document with its vector embedding.
"""

import uuid
from datetime import datetime
from sqlalchemy import Column, Text, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from pgvector.sqlalchemy import Vector
from app.models.base import Base


class Chunk(Base):
    """
    Chunks table - stores document segments with vector embeddings.
    
    Used for semantic search and RAG (Retrieval Augmented Generation).
    pgvector extension must be enabled in Supabase.
    """
    __tablename__ = "chunks"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        nullable=False
    )
    
    document_id = Column(
        UUID(as_uuid=True),
        ForeignKey("documents.id", ondelete="CASCADE"),
        nullable=False,
        comment="Reference to parent document"
    )
    
    content = Column(
        Text,
        nullable=False,
        comment="Text content of the chunk"
    )
    
    embedding = Column(
        Vector(1536),
        nullable=True,
        comment="OpenAI embedding vector (1536 dimensions for text-embedding-3-small)"
    )
    
    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )
    
    # Relationships
    document = relationship("Document", back_populates="chunks")

    def __repr__(self):
        content_preview = self.content[:50] + "..." if len(self.content) > 50 else self.content
        return f"<Chunk(id={self.id}, document_id={self.document_id}, content='{content_preview}')>"
