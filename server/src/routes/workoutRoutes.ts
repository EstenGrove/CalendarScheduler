import { type Context, Hono } from "hono";
import { getResponseError, getResponseOk } from "../utils/data";
import type {
	CancelledWorkoutDB,
	QuickWorkoutPayload,
	RecurringWorkoutEventPayload,
	UserWorkoutDB,
	UserWorkoutEventDB,
	WorkoutCustomClient,
	WorkoutCustomDB,
	WorkoutHistoryRecordDB,
} from "../services/types";
import { userWorkoutService, workoutsService } from "../services";
import {
	convertHistoryRecord,
	convertUserWorkoutCustom,
	convertUserWorkouts,
	convertWorkoutHistory,
	userWorkoutNormalizer,
	workoutCustomNormalizer,
	workoutEventNormalizer,
	workoutNormalizer,
} from "../utils/normalizing";

const app: Hono = new Hono();

app.get("/getWorkoutsByDate", async (ctx: Context) => {
	const { userID, targetDate, startDate } = ctx.req.query();

	const records = (await userWorkoutService.getUserWorkoutsCustom(
		userID,
		targetDate || startDate
	)) as WorkoutCustomDB[];

	console.log("records", records);

	const workouts = workoutCustomNormalizer.toClient(records);

	// process workouts for client format

	const response = getResponseOk({
		workouts: workouts,
	});

	return ctx.json(response);
});
app.get("/getWorkoutEventsByDate", async (ctx: Context) => {
	const { userID, targetDate } = ctx.req.query();

	const records = (await userWorkoutService.getWorkoutEventsByDate(
		userID,
		targetDate
	)) as UserWorkoutEventDB[];

	console.log("records", records);

	// process workouts for client format
	const workoutEvents = workoutEventNormalizer.toClient(records);

	const response = getResponseOk({
		workoutEvents: workoutEvents,
	});

	return ctx.json(response);
});

app.post("/createQuickWorkout", async (ctx: Context) => {
	const body = await ctx.req.json<QuickWorkoutPayload>();
	const { userID, workout } = body;

	const response = getResponseOk({
		message: "",
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
app.get("/getWorkouts", async (ctx: Context) => {
	const { userID, startDate, endDate } = ctx.req.query();

	const records = (await userWorkoutService.getUserWorkouts(
		userID,
		true
	)) as UserWorkoutDB[];

	if (records instanceof Error) {
		const errResp = getResponseError(records, {
			workouts: [],
		});

		return ctx.json(errResp);
	}

	const workouts = workoutNormalizer.toClient(records);

	const response = getResponseOk({
		workouts: workouts,
	});

	return ctx.json(response);
});
app.get("/cancelWorkout", async (ctx: Context) => {
	const { userID, workoutID, workoutDate } = ctx.req.query();

	const cancelRecord = (await userWorkoutService.cancelWorkout(userID, {
		workoutID: Number(workoutID),
		workoutDate: workoutDate,
	})) as CancelledWorkoutDB;

	const response = getResponseOk({
		cancelledWorkout: cancelRecord,
	});

	return ctx.json(response);
});
app.post("/markWorkoutAsDone", async (ctx: Context) => {
	const { userID } = ctx.req.query();
	const body = await ctx.req.json();

	const { startTime, endTime, workoutDate } = body;
	const workoutID: number = Number(body.workoutID);
	const isDone: boolean = Boolean(body.isCompleted);

	const historyEntry = (await userWorkoutService.markWorkoutAsDone(userID, {
		workoutID,
		workoutDate: workoutDate,
		startTime: startTime,
		endTime: endTime,
		isCompleted: isDone,
	})) as WorkoutHistoryRecordDB;

	const history = convertHistoryRecord(historyEntry);

	const relatedWorkout = (await userWorkoutService.getUserWorkoutByID(
		userID,
		workoutID,
		workoutDate
	)) as WorkoutCustomDB;
	const workoutRecord: WorkoutCustomClient = convertUserWorkoutCustom({
		...relatedWorkout,
		workout_status: isDone ? "COMPLETE" : "NOT-COMPLETE",
	});

	// Apply 'done/not-done' status for client-formatted workout
	// Grab workout record with workoutStatus

	console.log("relatedWorkout", relatedWorkout);
	console.log("workoutRecord", workoutRecord);

	const response = getResponseOk({
		message: "Success",
		historyEntry: history,
		updatedWorkout: workoutRecord,
	});

	return ctx.json(response);
});

export default app;
