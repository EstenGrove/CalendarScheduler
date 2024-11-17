export type WeekDayToken = "Su" | "Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa";

export type EventFrequency =
	| "Daily"
	| "Weekly"
	| "Monthly"
	| "Yearly"
	| "Custom"
	| "Never";

export interface CreateEventVals {
	title: string;
	desc: string;
	startDate: string;
	endDate: string;
	startTime: string;
	endTime: string;
	isRecurring: boolean;
	frequency: EventFrequency; // 'Daily', 'Weekly', 'Monthly', 'Yearly'
	interval: number; // X => Every X (days|weeks|months|years)
	byDay: WeekDayToken[]; // ['Tu', 'Fr']
	byMonthDay: number; // Day of the month (eg. 16th OR 2nd friday of the month)
	byMonth: number; // Month number (eg 1 => January & 12 => December)
	tagColor: string;
}

export interface CalendarEventDB {
	event_id: number;
	event_name: string;
	event_desc: string;
	start_date: string;
	end_date: string;
	start_time: string;
	end_time: string;
	is_active: boolean;
	created_date: string;
	modified_date: string | null;
}
export interface CalendarEventClient {
	eventID: number;
	eventName: string;
	eventDesc: string;
	startDate: string;
	endDate: string;
	startTime: string;
	endTime: string;
	isActive: boolean;
	createdDate: string;
	modifiedDate: string | null;
}

export interface MonthlyEventSummaryDB {
	target_date: string;
	has_event: boolean;
}
export interface MonthlyEventSummaryClient {
	eventDate: string;
	hasEvent: boolean;
}
