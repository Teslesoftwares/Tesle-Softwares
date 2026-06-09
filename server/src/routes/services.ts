import { Router, Request, Response } from 'express';
import { query } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

router.get('/', async (_req: Request, res: Response) => {
  const result = await query('SELECT * FROM services ORDER BY "order" ASC, id DESC');
  res.json(result.rows);
});

router.get('/:id', async (req: Request, res: Response) => {
  const result = await query('SELECT * FROM services WHERE id = $1', [req.params.id]);
  if (!result.rows[0]) { res.status(404).json({ error: 'Not found' }); return; }
  res.json(result.rows[0]);
});

router.post('/', async (req: Request, res: Response) => {
  const { title, slug, description, icon, order } = req.body;
  if (!title || !slug) { res.status(400).json({ error: 'Title and slug are required' }); return; }
  const result = await query(
    'INSERT INTO services (title, slug, description, icon, "order") VALUES ($1,$2,$3,$4,$5) RETURNING *',
    [title, slug, description, icon, order ?? 0]
  );
  res.status(201).json(result.rows[0]);
});

router.put('/:id', async (req: Request, res: Response) => {
  const { title, slug, description, icon, order } = req.body;
  const result = await query(
    'UPDATE services SET title=$1, slug=$2, description=$3, icon=$4, "order"=$5, updated_at=NOW() WHERE id=$6 RETURNING *',
    [title, slug, description, icon, order, req.params.id]
  );
  if (!result.rows[0]) { res.status(404).json({ error: 'Not found' }); return; }
  res.json(result.rows[0]);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const result = await query('DELETE FROM services WHERE id = $1 RETURNING id', [req.params.id]);
  if (!result.rows[0]) { res.status(404).json({ error: 'Not found' }); return; }
  res.json({ deleted: true });
});

export default router;
