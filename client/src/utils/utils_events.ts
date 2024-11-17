import { CalendarEvent, MonthlySummary } from "../features/events/types";
import { AsyncResponse, DateRange } from "../features/types";
import { currentEnv, eventApis } from "./utils_env";
import { CreateEventVals } from "./utils_options";

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

// VALIDATE NEW EVENT SETTINGS

// Validates & normalizes values based of the varied frequency constraints

export { saveNewEvent, getEventsByRange, getMonthlySummary };
