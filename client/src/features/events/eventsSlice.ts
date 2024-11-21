import { isSameDay } from "date-fns";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	CalendarEvent,
	CalendarEventDetails,
	CalendarEventSchedule,
	MonthlySummary,
} from "./types";
import { TStatus } from "../types";
import { RootState } from "../../store/store";
import { TRecord } from "../../utils/utils_misc";
import {
	createNewEvent,
	EventDetails,
	fetchEventDetails,
	fetchEventsByDate,
	fetchEventsByRange,
	fetchMonthlySummary,
} from "./operations";
import {
	filterEventsByDate,
	groupEventsByDate,
} from "../../utils/utils_calendar";

export type EventsByMonth = TRecord<CalendarEvent[]>;

export interface CalendarEventsSlice {
	status: TStatus;
	events: CalendarEvent[];
	eventsByDate: TRecord<CalendarEvent>;
	eventsByMonth: TRecord<CalendarEvent[]>;
	monthlySummary: MonthlySummary;
	selectedDateEvents: CalendarEvent[];
	selectedEvent: {
		event: CalendarEvent | null;
		details: CalendarEventDetails | null;
		schedule: CalendarEventSchedule | null;
		upcoming: string[];
	};
}

const initialState: CalendarEventsSlice = {
	status: "IDLE",
	events: [],
	eventsByDate: {},
	// events: fakeEvents,
	// eventsByDate: eventsByDate,
	eventsByMonth: {},
	monthlySummary: {},
	selectedDateEvents: [],
	selectedEvent: {
		event: null,
		details: null,
		schedule: null,
		upcoming: [],
	},
};

const calendarEventsSlice = createSlice({
	name: "events",
	initialState: initialState,
	reducers: {
		setEvents(
			state: CalendarEventsSlice,
			action: PayloadAction<CalendarEvent[]>
		) {
			state.events = action.payload;
		},
		setEventsByDate(
			state: CalendarEventsSlice,
			action: PayloadAction<CalendarEvent[]>
		) {
			const byDate = groupEventsByDate(action.payload);
			state.eventsByDate = byDate;
		},
		setSelectedDateEvents(
			state: CalendarEventsSlice,
			action: PayloadAction<string>
		) {
			const targetDate = new Date(action.payload);
			const eventsForDate = filterEventsByDate(targetDate, state.events);
			state.selectedDateEvents = eventsForDate;
		},
		setSelectedEvent(
			state: CalendarEventsSlice,
			action: PayloadAction<CalendarEvent>
		) {
			state.selectedEvent = {
				event: action.payload,
				details: null,
				schedule: null,
				upcoming: [],
			};
		},
	},
	extraReducers(builder) {
		// Fetch by Range (eg. month range typically)
		builder
			.addCase(fetchEventsByRange.pending, (state: CalendarEventsSlice) => {
				state.status = "PENDING";
			})
			// FIX THIS!!!
			// - Update the correct types for 'action: PayloadAction<CalendarEvent[]>'
			.addCase(
				fetchEventsByRange.fulfilled,
				(
					state: CalendarEventsSlice,
					action: PayloadAction<CalendarEvent[]>
				) => {
					state.status = "FULFILLED";
					state.events = action.payload;
				}
			)
			.addCase(fetchEventsByRange.rejected, (state: CalendarEventsSlice) => {
				state.status = "REJECTED";
			});

		// CREATE NEW EVENT:
		builder
			.addCase(createNewEvent.pending, (state) => {
				state.status = "PENDING";
			})
			.addCase(
				createNewEvent.fulfilled,
				(
					state: CalendarEventsSlice,
					action: PayloadAction<{
						newEvent: CalendarEvent;
						eventDates: string[];
					}>
				) => {
					const { newEvent, eventDates } = action.payload;
					console.log("newEvent", newEvent);
					console.log("eventDates", eventDates);

					state.status = "FULFILLED";
					state.events = [newEvent, ...state.events];
				}
			);

		// Monthly Summary
		builder
			.addCase(fetchMonthlySummary.pending, (state: CalendarEventsSlice) => {
				state.status = "PENDING";
			})
			.addCase(
				fetchMonthlySummary.fulfilled,
				(state: CalendarEventsSlice, action: PayloadAction<MonthlySummary>) => {
					state.status = "FULFILLED";
					state.monthlySummary = action.payload;
				}
			);

		// Events for a given Date
		builder
			.addCase(fetchEventsByDate.pending, (state: CalendarEventsSlice) => {
				state.status = "PENDING";
			})
			.addCase(
				fetchEventsByDate.fulfilled,
				(
					state: CalendarEventsSlice,
					action: PayloadAction<CalendarEvent[]>
				) => {
					state.status = "FULFILLED";
					state.selectedDateEvents = action.payload;
				}
			);

		// Event Details
		builder
			.addCase(fetchEventDetails.pending, (state: CalendarEventsSlice) => {
				state.status = "PENDING";
			})
			.addCase(
				fetchEventDetails.fulfilled,
				(state, action: PayloadAction<EventDetails>) => {
					console.log("action.payload", action.payload);
					state.status = "FULFILLED";
					state.selectedEvent = {
						...state.selectedEvent,
						event: action.payload.event,
						schedule: action.payload.schedule,
						upcoming: action.payload.futureEvents,
					};
				}
			);
	},
});

export const {
	setEvents,
	setEventsByDate,
	setSelectedDateEvents,
	setSelectedEvent,
} = calendarEventsSlice.actions;

export const selectEvents = (state: RootState) => {
	return state.events.events;
};

export const selectMonthlySummary = (state: RootState) => {
	return state.events.monthlySummary as MonthlySummary;
};
export const selectEventByID =
	(id: number) =>
	(state: RootState): CalendarEvent => {
		const calendarEvent = state.events.events.find(
			(entry: CalendarEvent) => entry.eventID === id
		);

		return calendarEvent as CalendarEvent;
	};

export const selectEventsByDate = (state: RootState) => {
	return state.events.eventsByDate;
};
export const selectSelectedDateEvents = (state: RootState) => {
	return state.events.selectedDateEvents;
};
export const selectSelectedEvent = (state: RootState) => {
	return state.events.selectedEvent;
};
// gets all events for the selected date
export const selectEventsForDate =
	(date: string) =>
	(state: RootState): CalendarEvent[] => {
		const allEvents: CalendarEvent[] = state.events.events;
		const selectedEvents = [...allEvents].filter((event) => {
			const { startDate } = event;
			return isSameDay(startDate, date);
		});

		return selectedEvents;
	};

export default calendarEventsSlice.reducer;
