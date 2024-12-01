import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TStatus } from "../types";
import {
	Workout,
	WorkoutHistoryEntry,
	WorkoutPlan,
	WorkoutSummary,
} from "./types";
import { RootState } from "../../store/store";
import { createWorkoutWithPlan } from "./operations";
import { CreateWorkoutResponse } from "../../utils/utils_workouts";

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
	extraReducers(builder) {
		builder
			.addCase(createWorkoutWithPlan.pending, (state: WorkoutsSlice) => {
				state.status = "PENDING";
			})
			.addCase(
				createWorkoutWithPlan.fulfilled,
				(
					state: WorkoutsSlice,
					action: PayloadAction<CreateWorkoutResponse>
				) => {
					const { workout, plan } = action.payload;

					state.status = "FULFILLED";
					state.workouts = [workout, ...state.workouts];
					state.workoutPlans = [plan, ...state.workoutPlans];
				}
			);
	},
});

export const selectWorkouts = (state: RootState) => {
	return state.workouts.workouts;
};

export const selectWorkoutPlans = (state: RootState) => {
	return state.workouts.workoutPlans;
};

export default workoutsSlice.reducer;
