"""
AI Service Layer — Tesle AI Platform

Modular AI services for document generation, analytics, and business assistance.
Architecture: Frontend → FastAPI → AI Service → OpenAI / Local Models
"""

from app.services.ai.ai_service import AIService
from app.services.ai.document_agent import DocumentAgent
from app.services.ai.analytics_agent import AnalyticsAgent

__all__ = ["AIService", "DocumentAgent", "AnalyticsAgent"]
