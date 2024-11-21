import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
// routes
import { allRoutes } from "./routes";

const port = 3000;
const app = new Hono().basePath("/api/v1");

app.use(logger());

app.get("/ping", (ctx) => {
	return ctx.json({
		Message: "PONG",
	});
});

app.route("/events", allRoutes.events);
app.route("/workouts", allRoutes.workouts);

console.log(`✅ Server is running on port: ${port}`);

serve({
	fetch: app.fetch,
	port,
});
