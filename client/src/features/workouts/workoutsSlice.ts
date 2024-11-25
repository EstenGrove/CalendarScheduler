import { createSlice } from "@reduxjs/toolkit";
import { TStatus } from "../types";
import {
	Workout,
	WorkoutHistoryEntry,
	WorkoutPlan,
	WorkoutSummary,
} from "./types";
import { RootState } from "../../store/store";

export interface SelectedWorkout {
	workout: Workout;
	history: WorkoutHistoryEntry[];
	summary: WorkoutSummary;
}
export interface WorkoutsSlice {
	status: TStatus;
	workouts: Workout[];
	workoutPlans: WorkoutPlan[];
	selectedWorkout: SelectedWorkout | null;
}

const initialState: WorkoutsSlice = {
	status: "IDLE",
	workouts: [],
	workoutPlans: [],
	selectedWorkout: null,
};

const workoutsSlice = createSlice({
	name: "workouts",
	initialState: initialState,
	reducers: {},
});

export const selectWorkouts = (state: RootState) => {
	return state.workouts.workouts;
};

export const selectWorkoutPlans = (state: RootState) => {
	return state.workouts.workoutPlans;
};

export default workoutsSlice.reducer;
