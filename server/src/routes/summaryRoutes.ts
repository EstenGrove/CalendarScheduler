import { Hono, type Context } from "hono";
import { getResponseError, getResponseOk } from "../utils/data";

const app = new Hono();

app.get("/getDashboardSummary", async (ctx: Context) => {
	const response = getResponseOk({
		message: "",
	});

	return ctx.json(response);
});

export default app;
