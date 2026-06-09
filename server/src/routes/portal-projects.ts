import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { query } from '../db.js';

const router = Router();

router.use((req: Request, res: Response, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'No token' });
    return;
  }
  try {
    const decoded = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET || 'default-secret') as { id: number; role: string };
    if (decoded.role !== 'client') {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }
    (req as any).clientId = decoded.id;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
});

router.get('/', async (req: Request, res: Response) => {
  const clientId = (req as any).clientId;
  const result = await query(
    'SELECT * FROM client_projects WHERE client_id = $1 ORDER BY created_at DESC',
    [clientId]
  );
  res.json(result.rows);
});

router.get('/:id', async (req: Request, res: Response) => {
  const clientId = (req as any).clientId;
  const result = await query(
    'SELECT * FROM client_projects WHERE id = $1 AND client_id = $2',
    [req.params.id, clientId]
  );
  if (!result.rows[0]) { res.status(404).json({ error: 'Not found' }); return; }
  const project = result.rows[0];
  const { rows: milestones } = await query(
    'SELECT * FROM project_milestones WHERE project_id = $1 ORDER BY due_date ASC',
    [project.id]
  );
  res.json({ ...project, milestones });
});

export default router;
