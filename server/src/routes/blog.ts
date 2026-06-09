import { Router, Request, Response } from 'express';
import { query } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

router.get('/', async (req: Request, res: Response) => {
  const { published } = req.query;
  let sql = 'SELECT id, title, slug, excerpt, author, image, tags, published, created_at, updated_at FROM blog_posts';
  const params: unknown[] = [];
  if (published !== undefined) {
    sql += ' WHERE published = $1';
    params.push(published === 'true');
  }
  sql += ' ORDER BY created_at DESC';
  const result = await query(sql, params);
  res.json(result.rows);
});

router.get('/:id', async (req: Request, res: Response) => {
  const result = await query('SELECT * FROM blog_posts WHERE id = $1', [req.params.id]);
  if (!result.rows[0]) { res.status(404).json({ error: 'Not found' }); return; }
  res.json(result.rows[0]);
});

router.post('/', async (req: Request, res: Response) => {
  const { title, slug, excerpt, content, author, image, tags, published } = req.body;
  if (!title || !slug) { res.status(400).json({ error: 'Title and slug are required' }); return; }
  const result = await query(
    `INSERT INTO blog_posts (title, slug, excerpt, content, author, image, tags, published)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [title, slug, excerpt, content, author, image, JSON.stringify(tags ?? []), published ?? false]
  );
  res.status(201).json(result.rows[0]);
});

router.put('/:id', async (req: Request, res: Response) => {
  const { title, slug, excerpt, content, author, image, tags, published } = req.body;
  const result = await query(
    `UPDATE blog_posts SET title=$1, slug=$2, excerpt=$3, content=$4, author=$5, image=$6, tags=$7, published=$8, updated_at=NOW() WHERE id=$9 RETURNING *`,
    [title, slug, excerpt, content, author, image, JSON.stringify(tags ?? []), published, req.params.id]
  );
  if (!result.rows[0]) { res.status(404).json({ error: 'Not found' }); return; }
  res.json(result.rows[0]);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const result = await query('DELETE FROM blog_posts WHERE id = $1 RETURNING id', [req.params.id]);
  if (!result.rows[0]) { res.status(404).json({ error: 'Not found' }); return; }
  res.json({ deleted: true });
});

export default router;
