import { Router, Request, Response } from 'express';
import { query } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

router.get('/', async (_req: Request, res: Response) => {
  const result = await query('SELECT * FROM leads ORDER BY created_at DESC');
  res.json(result.rows);
});

router.get('/:id', async (req: Request, res: Response) => {
  const result = await query('SELECT * FROM leads WHERE id = $1', [req.params.id]);
  if (!result.rows[0]) { res.status(404).json({ error: 'Not found' }); return; }
  res.json(result.rows[0]);
});

router.put('/:id/status', async (req: Request, res: Response) => {
  const { status } = req.body;
  if (!status) { res.status(400).json({ error: 'Status is required' }); return; }
  const result = await query(
    'UPDATE leads SET status=$1, updated_at=NOW() WHERE id=$2 RETURNING *',
    [status, req.params.id]
  );
  if (!result.rows[0]) { res.status(404).json({ error: 'Not found' }); return; }
  res.json(result.rows[0]);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const result = await query('DELETE FROM leads WHERE id = $1 RETURNING id', [req.params.id]);
  if (!result.rows[0]) { res.status(404).json({ error: 'Not found' }); return; }
  res.json({ deleted: true });
});

export default router;
