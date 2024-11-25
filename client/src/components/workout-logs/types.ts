import { workoutTypes } from "../../utils/utils_workoutPlans";

export type WorkoutTypeOpts =
	| "Planked Pull-ups"
	| "Lateral Butterflys"
	| "Overhead Press"
	| "Pushups"
	| "Situps"
	| "Curls"
	| "Timed Walk"
	| "Free Walk"
	| "Distance Walk"
	| "Other";

export type WorkoutTypeValue = (typeof workoutTypes)[number]["workoutType"];

export interface CreateLogValues {
	workoutType: WorkoutTypeOpts | string;
	mins: number; // mins
	reps: number;
	sets: number;
	weight: number;
	steps: number;
	miles: number;
	startTime: string;
	endTime: string;
}
