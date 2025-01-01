import { WorkoutTypeName } from "../../utils/utils_workoutPlans";

export type WorkoutActivityType =
	| "weight"
	| "walk"
	| "distance"
	| "timed"
	| "stretch"
	| "cardio"
	| "other";

/**
 * Workout History is for workout plans, specifically
 */
export interface WorkoutHistoryEntry {
	planID: number | null;
	recordedReps: number;
	recordedSets: number;
	recordedWeight: number;
	recordedMins: number;
	workoutDate: string;
	startTime: string;
	endTime: string;
	isActive: boolean;
	createdDate: string;
}

/**
 * Workout Logs are for ad-hoc/one-off workout entries, or logs.
 */
export interface WorkoutLog {
	typeID: number;
	reps: number;
	sets: number;
	miles: number;
	mins: number;
	date: string;
	startTime: string;
	endTime: string;
	isActive: boolean;
	createdDate: string;
}
export interface WorkoutLogEntry {
	userID: string;
	logID: number;
	workoutType: WorkoutTypeName; // eg. Curls, Situps etc
	weight: number;
	reps: number;
	sets: number;
	steps: number;
	miles: number;
	mins: number;
	date: string;
	startTime: string;
	endTime: string;
	isActive?: boolean;
	createdDate: string;
}

export interface WorkoutLogSummary {
	totalMins: number;
	totalReps: number;
	totalMiles: number;
	totalSteps: number;
	totalNumOfWorkouts: number;
	totalNumOfWorkoutTypes: number;
}

// Small summary of workout_logs by workout type
export interface WorkoutTypeLogSummary {
	workoutTypeID: number;
	workoutType: WorkoutTypeName;
	totalMins: number;
	totalReps: number;
	totalMiles: number;
	totalSteps: number;
}

export interface LogRangeSummary {
	details: WorkoutLogSummary;
	byType: WorkoutTypeLogSummary[];
}

export interface HistoryEntry {
	planID: number;
	historyID: number;
	workoutID: number;
	workoutTypeID: number;
	workoutType: WorkoutTypeName;
	activityType: WorkoutActivityType;
	name: string;
	desc: string;
	date: Date | string;
	startTime: Date | string;
	endTime: Date | string;
	// target
	targetMins: number;
	targetReps: number;
	targetSets: number;
	targetMiles: number;
	targetSteps: number;
	targetWeight: number;
	// actual
	recordedMins: number;
	recordedReps: number;
	recordedSets: number;
	recordedMiles: number;
	recordedSteps: number;
	recordedWeight: number;
}
