import pg from 'pg';
let pool: pg.Pool | null = null;
export function getPool(connectionString?: string): pg.Pool {
  if (!pool) {
    pool = new pg.Pool({
      connectionString: connectionString || process.env.DATABASE_URL,
      max: 20,
      idleTimeoutMillis: 30000,
    });
  }
  return pool;
}
export async function query(text: string, params?: any[]) {
  const p = getPool();
  const start = Date.now();
  const result = await p.query(text, params);
  if (process.env.NODE_ENV === 'development') {
    const duration = Date.now() - start;
    console.log('Query:', { text: text.substring(0, 80), duration: `${duration}ms`, rows: result.rowCount });
  }
  return result;
}
export { pool };
