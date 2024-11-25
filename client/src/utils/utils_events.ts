import { formatDate } from "date-fns";
import {
	CalendarEvent,
	CalendarEventSchedule,
	MonthlySummary,
} from "../features/events/types";
import { AsyncResponse, DateRange } from "../features/types";
import { currentEnv, eventApis } from "./utils_env";
import { CreateEventVals, EventFrequency } from "./utils_options";

export type EventsResponse = AsyncResponse<{ events: CalendarEvent[] }>;

export type EventDetailsResponse = AsyncResponse<{
	event: CalendarEvent;
	schedule: CalendarEventSchedule;
	futureEvents: string[];
}>;

const getEventsByRange = async (
	userID: string,
	dateRange: DateRange
): AsyncResponse<{ events: CalendarEvent[] }> => {
	const { startDate = "", endDate = "" } = dateRange;
	let url = currentEnv.base + eventApis.getByRange;
	url += "?" + new URLSearchParams({ userID, startDate, endDate });

	try {
		const request = await fetch(url);
		const response = await request.json();
		console.log("response", response);
		return response;
	} catch (error) {
		return error;
	}
};

const getEventsByDate = async (
	userID: string,
	targetDate: string
): EventsResponse => {
	let url = currentEnv.base + eventApis.getByDate;
	url += "?" + new URLSearchParams({ userID, targetDate });

	try {
		const request = await fetch(url);
		const response = await request.json();

		return response;
	} catch (error) {
		return error;
	}
};

const getEventDetails = async (userID: string, eventID: number) => {
	let url = currentEnv.base + eventApis.getDetails;
	url +=
		"?" +
		new URLSearchParams({
			userID,
			eventID: String(eventID),
		});

	try {
		const request = await fetch(url);
		const response = await request.json();
		return response;
	} catch (error) {
		return error;
	}
};

// Returns a summary map of dates & boolean if they have an event
// { '2024-11-1': true, '2024-11-2': false, ...}
const getMonthlySummary = async (
	userID: string,
	monthRange: DateRange
): AsyncResponse<{
	eventsSummary: MonthlySummary;
}> => {
	const { startDate, endDate } = monthRange;
	let url = currentEnv.base + eventApis.getMonthlySummary;
	url += "?" + new URLSearchParams({ userID });
	url += "&" + new URLSearchParams({ startDate, endDate });

	try {
		const request = await fetch(url);
		const response = await request.json();
		return response;
	} catch (error) {
		return error;
	}
};

const saveNewEvent = async (
	userID: string,
	newEvent: CreateEventVals
): AsyncResponse<{ newEvent: CalendarEvent; eventDates: string[] }> => {
	const url = currentEnv.base + eventApis.createEvent;

	try {
		const request = await fetch(url, {
			method: "POST",
			body: JSON.stringify({
				userID: userID,
				newEvent: newEvent,
			}),
		});
		const response = await request.json();
		return response;
	} catch (error) {
		return error;
	}
};

const isRecurring = (frequency: EventFrequency) => {
	const hasRecurrences: boolean = frequency && frequency !== "Never";

	return hasRecurrences;
};

export {
	saveNewEvent,
	getEventsByRange,
	getEventsByDate,
	getEventDetails,
	getMonthlySummary,
	isRecurring,
};
