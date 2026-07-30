"""CMS models: services, portfolio, blog_posts, testimonials, careers, leads."""

from sqlalchemy import Boolean, Column, DateTime, Integer, String, Text, func
from sqlalchemy.dialects.postgresql import JSONB

from app.database.connection import Base


class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False)
    description = Column(Text)
    icon = Column(String(100))
    order = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class Portfolio(Base):
    __tablename__ = "portfolio"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False)
    description = Column(Text)
    client = Column(String(255))
    category = Column(String(100))
    images = Column(JSONB, nullable=False, default=[])
    tags = Column(JSONB, nullable=False, default=[])
    completed_date = Column(DateTime)
    url = Column(String(500))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class BlogPost(Base):
    __tablename__ = "blog_posts"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False)
    excerpt = Column(Text)
    content = Column(Text)
    author = Column(String(255))
    image = Column(String(500))
    tags = Column(JSONB, nullable=False, default=[])
    published = Column(Boolean, nullable=False, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class Testimonial(Base):
    __tablename__ = "testimonials"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    role = Column(String(255))
    company = Column(String(255))
    content = Column(Text, nullable=False)
    avatar = Column(String(500))
    rating = Column(Integer, nullable=False, default=5)
    featured = Column(Boolean, nullable=False, default=False)
    order = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class Career(Base):
    __tablename__ = "careers"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False)
    department = Column(String(100))
    type = Column(String(50))
    location = Column(String(255))
    description = Column(Text)
    requirements = Column(JSONB, nullable=False, default=[])
    salary_range = Column(String(100))
    published = Column(Boolean, nullable=False, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    company = Column(String(255))
    phone = Column(String(50))
    interest = Column(String(100))
    message = Column(Text)
    source = Column(String(100))
    status = Column(String(50), nullable=False, default="new")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
