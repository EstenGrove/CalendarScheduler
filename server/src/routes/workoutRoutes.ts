import { type Context, Hono } from "hono";
import { getResponseError, getResponseOk } from "../utils/data";
import type {
	NewEventPayload,
	RecurringWorkoutPayload,
} from "../services/types";
import { eventsService, workoutsService } from "../services";

const app: Hono = new Hono();

app.get("/getWorkoutsByDate", async (ctx: Context) => {
	const { targetDate } = ctx.req.query();

	const response = getResponseOk({
		Message: "Workouts",
		Date: targetDate,
	});

	return ctx.json(response);
});

app.post("/createRecurringWorkout", async (ctx: Context) => {
	const body = await ctx.req.json<RecurringWorkoutPayload>();
	const { userID, newEvent, newWorkout } = body;
	const { planID } = newWorkout;
	const workoutRecord = await workoutsService.createWorkout(userID, {
		planID: planID,
		name: newWorkout.workoutName,
		desc: newWorkout.workoutDesc,
	});
	const eventRecord = await eventsService
		.createEvent(userID, newEvent)
		.catch((err) => {
			if (err) {
				console.log("❌ [ERROR]: ", err);
			}
		});
	// - Get event_id
	// - Get schedule_id
	// - Get workout_id

	const response = getResponseOk({
		message: "",
	});

	return ctx.json(response);
});

export default app;
