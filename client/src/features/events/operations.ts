import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	deleteCalendarEvent,
	DeletedEventResp,
	getEventDetails,
	getEventsByDate,
	getEventsByRange,
	getMonthlySummary,
	saveNewEvent,
} from "../../utils/utils_events";
import { AwaitedResponse } from "../types";
import { CalendarEvent, CalendarEventSchedule, MonthlySummary } from "./types";
import { CreateEventVals } from "../../utils/utils_options";
import { UserWorkout } from "../workouts/types";

export interface EventParams {
	userID: string;
	eventID: number;
}
export interface EventsRangeParams {
	userID: string;
	startDate: string;
	endDate: string;
}
export interface EventsDateParams {
	userID: string;
	targetDate: string;
}
export interface NewEventParams {
	userID: string;
	newEvent: CreateEventVals;
}
export interface DeleteEventParams {
	userID: string;
	eventID: number;
	dateToDelete: string;
	deleteSeries: boolean;
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

const fetchEventsByDate = createAsyncThunk(
	"events/fetchEventsByDate",
	async (params: EventsDateParams) => {
		const { userID, targetDate } = params;
		const response = (await getEventsByDate(
			userID,
			targetDate
		)) as AwaitedResponse<{ events: CalendarEvent[] }>;
		const data = response.Data;

		return data.events as CalendarEvent[];
	}
);

export interface EventDetails {
	event: CalendarEvent;
	schedule: CalendarEventSchedule;
	futureEvents: string[];
	workouts: UserWorkout[];
}

const fetchEventDetails = createAsyncThunk(
	"events/fetchEventDetails",
	async (params: EventParams) => {
		const { userID, eventID } = params;
		const response = (await getEventDetails(
			userID,
			eventID
		)) as AwaitedResponse<EventDetails>;
		const data = response.Data;

		return data as EventDetails;
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

const deleteEvent = createAsyncThunk(
	"events/deleteEvent",
	async (params: DeleteEventParams) => {
		const { userID, eventID, dateToDelete, deleteSeries } = params;
		const response = (await deleteCalendarEvent(userID, {
			eventID,
			dateToDelete,
			deleteSeries,
		})) as AwaitedResponse<DeletedEventResp>;

		const data = response.Data;

		return data as DeletedEventResp;
	}
);

export {
	fetchEventsByRange,
	fetchMonthlySummary,
	fetchEventsByDate,
	fetchEventDetails,
	createNewEvent,
	deleteEvent,
};
