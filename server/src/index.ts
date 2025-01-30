import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
// routes
import { allRoutes } from "./routes";
import { cors } from "hono/cors";

const port = 3000;
const app = new Hono().basePath("/api/v1");

app.use(logger());
app.use(cors());

app.get("/ping", (ctx) => {
	return ctx.json({
		Message: "PONG",
	});
});

app.route("/events", allRoutes.events);
app.route("/history", allRoutes.history);
app.route("/workouts", allRoutes.workouts);
app.route("/summary", allRoutes.summary);
app.route("/plans", allRoutes.plans);
app.route("/metrics", allRoutes.metrics);

console.log(`✅ Server is running on port: ${port}`);

serve({
	fetch: app.fetch,
	port,
	hostname: "192.168.0.48",
});
