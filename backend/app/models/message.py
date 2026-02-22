"""
Message model for chat conversations.
Stores individual messages within a chat session.
"""

import uuid
from datetime import datetime
from sqlalchemy import Column, Text, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.models.base import Base


class Message(Base):
    """
    Messages table - individual messages in a chat.
    
    Role can be:
        - 'user': Message from the student
        - 'assistant': Response from AI
        - 'system': System prompts or instructions
    """
    __tablename__ = "messages"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        nullable=False
    )
    
    chat_id = Column(
        UUID(as_uuid=True),
        ForeignKey("chats.id", ondelete="CASCADE"),
        nullable=False,
        comment="Reference to parent chat"
    )
    
    role = Column(
        Text,
        nullable=False,
        comment="Message role: 'user', 'assistant', or 'system'"
    )
    
    content = Column(
        Text,
        nullable=False,
        comment="Message content"
    )
    
    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )
    
    # Relationships
    chat = relationship("Chat", back_populates="messages")

    def __repr__(self):
        content_preview = self.content[:50] + "..." if len(self.content) > 50 else self.content
        return f"<Message(id={self.id}, role='{self.role}', content='{content_preview}')>"
