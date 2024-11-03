export interface CalendarState {
	month: number;
	year: number;
}

export interface CalendarEvent {
	eventID: number;
	title: string;
	desc: string;
	isActive: boolean;
	createdDate: string;
	modifiedDate: string | null;
	startDate: string;
	endDate: string | null;
	startTime: string;
	endTime: string | null;
	tagColor: string;
}

export interface CalendarEventSchedule {
	scheduleID: number;
	eventID: number;
	startDate: string;
	endDate: string | null;
	startTime: string;
	endTime: string | null;
	intervalInDays: number;
	isActive: boolean;
	createdDate: string;
	modifiedDate: string | null;
}

export interface CalendarEventDetails {
	detailsID: number;
	notes: string;
	url: string;
	location: string;
	isActive: boolean;
	createdDate: string;
	modifiedDate: string | null;
}
