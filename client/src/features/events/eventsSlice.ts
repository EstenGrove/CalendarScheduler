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
	fetchEventsByRange,
	fetchMonthlySummary,
} from "./operations";
import {
	filterEventsByDate,
	groupEventsByDate,
} from "../../utils/utils_calendar";

const fakeEvents: CalendarEvent[] = [
	{
		eventID: 1,
		title: "Curls (10x)",
		desc: "At 3:00 PM perform at least 10 curls of 20 pounds",
		startTime: "3:00 PM",
		endTime: "3:30 PM",
		tagColor: "var(--accent)",
		isActive: true,
		createdDate: new Date(2024, 9, 18).toString(),
		modifiedDate: null,
		startDate: new Date(2024, 10, 3, 13).toString(),
		endDate: new Date(2024, 10, 3, 13, 30).toString(),
	},
	{
		eventID: 2,
		title: "Chest Pulls (10x)",
		desc: "At 4:00 PM perform at least 10 curls of 20 pounds",
		startTime: "4:00 PM",
		endTime: "4:30 PM",
		tagColor: "var(--accent-purple)",
		isActive: true,
		createdDate: new Date(2024, 9, 18).toString(),
		modifiedDate: null,
		startDate: new Date(2024, 10, 13, 16).toString(),
		endDate: new Date(2024, 10, 13, 16, 30).toString(),
	},
	{
		eventID: 3,
		title: "Situps (20x)",
		desc: "At 5:00 PM perform at least 10 curls of 20 pounds",
		startTime: "5:00 PM",
		endTime: "5:30 PM",
		tagColor: "blue",
		isActive: true,
		createdDate: new Date(2024, 10, 1).toString(),
		modifiedDate: null,
		startDate: new Date(2024, 10, 19, 17).toString(),
		endDate: new Date(2024, 10, 19, 17, 30).toString(),
	},
	{
		eventID: 4,
		title: "Do Pushups (10 min.)",
		desc: "Perform at least 10 pushups between 10:30 AM & 10:45 AM",
		startTime: "10:30 AM",
		endTime: "10:45 AM",
		tagColor: "blue",
		isActive: true,
		createdDate: new Date(2024, 9, 18).toString(),
		modifiedDate: null,
		startDate: new Date(2024, 10, 28, 10, 30).toString(),
		endDate: new Date(2024, 10, 28, 10, 45).toString(),
	},
	{
		eventID: 5,
		title: "More Curls (10x at 15lbs.)",
		desc: "Around 1:30 PM I need to do a set of 10 curls (both arms) w/ the 15 lbs weights.",
		startTime: "13:30 PM",
		endTime: "14:00 PM",
		tagColor: "blue",
		isActive: true,
		createdDate: new Date(2024, 10, 1).toString(),
		modifiedDate: null,
		startDate: new Date(2024, 10, 28, 13, 30).toString(),
		endDate: new Date(2024, 10, 19, 14).toString(),
	},
	{
		eventID: 6,
		title: "Another Event",
		desc: "Do some stuff at some today on this day.",
		startTime: "",
		endTime: "",
		tagColor: "var(--accent-purple)",
		isActive: true,
		createdDate: new Date(2024, 9, 18).toString(),
		modifiedDate: null,
		startDate: new Date(2024, 10, 28, 10, 30).toString(),
		endDate: new Date(2024, 10, 28, 10, 45).toString(),
	},
	{
		eventID: 7,
		title: "Update Debit Card on Various Sites (see notes)",
		desc: "Some sites to update ",
		startTime: "13:30 PM",
		endTime: "14:00 PM",
		tagColor: "blue",
		isActive: true,
		createdDate: new Date(2024, 10, 1).toString(),
		modifiedDate: null,
		startDate: new Date(2024, 10, 28, 13, 30).toString(),
		endDate: new Date(2024, 10, 19, 14).toString(),
	},
];

const eventsByDate = groupEventsByDate(fakeEvents);

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
		schedule: CalendarEventSchedule[];
	};
}

const initialState: CalendarEventsSlice = {
	status: "IDLE",
	events: fakeEvents,
	eventsByDate: eventsByDate,
	eventsByMonth: {},
	monthlySummary: {},
	selectedDateEvents: [],
	selectedEvent: {
		event: null,
		details: null,
		schedule: [],
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
	},
});

export const { setEvents, setEventsByDate, setSelectedDateEvents } =
	calendarEventsSlice.actions;

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
