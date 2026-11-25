import { Pool } from "pg";

const g = globalThis as unknown as { pool?: Pool };

export const pool =
  g.pool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 2000,
    query_timeout: 2000,
  });

pool.on("error", () => {});

g.pool = pool;
