import { CalendarEvent } from "../features/events/types";
import { TResponse } from "../features/types";
import { currentEnv, eventApis } from "./utils_env";

// Returns an array of calendar events in the 'Data' of the response payload
export type CalendarEventsResponse = Promise<
	TResponse<{ events: CalendarEvent[] }> | unknown
>;

const getEventsInRange = async (
	startDate: string,
	endDate: string
): CalendarEventsResponse => {
	let url = currentEnv.base + eventApis.getByRange;
	url += "?" + new URLSearchParams({ startDate, endDate });

	try {
		const request = await fetch(url);
		const response = await request.json();
		return response;
	} catch (error) {
		return error;
	}
};

export { getEventsInRange };
