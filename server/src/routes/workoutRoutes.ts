import { type Context, Hono } from "hono";
import { getResponseError, getResponseOk } from "../utils/data";
import type {
	CreateNewWorkoutPayload,
	NewEventPayload,
	RecurringWorkoutEventPayload,
	RecurringWorkoutPayload,
	UserWorkoutEventDB,
} from "../services/types";
import {
	eventsService,
	userWorkoutService,
	workoutsService,
} from "../services";
import { workoutEventNormalizer } from "../utils/normalizing";

const app: Hono = new Hono();

app.get("/getWorkoutsByDate", async (ctx: Context) => {
	const { userID, targetDate } = ctx.req.query();

	const records = (await userWorkoutService.getWorkoutsByDate(
		userID,
		targetDate
	)) as UserWorkoutEventDB[];

	// process workouts for client format
	const workoutEvents = workoutEventNormalizer.toClient(records);

	const response = getResponseOk({
		workoutEvents: workoutEvents,
	});

	return ctx.json(response);
});

// Supports creating a new workout AND A NEW WORKOUT PLAN
app.post("/createNewWorkout", async (ctx: Context) => {
	const body = await ctx.req.json<RecurringWorkoutEventPayload>();
	const { userID, newEvent, newWorkout } = body;

	console.log("newEvent", newEvent);
	console.log("newWorkout", newWorkout);
	console.log("userID", userID);

	const workoutRecord = await workoutsService.createRecurringWorkout(userID, {
		newEvent,
		newWorkout,
	});

	console.log("workoutRecord", workoutRecord);

	if (workoutRecord instanceof Error) {
		const errResp = getResponseError(workoutRecord, {
			message: "Create recurring workout failed!!",
		});

		return ctx.json(errResp);
	}

	const response = getResponseOk({
		message: "",
	});

	return ctx.json(response);
});

// Supports creating a new workout from an EXISTING workout plan
app.post("/createWorkout", async (ctx: Context) => {
	const response = getResponseOk({
		message: "hi",
	});
	return ctx.json(response);
});

export default app;
