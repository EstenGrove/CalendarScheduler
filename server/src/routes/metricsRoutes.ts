import { type Context, Hono } from "hono";
import { getResponseError, getResponseOk } from "../utils/data";
import type { ActivityType } from "../services/types";
import { calculateBurnedCalories } from "../utils/metrics";

const app = new Hono();

interface GetCaloriesBody {
	type: ActivityType;
	mins: number;
	gender: "Men" | "Women";
	bodyWeight: number; // pounds
}

app.get("/calculateCalories", async (ctx: Context) => {
	const body = ctx.req.query() as unknown as GetCaloriesBody;
	const { type, gender, mins: minsStr, bodyWeight: weightLbs } = body;
	const weightInKg = Number(weightLbs);
	const minutes = Number(minsStr);

	const caloriesBurned = calculateBurnedCalories({
		type,
		gender,
		mins: minutes,
		bodyWeight: weightInKg,
	});

	const response = getResponseOk({
		caloriesBurned: caloriesBurned,
	});

	return ctx.json(response);
});

export default app;
