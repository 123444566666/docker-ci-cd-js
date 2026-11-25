import { z } from "zod";
import { logger } from "@/lib/logger";

export const dynamic = "force-dynamic";

const AlertSchema = z.object({
  status: z.string(),
  labels: z.record(z.string(), z.string()),
  annotations: z.record(z.string(), z.string()).optional(),
});

const PayloadSchema = z.object({
  status: z.string(),
  alerts: z.array(AlertSchema),
});

export async function POST(req: Request) {
  const parsed = PayloadSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    logger.warn({ event: "alert_invalid" }, "bad webhook payload");
    return Response.json({ ok: false }, { status: 400 });
  }
  for (const a of parsed.data.alerts) {
    logger.info(
      {
        event: "alert_received",
        alertname: a.labels.alertname,
        status: a.status,
        summary: a.annotations?.summary,
      },
      "alert_received",
    );
  }
  return Response.json({ ok: true });
}
