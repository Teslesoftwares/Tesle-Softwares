import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../db.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

router.post('/register', async (req: Request, res: Response) => {
  const { email, password, name, company, phone } = req.body;
  if (!email || !password || !name) {
    res.status(400).json({ error: 'Email, password, and name are required' });
    return;
  }
  const existing = await query('SELECT id FROM client_users WHERE email = $1', [email]);
  if (existing.rows.length > 0) {
    res.status(409).json({ error: 'Email already registered' });
    return;
  }
  const hash = await bcrypt.hash(password, 12);
  const result = await query(
    'INSERT INTO client_users (email, password_hash, name, company, phone) VALUES ($1,$2,$3,$4,$5) RETURNING id, email, name, company, phone, created_at',
    [email, hash, name, company, phone]
  );
  const user = result.rows[0];
  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: 'client' },
    JWT_SECRET,
    { expiresIn: '30d' } as jwt.SignOptions
  );
  res.status(201).json({ token, user });
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }
  const result = await query('SELECT * FROM client_users WHERE email = $1', [email]);
  const user = result.rows[0];
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }
  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: 'client' },
    JWT_SECRET,
    { expiresIn: '30d' } as jwt.SignOptions
  );
  res.json({
    token,
    user: { id: user.id, email: user.email, name: user.name, company: user.company, phone: user.phone, avatar: user.avatar },
  });
});

router.get('/me', async (req: Request, res: Response) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) { res.status(401).json({ error: 'No token' }); return; }
  try {
    const decoded = jwt.verify(header.split(' ')[1], JWT_SECRET) as { id: number };
    const result = await query('SELECT id, email, name, company, phone, avatar, created_at FROM client_users WHERE id = $1', [decoded.id]);
    if (!result.rows[0]) { res.status(404).json({ error: 'Not found' }); return; }
    res.json(result.rows[0]);
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
