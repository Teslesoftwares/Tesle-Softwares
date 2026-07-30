"""Product models: org_products, organization_products."""

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, Numeric, String, Text, UniqueConstraint, func
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSONB

from app.database.connection import Base


class OrgProduct(Base):
    __tablename__ = "org_products"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False)
    description = Column(Text)
    category = Column(String(100))
    price = Column(Numeric(12, 2), nullable=False, default=0)
    version = Column(String(50), nullable=False, default="1.0.0")
    status = Column(String(50), nullable=False, default="active")
    metadata_ = Column("metadata", JSONB, nullable=False, default={})
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    org_products = relationship("OrganizationProduct", back_populates="product")


class OrganizationProduct(Base):
    __tablename__ = "organization_products"
    __table_args__ = (UniqueConstraint("org_id", "product_id"),)

    id = Column(Integer, primary_key=True, autoincrement=True)
    org_id = Column(Integer, ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    product_id = Column(Integer, ForeignKey("org_products.id", ondelete="CASCADE"), nullable=False)
    enabled = Column(Boolean, nullable=False, default=True)
    settings = Column(JSONB, nullable=False, default={})

    org = relationship("Organization", back_populates="org_products")
    product = relationship("OrgProduct", back_populates="org_products")
