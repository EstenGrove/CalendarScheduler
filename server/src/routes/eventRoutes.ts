import { type Context, Hono } from "hono";
import { eventsService, schedulesService } from "../services";
import type { CreateEventVals } from "../services/types";
import { getResponseOk } from "../utils/data";

const app: Hono = new Hono();

// Get all events in a given date range
app.get("/getEventsByRange", async (ctx: Context) => {
	const queryParams = ctx.req.query();
	const { startDate, endDate } = queryParams;

	const results = await schedulesService.getSchedulesForRange(
		startDate,
		endDate
	);
	// console.log("results", results);

	return ctx.json({
		Message: "Hi",
		StartDate: startDate,
		EndDate: endDate,
		Results: results,
	});
});

// Fetch a summary for a given month; that indicates which dates have scheduled events
app.get("/getEventsSummaryByRange", async (ctx: Context) => {
	//
	//
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
