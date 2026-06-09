import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { query } from '../db.js';

const router = Router();

router.use((req: Request, res: Response, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) { res.status(401).json({ error: 'No token' }); return; }
  try {
    const decoded = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET || 'default-secret') as { id: number; role: string };
    if (decoded.role !== 'client') { res.status(403).json({ error: 'Forbidden' }); return; }
    (req as any).clientId = decoded.id;
    next();
  } catch { res.status(401).json({ error: 'Invalid token' }); }
});

router.get('/', async (req: Request, res: Response) => {
  const clientId = (req as any).clientId;
  const result = await query(
    'SELECT * FROM support_tickets WHERE client_id = $1 ORDER BY created_at DESC',
    [clientId]
  );
  res.json(result.rows);
});

router.get('/:id', async (req: Request, res: Response) => {
  const clientId = (req as any).clientId;
  const result = await query(
    'SELECT * FROM support_tickets WHERE id = $1 AND client_id = $2',
    [req.params.id, clientId]
  );
  if (!result.rows[0]) { res.status(404).json({ error: 'Not found' }); return; }
  const ticket = result.rows[0];
  const { rows: comments } = await query(
    'SELECT tc.*, cu.name as client_name, u.name as admin_name FROM ticket_comments tc LEFT JOIN client_users cu ON tc.client_id = cu.id LEFT JOIN users u ON tc.admin_id = u.id WHERE tc.ticket_id = $1 ORDER BY tc.created_at ASC',
    [ticket.id]
  );
  res.json({ ...ticket, comments });
});

router.post('/', async (req: Request, res: Response) => {
  const clientId = (req as any).clientId;
  const { subject, description, priority, project_id } = req.body;
  if (!subject) { res.status(400).json({ error: 'Subject is required' }); return; }
  const result = await query(
    'INSERT INTO support_tickets (client_id, project_id, subject, description, priority) VALUES ($1,$2,$3,$4,$5) RETURNING *',
    [clientId, project_id || null, subject, description, priority || 'medium']
  );
  res.status(201).json(result.rows[0]);
});

router.post('/:id/comments', async (req: Request, res: Response) => {
  const clientId = (req as any).clientId;
  const { message } = req.body;
  if (!message) { res.status(400).json({ error: 'Message is required' }); return; }
  const ticket = await query('SELECT id FROM support_tickets WHERE id = $1 AND client_id = $2', [req.params.id, clientId]);
  if (!ticket.rows[0]) { res.status(404).json({ error: 'Ticket not found' }); return; }
  const result = await query(
    'INSERT INTO ticket_comments (ticket_id, client_id, message, is_admin) VALUES ($1,$2,$3,$4) RETURNING *',
    [req.params.id, clientId, message, false]
  );
  res.status(201).json(result.rows[0]);
});

export default router;
