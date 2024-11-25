import { type Context, Hono } from "hono";
import { getResponseError, getResponseOk } from "../utils/data";

const app: Hono = new Hono();

app.get("/getWorkoutsByDate", async (ctx: Context) => {
	const { targetDate } = ctx.req.query();

	const response = getResponseOk({
		Message: "Workouts",
		Date: targetDate,
	});

	return ctx.json(response);
});

export default app;
