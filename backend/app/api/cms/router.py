"""CMS routes — services, portfolio, blog, testimonials, careers, leads.

All routes require JWT auth (authMiddleware in Express).
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, text, delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.connection import get_db
from app.database.models.cms import (
    Service, Portfolio, BlogPost, Testimonial, Career, Lead,
)
from app.middleware.auth import get_current_user
from app.schemas.cms import (
    ServiceCreate, PortfolioCreate, BlogPostCreate,
    TestimonialCreate, CareerCreate, LeadStatusUpdate,
)

router = APIRouter(prefix="/api", tags=["cms"])


# ─── Services ────────────────────────────────────────────────────────────────


@router.get("/services")
async def list_services(db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    result = await db.execute(select(Service).order_by(Service.order, Service.id.desc()))
    return [dict(r._mapping) for r in result.all()]


@router.get("/services/{id}")
async def get_service(id: int, db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    result = await db.execute(select(Service).where(Service.id == id))
    row = result.scalar_one_or_none()
    if not row:
        raise HTTPException(status_code=404, detail="Not found")
    return dict(row._mapping)


@router.post("/services", status_code=201)
async def create_service(data: ServiceCreate, db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    svc = Service(**data.model_dump())
    db.add(svc)
    await db.flush()
    await db.refresh(svc)
    return dict(svc._mapping)


@router.put("/services/{id}")
async def update_service(id: int, data: ServiceCreate, db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    result = await db.execute(select(Service).where(Service.id == id))
    svc = result.scalar_one_or_none()
    if not svc:
        raise HTTPException(status_code=404, detail="Not found")
    for k, v in data.model_dump(exclude_unset=True).items():
        setattr(svc, k, v)
    await db.flush()
    await db.refresh(svc)
    return dict(svc._mapping)


@router.delete("/services/{id}")
async def delete_service(id: int, db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    result = await db.execute(delete(Service).where(Service.id == id).returning(Service.id))
    if not result.first():
        raise HTTPException(status_code=404, detail="Not found")
    return {"deleted": True}


# ─── Portfolio ───────────────────────────────────────────────────────────────


@router.get("/portfolio")
async def list_portfolio(db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    result = await db.execute(select(Portfolio).order_by(Portfolio.id.desc()))
    return [dict(r._mapping) for r in result.all()]


@router.get("/portfolio/{id}")
async def get_portfolio(id: int, db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    result = await db.execute(select(Portfolio).where(Portfolio.id == id))
    row = result.scalar_one_or_none()
    if not row:
        raise HTTPException(status_code=404, detail="Not found")
    return dict(row._mapping)


@router.post("/portfolio", status_code=201)
async def create_portfolio(data: PortfolioCreate, db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    item = Portfolio(**data.model_dump())
    db.add(item)
    await db.flush()
    await db.refresh(item)
    return dict(item._mapping)


@router.put("/portfolio/{id}")
async def update_portfolio(id: int, data: PortfolioCreate, db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    result = await db.execute(select(Portfolio).where(Portfolio.id == id))
    item = result.scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=404, detail="Not found")
    for k, v in data.model_dump(exclude_unset=True).items():
        setattr(item, k, v)
    await db.flush()
    await db.refresh(item)
    return dict(item._mapping)


@router.delete("/portfolio/{id}")
async def delete_portfolio(id: int, db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    result = await db.execute(delete(Portfolio).where(Portfolio.id == id).returning(Portfolio.id))
    if not result.first():
        raise HTTPException(status_code=404, detail="Not found")
    return {"deleted": True}


# ─── Blog ────────────────────────────────────────────────────────────────────


@router.get("/blog")
async def list_blog(published: str | None = None, db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    stmt = select(BlogPost.id, BlogPost.title, BlogPost.slug, BlogPost.excerpt,
                  BlogPost.author, BlogPost.image, BlogPost.tags,
                  BlogPost.published, BlogPost.created_at, BlogPost.updated_at)
    if published is not None:
        stmt = stmt.where(BlogPost.published == (published == "true"))
    stmt = stmt.order_by(BlogPost.created_at.desc())
    result = await db.execute(stmt)
    return [dict(r._mapping) for r in result.all()]


@router.get("/blog/{id}")
async def get_blog(id: int, db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    result = await db.execute(select(BlogPost).where(BlogPost.id == id))
    row = result.scalar_one_or_none()
    if not row:
        raise HTTPException(status_code=404, detail="Not found")
    return dict(row._mapping)


@router.post("/blog", status_code=201)
async def create_blog(data: BlogPostCreate, db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    post = BlogPost(**data.model_dump())
    db.add(post)
    await db.flush()
    await db.refresh(post)
    return dict(post._mapping)


@router.put("/blog/{id}")
async def update_blog(id: int, data: BlogPostCreate, db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    result = await db.execute(select(BlogPost).where(BlogPost.id == id))
    post = result.scalar_one_or_none()
    if not post:
        raise HTTPException(status_code=404, detail="Not found")
    for k, v in data.model_dump(exclude_unset=True).items():
        setattr(post, k, v)
    await db.flush()
    await db.refresh(post)
    return dict(post._mapping)


@router.delete("/blog/{id}")
async def delete_blog(id: int, db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    result = await db.execute(delete(BlogPost).where(BlogPost.id == id).returning(BlogPost.id))
    if not result.first():
        raise HTTPException(status_code=404, detail="Not found")
    return {"deleted": True}


# ─── Testimonials ────────────────────────────────────────────────────────────


@router.get("/testimonials")
async def list_testimonials(db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    result = await db.execute(select(Testimonial).order_by(Testimonial.order, Testimonial.id.desc()))
    return [dict(r._mapping) for r in result.all()]


@router.get("/testimonials/{id}")
async def get_testimonial(id: int, db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    result = await db.execute(select(Testimonial).where(Testimonial.id == id))
    row = result.scalar_one_or_none()
    if not row:
        raise HTTPException(status_code=404, detail="Not found")
    return dict(row._mapping)


@router.post("/testimonials", status_code=201)
async def create_testimonial(data: TestimonialCreate, db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    item = Testimonial(**data.model_dump())
    db.add(item)
    await db.flush()
    await db.refresh(item)
    return dict(item._mapping)


@router.put("/testimonials/{id}")
async def update_testimonial(id: int, data: TestimonialCreate, db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    result = await db.execute(select(Testimonial).where(Testimonial.id == id))
    item = result.scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=404, detail="Not found")
    for k, v in data.model_dump(exclude_unset=True).items():
        setattr(item, k, v)
    await db.flush()
    await db.refresh(item)
    return dict(item._mapping)


@router.delete("/testimonials/{id}")
async def delete_testimonial(id: int, db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    result = await db.execute(delete(Testimonial).where(Testimonial.id == id).returning(Testimonial.id))
    if not result.first():
        raise HTTPException(status_code=404, detail="Not found")
    return {"deleted": True}


# ─── Careers ─────────────────────────────────────────────────────────────────


@router.get("/careers")
async def list_careers(db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    result = await db.execute(select(Career).order_by(Career.id.desc()))
    return [dict(r._mapping) for r in result.all()]


@router.get("/careers/{id}")
async def get_career(id: int, db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    result = await db.execute(select(Career).where(Career.id == id))
    row = result.scalar_one_or_none()
    if not row:
        raise HTTPException(status_code=404, detail="Not found")
    return dict(row._mapping)


@router.post("/careers", status_code=201)
async def create_career(data: CareerCreate, db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    item = Career(**data.model_dump())
    db.add(item)
    await db.flush()
    await db.refresh(item)
    return dict(item._mapping)


@router.put("/careers/{id}")
async def update_career(id: int, data: CareerCreate, db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    result = await db.execute(select(Career).where(Career.id == id))
    item = result.scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=404, detail="Not found")
    for k, v in data.model_dump(exclude_unset=True).items():
        setattr(item, k, v)
    await db.flush()
    await db.refresh(item)
    return dict(item._mapping)


@router.delete("/careers/{id}")
async def delete_career(id: int, db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    result = await db.execute(delete(Career).where(Career.id == id).returning(Career.id))
    if not result.first():
        raise HTTPException(status_code=404, detail="Not found")
    return {"deleted": True}


# ─── Leads ───────────────────────────────────────────────────────────────────


@router.get("/leads")
async def list_leads(db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    result = await db.execute(select(Lead).order_by(Lead.created_at.desc()))
    return [dict(r._mapping) for r in result.all()]


@router.get("/leads/{id}")
async def get_lead(id: int, db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    result = await db.execute(select(Lead).where(Lead.id == id))
    row = result.scalar_one_or_none()
    if not row:
        raise HTTPException(status_code=404, detail="Not found")
    return dict(row._mapping)


@router.put("/leads/{id}/status")
async def update_lead_status(id: int, data: LeadStatusUpdate, db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    result = await db.execute(select(Lead).where(Lead.id == id))
    lead = result.scalar_one_or_none()
    if not lead:
        raise HTTPException(status_code=404, detail="Not found")
    lead.status = data.status
    await db.flush()
    await db.refresh(lead)
    return dict(lead._mapping)


@router.delete("/leads/{id}")
async def delete_lead(id: int, db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    result = await db.execute(delete(Lead).where(Lead.id == id).returning(Lead.id))
    if not result.first():
        raise HTTPException(status_code=404, detail="Not found")
    return {"deleted": True}
