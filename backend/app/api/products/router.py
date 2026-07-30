"""Product routes."""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.connection import get_db
from app.database.models.products import OrgProduct, OrganizationProduct
from app.middleware.auth import get_current_user
from app.schemas.organizations import ProductCreate, ProductUpdate, OrgProductUpdate

router = APIRouter(prefix="/api/v1/products", tags=["products"])


@router.get("")
async def list_products(
    category: str | None = Query(None),
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    stmt = select(OrgProduct).where(OrgProduct.status == "active")
    if category:
        stmt = stmt.where(OrgProduct.category == category)
    stmt = stmt.order_by(OrgProduct.name)
    result = await db.execute(stmt)
    return {"success": True, "data": [dict(r._mapping) for r in result.all()]}


@router.get("/org/{org_id}")
async def list_org_products(
    org_id: int,
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    result = await db.execute(
        select(OrgProduct, OrganizationProduct.enabled, OrganizationProduct.settings.label("org_settings"))
        .outerjoin(
            OrganizationProduct,
            (OrganizationProduct.product_id == OrgProduct.id) & (OrganizationProduct.org_id == org_id),
        )
        .order_by(OrgProduct.name)
    )
    data = []
    for row in result.all():
        d = dict(row[0]._mapping)
        d["enabled"] = row.enabled or False
        d["org_settings"] = row.org_settings
        data.append(d)
    return {"success": True, "data": data}


@router.get("/{id}")
async def get_product(id: int, db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    result = await db.execute(select(OrgProduct).where(OrgProduct.id == id))
    row = result.scalar_one_or_none()
    if not row:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"success": True, "data": dict(row._mapping)}


@router.post("", status_code=201)
async def create_product(data: ProductCreate, db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    slug = data.slug or data.name.lower().replace(" ", "-")
    prod = OrgProduct(name=data.name, slug=slug, description=data.description,
                      category=data.category, price=data.price, version=data.version)
    db.add(prod)
    await db.flush()
    await db.refresh(prod)
    return {"success": True, "data": dict(prod._mapping)}


@router.put("/{id}")
async def update_product(id: int, data: ProductUpdate, db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    result = await db.execute(select(OrgProduct).where(OrgProduct.id == id))
    prod = result.scalar_one_or_none()
    if not prod:
        raise HTTPException(status_code=404, detail="Product not found")
    for k, v in data.model_dump(exclude_unset=True).items():
        setattr(prod, k, v)
    await db.flush()
    await db.refresh(prod)
    return {"success": True, "data": dict(prod._mapping)}


@router.delete("/{id}")
async def delete_product(id: int, db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    await db.execute(delete(OrgProduct).where(OrgProduct.id == id))
    return {"success": True, "data": {"message": "Product deleted"}}


@router.put("/org/{org_id}/{product_id}")
async def update_org_product(
    org_id: int, product_id: int,
    data: OrgProductUpdate,
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    result = await db.execute(
        select(OrganizationProduct).where(
            OrganizationProduct.org_id == org_id, OrganizationProduct.product_id == product_id
        )
    )
    op = result.scalar_one_or_none()
    if op:
        if data.enabled is not None:
            op.enabled = data.enabled
        if data.settings is not None:
            op.settings = data.settings
    else:
        op = OrganizationProduct(org_id=org_id, product_id=product_id, enabled=data.enabled or True, settings=data.settings or {})
        db.add(op)
    await db.flush()
    await db.refresh(op)
    return {"success": True, "data": dict(op._mapping)}
