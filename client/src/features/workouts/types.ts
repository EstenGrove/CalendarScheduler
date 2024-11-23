// This is a custom interface that combines the workout_plan & workout records
export interface Workout {
	workoutID: number;
	planID: number;
	workoutName: string;
	workoutDesc: string;
	workoutLength: string; // 25:00 => 25 mins
	workoutPlans: WorkoutPlan[];
	createdDate: string;
	isActive: boolean;
}

// This is a recorded historical entry for a given workout OR workout plan
export interface WorkoutHistoryEntry {
	workoutID: number;
	planID: number;
	workoutDate: string; // date workout occurred
	startTime: string; // start time
	endTime: string; // end time
	recordedReps: number;
	recordedSets: number;
	recordedLength: string; // elapsed time of workout (eg. 27:33 => 27 mins & 33 secs)
	isCompleted: boolean;
	notes: string;
}

// A summary of all historical entries for a given workout

export interface WorkoutSummaryTotal {
	today: number;
	thisWeek: number;
	thisMonth: number;
	thisYear: number;
}

export interface WorkoutSummary {
	workoutID: number;
	summaryID: number;
	// total hours on workout in interval
	totalHours: WorkoutSummaryTotal;
	// total reps in interval
	totalReps: WorkoutSummaryTotal;
	// total sets in interval
	totalSets: WorkoutSummaryTotal;
}

// This is a created (before-hand) workout plan, to be scheduled & performed.
// - It is NOT a history entry NOR a Workout, it's merely a plan to perform
export interface WorkoutPlan {
	workoutType: string; // eg. Curls, Overhead Press, Pushups etc.
	planID: number;
	planName: string;
	planDesc: string;
	targetWeight: number; // in lbs.
	targetReps: number;
	targetSets: number;
	targetLength: string; // 25:00 => 25 mins
	createdDate: string;
	isActive: boolean;
}
