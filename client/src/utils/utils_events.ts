import { CalendarEvent } from "../features/events/types";
import { AsyncResponse, DateRange, TResponse } from "../features/types";
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

export { saveNewEvent, getEventsByRange };
