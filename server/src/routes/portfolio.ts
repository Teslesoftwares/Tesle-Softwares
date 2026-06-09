import { Router, Request, Response } from 'express';
import { query } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

router.get('/', async (_req: Request, res: Response) => {
  const result = await query('SELECT * FROM portfolio ORDER BY id DESC');
  res.json(result.rows);
});

router.get('/:id', async (req: Request, res: Response) => {
  const result = await query('SELECT * FROM portfolio WHERE id = $1', [req.params.id]);
  if (!result.rows[0]) { res.status(404).json({ error: 'Not found' }); return; }
  res.json(result.rows[0]);
});

router.post('/', async (req: Request, res: Response) => {
  const { title, slug, description, client, category, images, tags, completed_date, url } = req.body;
  if (!title || !slug) { res.status(400).json({ error: 'Title and slug are required' }); return; }
  const result = await query(
    `INSERT INTO portfolio (title, slug, description, client, category, images, tags, completed_date, url)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
    [title, slug, description, client, category, JSON.stringify(images ?? []), JSON.stringify(tags ?? []), completed_date, url]
  );
  res.status(201).json(result.rows[0]);
});

router.put('/:id', async (req: Request, res: Response) => {
  const { title, slug, description, client, category, images, tags, completed_date, url } = req.body;
  const result = await query(
    `UPDATE portfolio SET title=$1, slug=$2, description=$3, client=$4, category=$5, images=$6, tags=$7, completed_date=$8, url=$9, updated_at=NOW() WHERE id=$10 RETURNING *`,
    [title, slug, description, client, category, JSON.stringify(images ?? []), JSON.stringify(tags ?? []), completed_date, url, req.params.id]
  );
  if (!result.rows[0]) { res.status(404).json({ error: 'Not found' }); return; }
  res.json(result.rows[0]);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const result = await query('DELETE FROM portfolio WHERE id = $1 RETURNING id', [req.params.id]);
  if (!result.rows[0]) { res.status(404).json({ error: 'Not found' }); return; }
  res.json({ deleted: true });
});

export default router;
