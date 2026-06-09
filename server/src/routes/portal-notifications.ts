import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { query } from '../db.js';

const router = Router();

router.use((req: Request, res: Response, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) { res.status(401).json({ error: 'No token' }); return; }
  try {
    const decoded = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET || 'default-secret') as { id: number; role: string };
    (req as any).clientId = decoded.id;
    next();
  } catch { res.status(401).json({ error: 'Invalid token' }); }
});

router.get('/', async (req: Request, res: Response) => {
  const clientId = (req as any).clientId;
  const result = await query(
    'SELECT * FROM notifications WHERE client_id = $1 ORDER BY created_at DESC LIMIT 50',
    [clientId]
  );
  res.json(result.rows);
});

router.put('/:id/read', async (req: Request, res: Response) => {
  const clientId = (req as any).clientId;
  await query('UPDATE notifications SET read = true WHERE id = $1 AND client_id = $2', [req.params.id, clientId]);
  res.json({ ok: true });
});

router.put('/read-all', async (req: Request, res: Response) => {
  const clientId = (req as any).clientId;
  await query('UPDATE notifications SET read = true WHERE client_id = $1', [clientId]);
  res.json({ ok: true });
});

export default router;
