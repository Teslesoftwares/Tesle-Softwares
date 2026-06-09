import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { query } from './db.js';
import { runMigrations } from './schema.js';

async function seed() {
  await runMigrations();

  const email = process.env.SEED_EMAIL || 'admin@tesle.ai';
  const password = process.env.SEED_PASSWORD || 'admin123';
  const name = process.env.SEED_NAME || 'Admin';

  const existing = await query('SELECT id FROM users WHERE email = $1', [email]);
  if (existing.rows.length > 0) {
    console.log(`User ${email} already exists.`);
    process.exit(0);
  }

  const hash = await bcrypt.hash(password, 12);
  await query(
    'INSERT INTO users (email, password_hash, name, role) VALUES ($1, $2, $3, $4)',
    [email, hash, name, 'admin']
  );

  console.log(`✓ Admin user created: ${email} / ${password}`);
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
