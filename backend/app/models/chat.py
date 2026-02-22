"""
Chat model representing conversation sessions.
Each chat is associated with one document for contextual learning.
"""

import uuid
from datetime import datetime
from sqlalchemy import Column, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.models.base import Base


class Chat(Base):
    """
    Chats table - represents conversation sessions.
    
    Each chat is linked to a document and contains multiple messages.
    Enables contextual Q&A about specific learning materials.
    """
    __tablename__ = "chats"

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
        comment="Document this chat is about"
    )
    
    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )
    
    # Relationships
    document = relationship("Document", back_populates="chats")
    messages = relationship(
        "Message",
        back_populates="chat",
        cascade="all, delete-orphan",
        order_by="Message.created_at"
    )

    def __repr__(self):
        return f"<Chat(id={self.id}, document_id={self.document_id}, messages={len(self.messages) if self.messages else 0})>"
