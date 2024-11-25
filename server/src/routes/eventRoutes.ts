import { type Context, Hono } from "hono";
import { eventsService, schedulesService } from "../services";
import type {
	CalendarEventDB,
	CreateEventVals,
	EventInstanceDB,
	MonthlyEventSummaryDB,
} from "../services/types";
import { getResponseError, getResponseOk } from "../utils/data";
import {
	eventInstancesNormalizer,
	eventsNormalizer,
	schedulesNormalizer,
	summaryNormalizer,
} from "../utils/normalizing";
import { groupByFn } from "../utils/processing";
import { createMonthlySummaryMap } from "../utils/events";

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
	// const details =

	const event = eventInstancesNormalizer.toClientOne(eventRecord);
	const schedule = schedulesNormalizer.toClientOne(scheduleRecord);

	const response = getResponseOk({
		event: { ...event },
		schedule: schedule,
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

interface NewEventPayload {
	userID: string;
	newEvent: CreateEventVals;
}

app.post("/createEvent", async (ctx: Context) => {
	const body = await ctx.req.json<NewEventPayload>();
	console.log("Body:", body);
	const { userID, newEvent } = body;
	const cleanEvent = { ...newEvent, startTime: "12:00 PM", endTime: "1:00 PM" };

	const eventRecord = await eventsService
		.createEvent(userID, cleanEvent)
		.catch((err) => {
			if (err) {
				console.log("❌ [ERROR]: ", err);
			}
		});
	console.log("eventRecord", eventRecord);
	// const schedule = await eventsService.createEventSchedule(3, cleanEvent);
	// console.log("schedule", schedule);

	const response = getResponseOk({
		UserID: body.userID,
		Message: "Success",
		eventDates: [],
		// newEvent: schedule || body.newEvent,
		newEvent: eventRecord || body.newEvent,
	});
	return ctx.json(response);
});

export default app;
