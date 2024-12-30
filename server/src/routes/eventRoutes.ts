import { type Context, Hono } from "hono";
import {
	eventsService,
	schedulesService,
	userWorkoutService,
} from "../services";
import type {
	CalendarEventDB,
	CreateEventVals,
	EventInstanceDB,
	MonthlyEventSummaryDB,
	NewEventPayload,
	UserWorkoutPlanDB,
} from "../services/types";
import { getResponseError, getResponseOk } from "../utils/data";
import {
	convertUserWorkouts,
	eventInstancesNormalizer,
	eventsNormalizer,
	schedulesNormalizer,
	summaryNormalizer,
	workoutPlanNormalizer,
} from "../utils/normalizing";
import { groupByFn } from "../utils/processing";
import { createMonthlySummaryMap } from "../utils/events";
import { createEvent } from "../services/EventsService";

const app: Hono = new Hono();

// Get all 'calendar_event' records for a given date
app.get("/getEventsByDate", async (ctx: Context) => {
	const { userID, targetDate } = ctx.req.query();
	const rawEvents = (await eventsService.getEventsByDate(
		userID,
		targetDate
	)) as EventInstanceDB[];

	if (rawEvents instanceof Error) {
		const errResponse = getResponseError(rawEvents, {
			message: "Failed to find events",
		});
		return ctx.json(errResponse);
	}

	const eventsList = eventInstancesNormalizer.toClient(rawEvents);
	const response = getResponseOk({
		targetDate: targetDate,
		events: eventsList,
	});

	ctx.header("Content-Type", "application/json");

	return ctx.json(response);
});

// Get all events in a given date range
app.get("/getEventsByRange", async (ctx: Context) => {
	const queryParams = ctx.req.query();
	const { startDate, endDate } = queryParams;

	const results = await schedulesService.getSchedulesForRange(
		startDate,
		endDate
	);

	return ctx.json({
		Message: "Hi",
		StartDate: startDate,
		EndDate: endDate,
		Results: results,
	});
});

app.get("/getEventDetails", async (ctx: Context) => {
	const { userID, eventID: rawID, eventDate } = ctx.req.query();

	const eventID: number = Number(rawID);
	const eventRecord = await eventsService.getEventByID(userID, eventID);
	const scheduleRecord = await schedulesService.getScheduleByEventID(
		userID,
		eventID
	);
	const eventWorkouts =
		(await userWorkoutService.getUserWorkoutDetailsByEventID(
			userID,
			eventID
		)) as UserWorkoutPlanDB[];

	const event = eventInstancesNormalizer.toClientOne(eventRecord);
	const schedule = schedulesNormalizer.toClientOne(scheduleRecord);
	// const plans = workoutPlanNormalizer.toClient(eventWorkouts);
	const plans = convertUserWorkouts(eventWorkouts);

	const response = getResponseOk({
		event: { ...event },
		schedule: schedule,
		workouts: plans,
		futureEvents: [],
		details: null,
	});

	return ctx.json(response);
});

// Fetch a summary for a given month; that indicates which dates have scheduled events
app.get("/getMonthlySummary", async (ctx: Context) => {
	const queryParams = ctx.req.query();
	const { userID, startDate, endDate } = queryParams;

	const summaryDB = (await eventsService.getMonthlySummary(
		userID,
		startDate,
		endDate
	)) as MonthlyEventSummaryDB[];

	if (summaryDB instanceof Error || !summaryDB) {
		const errResponse = getResponseError(summaryDB, {
			Message:
				"Failed to find summary data for given range: " +
				startDate +
				" - " +
				endDate,
		});
		return ctx.json(errResponse);
	}

	const eventsSummary = createMonthlySummaryMap(summaryDB);
	console.log("eventsSummary", eventsSummary);

	const response = getResponseOk({
		eventsSummary: eventsSummary,
	});
	return ctx.json(response);
});

app.post("/createEvent", async (ctx: Context) => {
	const body = await ctx.req.json<NewEventPayload>();
	const { userID, newEvent } = body;

	const eventRecord = await createEvent(userID, newEvent).catch((err) => {
		if (err) {
			console.log("❌ [ERROR]: ", err);
		}
	});

	// const eventRecord = await eventsService
	// 	.createEvent(userID, newEvent)
	// 	.catch((err) => {
	// 		if (err) {
	// 			console.log("❌ [ERROR]: ", err);
	// 		}
	// 	});

	const response = getResponseOk({
		UserID: body.userID,
		Message: "Success: Event was created.",
		eventDates: [],
		newEvent: eventRecord,
	});
	return ctx.json(response);
});

app.post("/deleteEvent", async (ctx: Context) => {
	// check if user wants to delete ALL events, just this instance and any associated workouts
	const body = await ctx.req.json();
	const { userID, eventID, deleteSeries = false, dateToDelete } = body;

	if (deleteSeries) {
		const wasDeleted = await eventsService.deleteEventSeries(userID, {
			eventID: eventID,
			dateToDelete: dateToDelete, // not used for series deletion
		});
		console.log("wasDeleted(SERIES):", wasDeleted);
		const response = getResponseOk({
			message: `[DELETED-SERIES]: ${eventID} all recurrences and events were deleted.`,
			eventID: eventID,
			userID: userID,
		});

		return ctx.json(response);
	} else {
		const wasDeleted = await eventID.deleteEvent(userID, {
			eventID: eventID,
			dateToDelete: dateToDelete, // not used for series deletion
		});
		console.log("wasDeleted(EVENT-ONLY):", wasDeleted);

		const response = getResponseOk({
			message: `[DELETED]: ${eventID} for date: ${dateToDelete}`,
			eventID: eventID,
			userID: userID,
		});

		return ctx.json(response);
	}

	// const response = getResponseOk({
	// 	message: 'Event was deleted',
	// 	eventID: eventID,
	// 	userID: userID
	// });

	// return ctx.json(response);
});

export default app;
