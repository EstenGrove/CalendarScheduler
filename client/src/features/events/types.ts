import { EventFrequency, WeekDayToken } from "../../utils/utils_options";

export interface CalendarState {
	month: number;
	year: number;
}

export interface CalendarEvent {
	eventID: number;
	title: string;
	desc: string;
	eventDate: string;
	isActive: boolean;
	createdDate: string;
	modifiedDate: string | null;
	startDate: string;
	endDate: string | null;
	startTime: string;
	endTime: string | null;
	tagColor?: string;
}

export interface CalendarEventSchedule {
	scheduleID: number;
	eventID: number;
	startDate: string;
	endDate: string | null;
	interval: number;
	frequency: EventFrequency;
	byDay: WeekDayToken[];
	byMonth: number;
	byMonthDay: number;
	isActive: boolean;
	createdDate: string;
	modifiedDate: string | null;
}

export interface CalendarEventDetails {
	detailsID: number;
	eventID: number;
	notes: string;
	url: string;
	location: string;
	isActive: boolean;
	createdDate: string;
	modifiedDate: string | null;
}

// { "2024-11-14": true, "2024-11-15": false, ...}
export type MonthlySummary = Record<string, boolean>;
