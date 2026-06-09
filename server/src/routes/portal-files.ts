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
    'SELECT * FROM file_shares WHERE client_id = $1 ORDER BY created_at DESC',
    [clientId]
  );
  res.json(result.rows);
});

router.post('/', async (req: Request, res: Response) => {
  const clientId = (req as any).clientId;
  const { file_name, file_size, file_type, file_url, project_id } = req.body;
  if (!file_name || !file_url) { res.status(400).json({ error: 'file_name and file_url are required' }); return; }
  const result = await query(
    'INSERT INTO file_shares (client_id, project_id, file_name, file_size, file_type, file_url, uploaded_by) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
    [clientId, project_id || null, file_name, file_size || 0, file_type || '', file_url, 'client']
  );
  res.status(201).json(result.rows[0]);
});

export default router;
