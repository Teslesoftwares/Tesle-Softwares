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
    'SELECT * FROM meetings WHERE client_id = $1 ORDER BY meeting_date DESC',
    [clientId]
  );
  res.json(result.rows);
});

router.post('/', async (req: Request, res: Response) => {
  const clientId = (req as any).clientId;
  const { title, description, meeting_date, duration, meeting_url } = req.body;
  if (!title || !meeting_date) { res.status(400).json({ error: 'Title and meeting date are required' }); return; }
  const result = await query(
    'INSERT INTO meetings (client_id, title, description, meeting_date, duration, meeting_url) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
    [clientId, title, description, meeting_date, duration || 30, meeting_url]
  );
  res.status(201).json(result.rows[0]);
});

export default router;
