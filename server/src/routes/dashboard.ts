import { Router, Request, Response } from 'express';
import { query } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.use(authMiddleware);

router.get('/', async (_req: Request, res: Response) => {
  const [
    { rows: services },
    { rows: portfolio },
    { rows: blogPosts },
    { rows: testimonials },
    { rows: careers },
    { rows: leads },
  ] = await Promise.all([
    query('SELECT COUNT(*)::int AS count FROM services'),
    query('SELECT COUNT(*)::int AS count FROM portfolio'),
    query('SELECT COUNT(*)::int AS count FROM blog_posts'),
    query('SELECT COUNT(*)::int AS count FROM testimonials'),
    query('SELECT COUNT(*)::int AS count FROM careers'),
    query("SELECT status, COUNT(*)::int AS count FROM leads GROUP BY status"),
  ]);

  const totalLeads = leads.reduce((sum, l) => sum + l.count, 0);
  const newLeads = leads.find((l) => l.status === 'new')?.count ?? 0;

  const { rows: recentLeads } = await query(
    'SELECT id, name, email, company, interest, status, created_at FROM leads ORDER BY created_at DESC LIMIT 5'
  );

  const { rows: recentBlog } = await query(
    'SELECT id, title, slug, published, created_at FROM blog_posts ORDER BY created_at DESC LIMIT 5'
  );

  res.json({
    stats: {
      services: services[0].count,
      portfolio: portfolio[0].count,
      blogPosts: blogPosts[0].count,
      testimonials: testimonials[0].count,
      careers: careers[0].count,
      totalLeads,
      newLeads,
    },
    leadsByStatus: leads,
    recentLeads,
    recentBlog,
  });
});

export default router;
