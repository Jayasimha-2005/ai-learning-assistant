"""
Document model representing uploaded PDFs or YouTube videos.
Stores metadata about learning content sources.
"""

import uuid
from datetime import datetime
from sqlalchemy import Column, String, Text, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.models.base import Base


class Document(Base):
    """
    Documents table - stores uploaded learning materials.
    
    Relationships:
        - One document can have many chunks (for embeddings)
        - One document can have many chats (conversation sessions)
    """
    __tablename__ = "documents"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        nullable=False
    )
    
    title = Column(
        Text,
        nullable=False,
        comment="Document title or filename"
    )
    
    source_type = Column(
        Text,
        nullable=False,
        comment="Type of source: 'pdf' or 'youtube'"
    )
    
    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )
    
    # Relationships (will reference chunks and chats)
    chunks = relationship(
        "Chunk",
        back_populates="document",
        cascade="all, delete-orphan"
    )
    
    chats = relationship(
        "Chat",
        back_populates="document",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Document(id={self.id}, title='{self.title}', source_type='{self.source_type}')>"
