import { Hono } from "hono";
import { serve } from "@hono/node-server";

import health from "./routes/health";

const app = new Hono();

app.route("/health", health);

const port = 3001;

serve({
  fetch: app.fetch,
  port,
});

console.log(`🚀 API running at http://localhost:${port}`);
