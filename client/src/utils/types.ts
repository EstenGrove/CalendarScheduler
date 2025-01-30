import { ActivityType } from "./utils_activity";

export interface QuickWorkoutValues {
	name: string;
	desc: string;
	time: string;
	tagColor: string;
	activityType: ActivityType | string;
	mins: number;
	// optional & not available in <CreateQuickWorkout/> modal
	weight: number;
	reps: number;
	sets: number;
	steps: number;
	miles: number;
}
