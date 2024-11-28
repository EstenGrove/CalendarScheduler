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
