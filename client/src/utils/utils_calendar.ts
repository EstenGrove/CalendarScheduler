import {
	addWeeks,
	eachDayOfInterval,
	eachWeekOfInterval,
	endOfMonth,
	endOfWeek,
	format,
	getDate,
	isSameDay,
	startOfMonth,
} from "date-fns";
import { CalendarEvent } from "../features/events/types";
import { groupByFn, TRecord } from "./utils_misc";
import { DateRange, formatDate } from "./utils_dates";

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

// GENERATOR UTILS & DATE-PICKER UTILS

// Returns a set of years as an array of numbers: [2023, 2024, 2025, 2026, 2027]
const generateYearOptions = (numOfYears: number = 10): number[] => {
	const prevYear: number = new Date().getFullYear() - 1;
	const years: number[] = [prevYear];

	for (let i = 0; i < numOfYears; i++) {
		const year = new Date().getFullYear();
		const newYear = year + i;
		years.push(newYear);
	}

	return years;
};

// generates 20 years (eg 10 before & 10 after the current year)
const generateYearOptions2 = (numOfYears: number = 10): number[] => {
	const years: number[] = [];

	for (let i = 0; i < numOfYears; i++) {
		const year = new Date().getFullYear();
		const prevYear = year - i;
		const nextYear = year + i;
		years.push(prevYear);
		years.push(nextYear);
	}

	return years.sort((a, b) => a - b);
};

// Get Dates for Monthly Summary range
const getMonthStartAndEnd = (
	month: number,
	year: number
): { startDate: string; endDate: string } => {
	const base: Date = new Date(year, month, 1);
	const monthStart: Date = startOfMonth(base);
	const monthEnd: Date = endOfMonth(base);

	return {
		startDate: formatDate(monthStart, "db"),
		endDate: formatDate(monthEnd, "db"),
	};
};

export {
	generateWeeksAndDates,
	isInMonth,
	groupEventsByDate,
	hasEvent,
	filterEventsByDate,
	generateYearOptions,
	generateYearOptions2,
	getMonthStartAndEnd,
};
