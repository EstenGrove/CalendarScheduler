import { serve } from "@hono/node-server";
import { Hono } from "hono";
// routes
import { allRoutes } from "./routes";
import { logger } from "hono/logger";

const port = 3000;
const app = new Hono().basePath("/api/v1");

app.use(logger());

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.route("/events", allRoutes.events);

console.log(`✅ Server is running on port: ${port}`);

serve({
	fetch: app.fetch,
	port,
});
