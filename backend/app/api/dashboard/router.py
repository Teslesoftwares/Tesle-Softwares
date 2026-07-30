"""Dashboard route — aggregated stats for admin panel."""

from fastapi import APIRouter, Depends
from sqlalchemy import select, func, text
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.connection import get_db
from app.database.models.cms import Service, Portfolio, BlogPost, Testimonial, Career, Lead
from app.middleware.auth import get_current_user

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])


@router.get("")
async def get_dashboard(db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    svc_count = (await db.execute(select(func.count(Service.id)))).scalar() or 0
    port_count = (await db.execute(select(func.count(Portfolio.id)))).scalar() or 0
    blog_count = (await db.execute(select(func.count(BlogPost.id)))).scalar() or 0
    test_count = (await db.execute(select(func.count(Testimonial.id)))).scalar() or 0
    career_count = (await db.execute(select(func.count(Career.id)))).scalar() or 0

    leads_result = await db.execute(
        select(Lead.status, func.count(Lead.id).label("count")).group_by(Lead.status)
    )
    leads_by_status = [{"status": r.status, "count": r.count} for r in leads_result.all()]
    total_leads = sum(l["count"] for l in leads_by_status)
    new_leads = next((l["count"] for l in leads_by_status if l["status"] == "new"), 0)

    recent_leads_result = await db.execute(
        select(Lead.id, Lead.name, Lead.email, Lead.company, Lead.interest, Lead.status, Lead.created_at)
        .order_by(Lead.created_at.desc())
        .limit(5)
    )
    recent_leads = [dict(r._mapping) for r in recent_leads_result.all()]

    recent_blog_result = await db.execute(
        select(BlogPost.id, BlogPost.title, BlogPost.slug, BlogPost.published, BlogPost.created_at)
        .order_by(BlogPost.created_at.desc())
        .limit(5)
    )
    recent_blog = [dict(r._mapping) for r in recent_blog_result.all()]

    return {
        "stats": {
            "services": svc_count,
            "portfolio": port_count,
            "blogPosts": blog_count,
            "testimonials": test_count,
            "careers": career_count,
            "totalLeads": total_leads,
            "newLeads": new_leads,
        },
        "leadsByStatus": leads_by_status,
        "recentLeads": recent_leads,
        "recentBlog": recent_blog,
    }
