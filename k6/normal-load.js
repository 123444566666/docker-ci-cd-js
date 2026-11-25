import http from "k6/http";
import { check, sleep } from "k6";

const BASE = "http://localhost:3000";

export const options = {
  stages: [
    { duration: "1m", target: 5 },
    { duration: "8m", target: 5 },
    { duration: "1m", target: 0 },
  ],
  thresholds: {
    http_req_failed: ["rate<0.05"],
    http_req_duration: ["p(95)<1000"],
  },
};

export default function () {
  const home = http.get(`${BASE}/`);
  check(home, { "главная 200": (r) => r.status === 200 });
  sleep(Math.random() * 4 + 1);

  if (Math.random() < 0.33) {
    http.get(`${BASE}/api/work`);
    sleep(Math.random() * 2 + 1);
  }

  if (Math.random() < 0.2) {
    http.get(`${BASE}/`);
  }
  sleep(Math.random() * 3 + 1);
}
