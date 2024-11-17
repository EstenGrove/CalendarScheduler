import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	getEventsByRange,
	getMonthlySummary,
	saveNewEvent,
} from "../../utils/utils_events";
import { AwaitedResponse } from "../types";
import { CalendarEvent, MonthlySummary } from "./types";
import { CreateEventVals } from "../../utils/utils_options";

export type EventsRangeParams = {
	userID: string;
	startDate: string;
	endDate: string;
};

export interface NewEventParams {
	userID: string;
	newEvent: CreateEventVals;
}

const fetchEventsByRange = createAsyncThunk(
	"events/fetchEventsByRange",
	async (params: EventsRangeParams) => {
		const { userID } = params;
		const response = (await getEventsByRange(userID, {
			startDate: params.startDate,
			endDate: params.endDate,
		})) as AwaitedResponse<{ events: CalendarEvent[] }>;
		const data = response.Data;

		return data.events as CalendarEvent[];
	}
);

const fetchMonthlySummary = createAsyncThunk(
	"events/fetchMonthlySummary",
	async (params: EventsRangeParams) => {
		const { userID } = params;
		const response = (await getMonthlySummary(userID, {
			startDate: params.startDate,
			endDate: params.endDate,
		})) as AwaitedResponse<{ eventsSummary: MonthlySummary }>;
		const data = response.Data;

		return data.eventsSummary as MonthlySummary;
	}
);

const createNewEvent = createAsyncThunk(
	"events/createNewEvent",
	async (params: NewEventParams) => {
		const { userID, newEvent } = params;
		const newEventResp = (await saveNewEvent(
			userID,
			newEvent
		)) as AwaitedResponse<{ newEvent: CalendarEvent; eventDates: string[] }>;

		const data = newEventResp.Data as {
			newEvent: CalendarEvent;
			eventDates: string[];
		};

		return data;
	}
);

export { fetchEventsByRange, fetchMonthlySummary, createNewEvent };
