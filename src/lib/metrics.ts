import client from "prom-client";

type AppMetrics = {
  requests: client.Counter<"route" | "status">;
  duration: client.Histogram<"route">;
};

const g = globalThis as unknown as { appMetrics?: AppMetrics };

if (!g.appMetrics) {
  client.collectDefaultMetrics();
  g.appMetrics = {
    requests: new client.Counter({
      name: "app_http_requests_total",
      help: "Количество запросов",
      labelNames: ["route", "status"],
    }),
    duration: new client.Histogram({
      name: "app_http_request_duration_seconds",
      help: "Время ответа",
      labelNames: ["route"],
      buckets: [0.05, 0.1, 0.25, 0.5, 1, 2],
    }),
  };
}

export const metrics = g.appMetrics!;
export const register = client.register;
