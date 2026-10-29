import { register } from "@/lib/metrics";

export const dynamic = "force-dynamic";

export async function GET() {
  return new Response(await register.metrics(), {
    headers: { "Content-Type": register.contentType },
  });
}
