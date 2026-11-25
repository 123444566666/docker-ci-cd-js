import http from "k6/http";
import { check, sleep } from "k6";

const BASE = "http://localhost:3000";

export const options = {
  stages: [
    { duration: "30s", target: 10 },
    { duration: "4m", target: 10 },
    { duration: "30s", target: 0 },
  ],
};

export default function () {
  check(http.get(`${BASE}/api/ready`), {
    "ready 200": (r) => r.status === 200,
  });
  http.post(`${BASE}/api/notes`, JSON.stringify({ text: "hello" }), {
    headers: { "Content-Type": "application/json" },
  });
  http.get(`${BASE}/api/notes`);
  const w = http.get(`${BASE}/api/work`); // источник управляемых ошибок для алерта
  check(w, { "work 200": (r) => r.status === 200 });
  sleep(0.2);
}
