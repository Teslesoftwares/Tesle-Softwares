"""CMS schemas."""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class ServiceCreate(BaseModel):
    title: str
    slug: str
    description: Optional[str] = None
    icon: Optional[str] = None
    order: Optional[int] = 0


class PortfolioCreate(BaseModel):
    title: str
    slug: str
    description: Optional[str] = None
    client: Optional[str] = None
    category: Optional[str] = None
    images: Optional[list] = []
    tags: Optional[list] = []
    completed_date: Optional[datetime] = None
    url: Optional[str] = None


class BlogPostCreate(BaseModel):
    title: str
    slug: str
    excerpt: Optional[str] = None
    content: Optional[str] = None
    author: Optional[str] = None
    image: Optional[str] = None
    tags: Optional[list] = []
    published: Optional[bool] = False


class TestimonialCreate(BaseModel):
    name: str
    role: Optional[str] = None
    company: Optional[str] = None
    content: str
    avatar: Optional[str] = None
    rating: Optional[int] = 5
    featured: Optional[bool] = False
    order: Optional[int] = 0


class CareerCreate(BaseModel):
    title: str
    slug: str
    department: Optional[str] = None
    type: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None
    requirements: Optional[list] = []
    salary_range: Optional[str] = None
    published: Optional[bool] = False


class LeadStatusUpdate(BaseModel):
    status: str
