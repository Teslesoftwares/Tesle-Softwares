import { Router, Request, Response } from 'express';
import { query } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

router.get('/', async (_req: Request, res: Response) => {
  const result = await query('SELECT * FROM careers ORDER BY id DESC');
  res.json(result.rows);
});

router.get('/:id', async (req: Request, res: Response) => {
  const result = await query('SELECT * FROM careers WHERE id = $1', [req.params.id]);
  if (!result.rows[0]) { res.status(404).json({ error: 'Not found' }); return; }
  res.json(result.rows[0]);
});

router.post('/', async (req: Request, res: Response) => {
  const { title, slug, department, type, location, description, requirements, salary_range, published } = req.body;
  if (!title || !slug) { res.status(400).json({ error: 'Title and slug are required' }); return; }
  const result = await query(
    `INSERT INTO careers (title, slug, department, type, location, description, requirements, salary_range, published)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
    [title, slug, department, type, location, description, JSON.stringify(requirements ?? []), salary_range, published ?? false]
  );
  res.status(201).json(result.rows[0]);
});

router.put('/:id', async (req: Request, res: Response) => {
  const { title, slug, department, type, location, description, requirements, salary_range, published } = req.body;
  const result = await query(
    `UPDATE careers SET title=$1, slug=$2, department=$3, type=$4, location=$5, description=$6, requirements=$7, salary_range=$8, published=$9, updated_at=NOW() WHERE id=$10 RETURNING *`,
    [title, slug, department, type, location, description, JSON.stringify(requirements ?? []), salary_range, published, req.params.id]
  );
  if (!result.rows[0]) { res.status(404).json({ error: 'Not found' }); return; }
  res.json(result.rows[0]);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const result = await query('DELETE FROM careers WHERE id = $1 RETURNING id', [req.params.id]);
  if (!result.rows[0]) { res.status(404).json({ error: 'Not found' }); return; }
  res.json({ deleted: true });
});

export default router;
