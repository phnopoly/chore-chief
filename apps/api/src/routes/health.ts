import { Hono } from "hono";

const health = new Hono();

health.get("/", (c) => {
  return c.json({
    ok: true,
    service: "chore-champ-api",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export default health;
