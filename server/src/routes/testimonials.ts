import { Router, Request, Response } from 'express';
import { query } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

router.get('/', async (_req: Request, res: Response) => {
  const result = await query('SELECT * FROM testimonials ORDER BY "order" ASC, id DESC');
  res.json(result.rows);
});

router.get('/:id', async (req: Request, res: Response) => {
  const result = await query('SELECT * FROM testimonials WHERE id = $1', [req.params.id]);
  if (!result.rows[0]) { res.status(404).json({ error: 'Not found' }); return; }
  res.json(result.rows[0]);
});

router.post('/', async (req: Request, res: Response) => {
  const { name, role, company, content, avatar, rating, featured, order } = req.body;
  if (!name || !content) { res.status(400).json({ error: 'Name and content are required' }); return; }
  const result = await query(
    'INSERT INTO testimonials (name, role, company, content, avatar, rating, featured, "order") VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
    [name, role, company, content, avatar, rating ?? 5, featured ?? false, order ?? 0]
  );
  res.status(201).json(result.rows[0]);
});

router.put('/:id', async (req: Request, res: Response) => {
  const { name, role, company, content, avatar, rating, featured, order } = req.body;
  const result = await query(
    'UPDATE testimonials SET name=$1, role=$2, company=$3, content=$4, avatar=$5, rating=$6, featured=$7, "order"=$8, updated_at=NOW() WHERE id=$9 RETURNING *',
    [name, role, company, content, avatar, rating, featured, order, req.params.id]
  );
  if (!result.rows[0]) { res.status(404).json({ error: 'Not found' }); return; }
  res.json(result.rows[0]);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const result = await query('DELETE FROM testimonials WHERE id = $1 RETURNING id', [req.params.id]);
  if (!result.rows[0]) { res.status(404).json({ error: 'Not found' }); return; }
  res.json({ deleted: true });
});

export default router;
