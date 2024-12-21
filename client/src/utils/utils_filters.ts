import { WorkoutType } from "./utils_workoutPlans";

export type RangePresetType =
	| "Today"
	| "Yesterday"
	| "This Week"
	| "Last Week"
	| "This Month"
	| "Last Month"
	| "This Year";

export type RangeType =
	| RangePresetType
	| "Day"
	| "Week"
	| "Month"
	| "Quarter"
	| "Year"
	| "Custom"
	| "None";
export type WorkoutLogType = WorkoutType["workoutType"];

export type QuarterValue = "Q1" | "Q2" | "Q3" | "Q4";
export interface FilterSettings {
	rangeType: RangeType;
	customStart: string;
	customEnd: string;
	rangeDate: Date | string;
	rangeMonth: Date | string; // November, December etc
	rangeYear: number;
	rangeQuarter: Date | string; // QuarterValue + year (eg. 'Q4 2024')
	workoutType: WorkoutLogType | null;
	workoutLength: number; // how long was the workout
}
