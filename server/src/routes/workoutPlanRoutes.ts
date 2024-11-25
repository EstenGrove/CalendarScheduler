import { type Context, Hono } from "hono";
import { getResponseOk } from "../utils/data";

const app = new Hono();

app.post("/createPlan", async (ctx: Context) => {
	const body = await ctx.req.json();

	// save it

	const response = getResponseOk({
		Message: "Plan",
	});

	return ctx.json(response);
});

export default app;
