import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TStatus } from "../types";
import {
	UserWorkout,
	WorkoutHistoryEntry,
	WorkoutPlan,
	WorkoutSummary,
} from "./types";
import { RootState } from "../../store/store";
import {
	createWorkoutWithPlan,
	fetchWorkoutPlans,
	fetchWorkouts,
	fetchWorkoutsByDate,
	markWorkoutAsDone,
	UserWorkoutsResp,
} from "./operations";
import { CreateWorkoutResponse } from "../../utils/utils_workouts";

export interface SelectedWorkout {
	workout: UserWorkout;
	history: WorkoutHistoryEntry[];
	summary: WorkoutSummary;
}
export interface WorkoutsSlice {
	status: TStatus;
	workouts: {
		list: UserWorkout[];
		status: TStatus;
	};
	workoutPlans: {
		plans: WorkoutPlan[];
		status: TStatus;
	};
	selectedWorkout: SelectedWorkout | null;
}

const initialState: WorkoutsSlice = {
	status: "IDLE",
	workouts: {
		list: [],
		status: "IDLE",
	},
	workoutPlans: {
		plans: [],
		status: "IDLE",
	},
	selectedWorkout: null,
};

const workoutsSlice = createSlice({
	name: "workouts",
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		// Create workout 'plan'
		builder
			.addCase(createWorkoutWithPlan.pending, (state: WorkoutsSlice) => {
				state.status = "PENDING";
				state.workouts.status = "PENDING";
			})
			.addCase(
				createWorkoutWithPlan.fulfilled,
				(
					state: WorkoutsSlice,
					action: PayloadAction<CreateWorkoutResponse>
				) => {
					const { workout, plan } = action.payload;

					state.status = "FULFILLED";
					state.workouts.status = "FULFILLED";
					state.workouts.list = [
						workout as UserWorkout,
						...state.workouts.list,
					];
					state.workoutPlans.plans = [plan, ...state.workoutPlans.plans];
				}
			);
		// Fetch workouts
		builder
			.addCase(fetchWorkoutsByDate.pending, (state: WorkoutsSlice) => {
				state.workouts.status = "PENDING";
			})
			.addCase(
				fetchWorkoutsByDate.fulfilled,
				(state: WorkoutsSlice, action: PayloadAction<UserWorkoutsResp>) => {
					state.workouts.status = "FULFILLED";
					state.workouts.list = action.payload.workouts;
				}
			);
		builder
			.addCase(fetchWorkouts.pending, (state: WorkoutsSlice) => {
				state.workouts.status = "PENDING";
			})
			.addCase(
				fetchWorkouts.fulfilled,
				(state: WorkoutsSlice, action: PayloadAction<UserWorkoutsResp>) => {
					state.workouts.status = "FULFILLED";
					state.workouts.list = action.payload.workouts;
				}
			);
		// Fetch workout plans
		builder
			.addCase(fetchWorkoutPlans.pending, (state: WorkoutsSlice) => {
				state.workoutPlans.status = "PENDING";
			})
			.addCase(
				fetchWorkoutPlans.fulfilled,
				(
					state: WorkoutsSlice,
					action: PayloadAction<{ workoutPlans: WorkoutPlan[] }>
				) => {
					state.workoutPlans.status = "FULFILLED";
					state.workoutPlans.plans = action.payload.workoutPlans;
				}
			);
		// Toggle the status of a single workout for a given date
		builder
			.addCase(markWorkoutAsDone.pending, (state: WorkoutsSlice) => {
				state.workouts.status = "PENDING";
			})
			.addCase(
				markWorkoutAsDone.fulfilled,
				(state, action: PayloadAction<UserWorkout>) => {
					const updatedWorkout = action.payload;
					const updatedList = [
						...state.workouts.list.filter(
							(w) => w.workoutID !== updatedWorkout.workoutID
						),
					];
					state.workouts.status = "FULFILLED";
					state.workouts.list = updatedList;
				}
			);
	},
});

export const selectIsLoadingPlans = (state: RootState) => {
	return state.workouts.workoutPlans.status === "PENDING";
};
export const selectIsLoadingWorkouts = (state: RootState) => {
	return state.workouts.workouts.status === "PENDING";
};
export const selectWorkoutsStatus = (state: RootState) => {
	return state.workouts.workouts.status;
};

export const selectSelectedWorkout = (state: RootState) => {
	return state.workouts.selectedWorkout as SelectedWorkout;
};
export const selectWorkouts = (state: RootState) => {
	return state.workouts.workouts.list;
};

export const selectWorkoutPlans = (state: RootState) => {
	return state.workouts.workoutPlans;
};

export default workoutsSlice.reducer;
