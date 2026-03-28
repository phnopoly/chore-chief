import { Hono } from "hono";

const health = new Hono();

health.get("/", (c) =>
  c.json({
    ok: true,
    service: "chore-chief-api",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  }),
);

export default health;
