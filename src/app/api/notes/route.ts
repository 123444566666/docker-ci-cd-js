import { pool } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { text } = await req.json();
  await pool.query(
    "CREATE TABLE IF NOT EXISTS notes (id serial PRIMARY KEY, text text, created timestamptz DEFAULT now())",
  );
  await pool.query("INSERT INTO notes (text) VALUES ($1)", [
    String(text).slice(0, 200),
  ]);
  return Response.json({ ok: true });
}

export async function GET() {
  const r = await pool.query(
    "SELECT id, text FROM notes ORDER BY id DESC LIMIT 10",
  );
  return Response.json(r.rows);
}
