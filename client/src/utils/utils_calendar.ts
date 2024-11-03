import {
	addWeeks,
	eachDayOfInterval,
	eachWeekOfInterval,
	endOfWeek,
	format,
	getDate,
	isSameDay,
} from "date-fns";
import { CalendarEvent } from "../features/events/types";
import { groupByFn, TRecord } from "./utils_misc";
import { formatDate } from "./utils_dates";

export interface CalendarWeek {
	week: number;
	dates: Date[];
}

const generateWeeksAndDates = (
	month: number = 9,
	year: number = new Date().getFullYear()
): CalendarWeek[] => {
	const base = new Date(year, month, 1);
	const end = addWeeks(base, 4);
	const weeks = eachWeekOfInterval({ start: base, end });

	const weeksAndDates = weeks.map((week, idx) => {
		const weeksEnd = endOfWeek(week);
		const weekDates = eachDayOfInterval({ start: week, end: weeksEnd });
		return {
			week: idx,
			dates: weekDates,
		};
	});

	return weeksAndDates;
};

const isInMonth = (month: number, weekDate: Date) => {
	const dateMonth = weekDate.getMonth();

	return month === dateMonth;
};

const groupEventsByDate_NUMBER = (
	events: CalendarEvent[]
): TRecord<CalendarEvent> => {
	const grouped = groupByFn(events, (x) => getDate(x.startDate));
	return grouped;
};
const groupEventsByDate = (events: CalendarEvent[]): TRecord<CalendarEvent> => {
	const grouped = groupByFn(events, (x) => format(x.startDate, "MM/dd/yyyy"));
	return grouped;
};

// Checks if an event for a given date exists in the 'eventsByDate' map
const hasEvent = (
	event: CalendarEvent,
	eventsByDate: TRecord<CalendarEvent[]>
): boolean => {
	const eventStart = new Date(event.startDate);
	const eventDate = getDate(eventStart);

	if (eventDate in eventsByDate) {
		const dateEvents = eventsByDate[eventDate];
		return dateEvents.length > 0;
	} else {
		return false;
	}
};

const filterEventsByDate = (date: Date | string, events: CalendarEvent[]) => {
	const target = formatDate(date, "long");
	const dateEvents = [...events].filter((event) => {
		return isSameDay(target, event.startDate);
	});

	return dateEvents;
};

export {
	generateWeeksAndDates,
	isInMonth,
	groupEventsByDate,
	hasEvent,
	filterEventsByDate,
};
