import { WorkoutType } from "./utils_workoutPlans";

export type RangeType =
	| "Day"
	| "Week"
	| "Month"
	| "Quarter"
	| "Year"
	| "Custom"
	| "None";
export type WorkoutLogType = WorkoutType["workoutType"];
export interface FilterSettings {
	rangeType: RangeType;
	startDate: string;
	endDate: string;
	workoutType: WorkoutLogType | null;
	workoutLength: number; // how long was the workout
}
