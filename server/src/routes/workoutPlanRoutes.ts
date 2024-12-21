import { type Context, Hono } from "hono";
import { getResponseError, getResponseOk } from "../utils/data";
import { userWorkoutService } from "../services";
import { workoutPlanNormalizer } from "../utils/normalizing";
import type { UserWorkoutPlanDB } from "../services/types";

const app = new Hono();

app.post("/createPlan", async (ctx: Context) => {
	const body = await ctx.req.json();

	// save it

	const response = getResponseOk({
		Message: "Plan",
	});

	return ctx.json(response);
});

app.get("/getWorkoutPlans", async (ctx: Context) => {
	const { userID } = ctx.req.query();

	const planRecords = (await userWorkoutService.getUserWorkoutPlans(
		userID,
		true
	)) as UserWorkoutPlanDB[];

	if (planRecords instanceof Error) {
		const errResp = getResponseError(planRecords, {
			workoutPlans: [],
		});

		return ctx.json(errResp);
	}

	const workoutPlans = workoutPlanNormalizer.toClient(planRecords);

	const response = getResponseOk({
		workoutPlans: workoutPlans,
	});

	return ctx.json(response);
});

export default app;
