import { EventFrequency, WeekDayToken } from "../../utils/utils_options";

export type CreateWorkoutStep =
	| "Type"
	| "About"
	| "Reps"
	| "Steps"
	| "Time"
	| "Schedule"
	| "Length"
	| "Summary"
	| "SUCCESS"
	| "FAILED";

export interface CreateWorkoutValues {
	workoutType: string;
	planName: string;
	planDesc: string;
	notes: string;
	mins: number; // mins
	// weighted
	weight: number;
	reps: number;
	sets: number;
	// distance
	steps: number;
	miles: number;
	// scheduled time
	startTime: string;
	endTime: string;
	date: string;
	// recurring schedule event
	isRecurring: boolean;
	noEndDate: boolean;
}

export interface CreateScheduleValues {
	startDate: string;
	endDate: string;
	frequency: EventFrequency;
	interval: number;
	byDay: WeekDayToken[];
	byMonthDay: number;
	byMonth: number;
	// optional
	location: string;
	url: string;
	notes: string;
}
export type NewWorkoutValues = CreateWorkoutValues & CreateScheduleValues;

// Used for creating a new workout with a new plan
export interface NewWorkoutPayload {
	workoutTypeID: number;
	planName: string;
	planDesc: string;
	notes: string;
	mins: number; // mins
	// weighted
	weight: number;
	reps: number;
	sets: number;
	// distance
	steps: number;
	miles: number;
}

// MIGRATE TO THESE FOR REQUESTS
export interface NewWorkoutEvent {
	title: string;
	desc: string;
	startDate: string;
	endDate: string;
	startTime: string;
	endTime: string;
	frequency: EventFrequency;
	interval: number;
	byDay: WeekDayToken[];
	byMonthDay: number;
	byMonth: number;
	// optional
	location: string;
	url: string;
	notes: string;
	// recurrence indicators
	isRecurring: boolean;
	noEndDate: boolean;
}

export interface NewWorkoutAndPlan {
	workoutTypeID: number;
	planName: string;
	planDesc: string;
	notes: string;
	mins: number; // mins
	// weighted
	weight: number;
	reps: number;
	sets: number;
	// distance
	steps: number;
	miles: number;
}

export type RecurringWorkoutAndPlan = {
	event: NewWorkoutEvent;
	workout: NewWorkoutAndPlan;
};
