import { metrics } from "@/lib/metrics";

export const dynamic = "force-dynamic";

export async function GET() {
  const stop = metrics.duration.startTimer({ route: "/api/work" });

  await new Promise((r) => setTimeout(r, Math.random() * 800));

  const status = Math.random() < 0.2 ? 500 : 200;

  metrics.requests.inc({ route: "/api/work", status });
  stop();
  return Response.json({ ok: status === 200 }, { status });
}
