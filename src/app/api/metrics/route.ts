import { NextResponse } from "next/server";
import client from "prom-client";

// Включаем сбор стандартных метрик Node.js (CPU, память и т.д.)
client.collectDefaultMetrics();

// Пример кастомной метрики (счетчик запросов)
const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "status"],
});

export async function GET(request: Request) {
  // Пример логики: при каждом запросе к эндпоинту увеличиваем счетчик
  // (в реальном приложении это делается через middleware или обертку)
  httpRequestsTotal.inc({ method: "GET", status: "200" });

  const metrics = await client.register.metrics();

  return new NextResponse(metrics, {
    headers: {
      "Content-Type": client.register.contentType,
    },
  });
}
