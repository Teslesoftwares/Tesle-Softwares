"""Marketplace routes."""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.connection import get_db
from app.database.models.marketplace import (
    MarketplaceItem, MarketplaceDeveloper, MarketplaceInstall, MarketplaceReview,
)
from app.middleware.auth import get_current_user, AuthPayload
from app.middleware.tenant import get_org_id
from app.schemas.marketplace import MarketplaceReviewCreate, MarketplaceInstallRequest

router = APIRouter(prefix="/api/v1/marketplace", tags=["marketplace"])


@router.get("/items")
async def list_items(
    type: str | None = Query(None),
    category: str | None = Query(None),
    search: str | None = Query(None),
    sort: str = Query("popular"),
    featured: str | None = Query(None),
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    stmt = select(MarketplaceItem)
    if type and type != "all":
        stmt = stmt.where(MarketplaceItem.item_type == type)
    if category and category != "All":
        stmt = stmt.where(MarketplaceItem.category == category)
    if search:
        pattern = f"%{search}%"
        stmt = stmt.where(
            MarketplaceItem.name.ilike(pattern)
            | MarketplaceItem.tagline.ilike(pattern)
            | MarketplaceItem.description.ilike(pattern)
        )
    if featured == "true":
        stmt = stmt.where(MarketplaceItem.featured == True)

    if sort == "rating":
        stmt = stmt.order_by(MarketplaceItem.rating.desc())
    elif sort == "newest":
        stmt = stmt.order_by(MarketplaceItem.created_at.desc())
    elif sort == "name":
        stmt = stmt.order_by(MarketplaceItem.name.asc())
    else:
        stmt = stmt.order_by(MarketplaceItem.install_count.desc())

    result = await db.execute(stmt)
    return {"items": [dict(r._mapping) for r in result.all()]}


@router.get("/items/{id}")
async def get_item(id: str, db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    result = await db.execute(select(MarketplaceItem).where(MarketplaceItem.id == id))
    item = result.scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"item": dict(item._mapping)}


@router.get("/developers")
async def list_developers(db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    result = await db.execute(select(MarketplaceDeveloper).order_by(MarketplaceDeveloper.total_installs.desc()))
    return {"developers": [dict(r._mapping) for r in result.all()]}


@router.get("/developers/{id}")
async def get_developer(id: str, db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    result = await db.execute(select(MarketplaceDeveloper).where(MarketplaceDeveloper.id == id))
    dev = result.scalar_one_or_none()
    if not dev:
        raise HTTPException(status_code=404, detail="Developer not found")
    items = await db.execute(select(MarketplaceItem).where(MarketplaceItem.developer_id == id))
    return {"developer": dict(dev._mapping), "items": [dict(r._mapping) for r in items.all()]}


@router.post("/install")
async def install_item(
    data: MarketplaceInstallRequest,
    user: AuthPayload = Depends(get_current_user),
    org_id: int = Depends(get_org_id),
    db: AsyncSession = Depends(get_db),
):
    existing = await db.execute(
        select(MarketplaceInstall).where(
            MarketplaceInstall.item_id == data.item_id, MarketplaceInstall.org_id == org_id
        )
    )
    install = existing.scalar_one_or_none()
    if install:
        install.status = "active"
        await db.flush()
        await db.refresh(install)
        return {"install": dict(install._mapping)}

    install = MarketplaceInstall(item_id=data.item_id, org_id=org_id, installed_by=user.id)
    db.add(install)
    await db.flush()

    item_result = await db.execute(select(MarketplaceItem).where(MarketplaceItem.id == data.item_id))
    item = item_result.scalar_one_or_none()
    if item:
        item.install_count = (item.install_count or 0) + 1
        await db.flush()

    await db.refresh(install)
    return {"install": dict(install._mapping)}


@router.delete("/install/{item_id}")
async def uninstall_item(
    item_id: str,
    org_id: int = Depends(get_org_id),
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    result = await db.execute(
        select(MarketplaceInstall).where(
            MarketplaceInstall.item_id == item_id, MarketplaceInstall.org_id == org_id
        )
    )
    install = result.scalar_one_or_none()
    if not install:
        raise HTTPException(status_code=404, detail="Install not found")
    install.status = "inactive"
    await db.flush()
    await db.refresh(install)
    return {"install": dict(install._mapping)}


@router.get("/installed")
async def list_installed(
    org_id: int = Depends(get_org_id),
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    result = await db.execute(
        select(MarketplaceInstall, MarketplaceItem.name, MarketplaceItem.tagline,
               MarketplaceItem.icon, MarketplaceItem.color, MarketplaceItem.item_type, MarketplaceItem.provider)
        .join(MarketplaceItem, MarketplaceItem.id == MarketplaceInstall.item_id)
        .where(MarketplaceInstall.org_id == org_id, MarketplaceInstall.status == "active")
        .order_by(MarketplaceInstall.installed_at.desc())
    )
    return {"installed": [dict(r._mapping) for r in result.all()]}


@router.post("/items/{id}/review")
async def review_item(
    id: str, data: MarketplaceReviewCreate,
    user: AuthPayload = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    review = MarketplaceReview(item_id=id, user_id=user.id, rating=data.rating, review=data.review)
    db.add(review)
    await db.flush()

    avg_result = await db.execute(
        select(func.avg(MarketplaceReview.rating), func.count(MarketplaceReview.id))
        .where(MarketplaceReview.item_id == id)
    )
    avg_row = avg_result.first()
    if avg_row:
        item_result = await db.execute(select(MarketplaceItem).where(MarketplaceItem.id == id))
        item = item_result.scalar_one_or_none()
        if item:
            item.rating = avg_row[0]
            item.rating_count = avg_row[1]
            await db.flush()

    await db.refresh(review)
    return {"review": dict(review._mapping)}
