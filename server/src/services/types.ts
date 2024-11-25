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
	event_date: string;
	event_name: string;
	event_desc: string;
	start_date: string;
	end_date: string;
	start_time: string;
	end_time: string;
	is_active: boolean;
	created_date: string;
	modified_date: string | null;
	tag_color: string | null;
}
export interface CalendarEventClient {
	eventID: number;
	eventDate: string;
	title: string;
	desc: string;
	startDate: string;
	endDate: string;
	startTime: string;
	endTime: string;
	isActive: boolean;
	createdDate: string;
	modifiedDate: string | null;
	tagColor: string | null;
}

export interface EventInstanceDB {
	event_id: number;
	event_instance_id?: number;
	schedule_id: number;
	event_date: string;
	event_name: string;
	event_desc: string;
	start_date: string;
	end_date: string;
	start_time: string;
	end_time: string;
	is_active: boolean;
	created_date: string;
	modified_date: string | null;
	tag_color: string | null;
}
export interface EventInstanceClient {
	eventID: number;
	scheduleID: number;
	eventInstanceID?: number;
	eventDate: string;
	title: string;
	desc: string;
	startDate: string;
	endDate: string;
	startTime: string;
	endTime: string;
	isActive: boolean;
	createdDate: string;
	modifiedDate: string | null;
	tagColor: string | null;
}

export interface EventDetailsDB {
	details_id: number;
	event_id: number;
	notes: string;
	url: string;
	location: string;
	created_date: string;
	modified_date: string;
	is_active: boolean;
}

export interface EventDetailsClient {
	detailsID: number;
	eventID: number;
	notes: string;
	url: string;
	location: string;
	createdDate: string;
	modifiedDate: string;
	isActive: boolean;
}

export interface MonthlyEventSummaryDB {
	target_date: string;
	has_event: boolean;
}
export interface MonthlyEventSummaryClient {
	eventDate: string;
	hasEvent: boolean;
}

export interface CalendarScheduleDB {
	schedule_id: number;
	event_id: number;
	start_date: string;
	end_date: string;
	interval: number;
	frequency: EventFrequency;
	by_day: string[];
	by_month: number;
	by_month_day: number;
	created_date: string;
	modified_date: string;
	is_active: boolean;
}
export interface CalendarScheduleClient {
	scheduleID: number;
	eventID: number;
	startDate: string;
	endDate: string;
	interval: number;
	frequency: EventFrequency;
	byDay: string[];
	byMonth: number;
	byMonthDay: number;
	createdDate: string;
	modifiedDate: string;
	isActive: boolean;
}

export interface WorkoutPlanDB {
	plan_id: number;
	workout_type_id: number;
	plan_name: string;
	plan_desc: string;
	target_weight: number;
	target_reps: number;
	target_sets: number;
	target_length: number;
	is_active: boolean;
	created_date: string;
}

export interface WorkoutPlanClient {
	workoutTypeID: number;
	planID: number;
	planName: string;
	planDesc: string;
	planWeight: number;
	planReps: number;
	planSets: number;
	planLength: number;
	isActive: boolean;
	createdDate: string;
}

export interface WorkoutLogDB {
	log_id: number;
	workout_type_id: number;
	reps: number;
	sets: number;
	weight: number;
	miles: number;
	steps: number;
	workout_mins: number;
	start_time: string | null;
	end_time: string | null;
	workout_date: string;
	is_active: boolean;
	created_date: string;
}

export interface WorkoutLogClient {
	logID: number;
	workoutTypeID: number;
	reps: number;
	sets: number;
	weight: number;
	miles: number;
	steps: number;
	workoutMins: number;
	startTime: string | null;
	endTime: string | null;
	workoutDate: string;
	isActive: boolean;
	createdDate: string;
}

export interface CreateLogValues {
	workoutTypeID: number;
	mins: number; // mins
	reps: number;
	sets: number;
	weight: number;
	steps: number;
	miles: number;
	startTime: string;
	endTime: string;
	workoutDate: string;
}
