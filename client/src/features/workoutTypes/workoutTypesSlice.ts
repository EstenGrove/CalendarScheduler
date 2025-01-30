import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchWorkoutTypes } from "./operations";
import { WorkoutType } from "../../utils/utils_workoutPlans";
import { TStatus } from "../types";

export interface WorkoutTypesSlice {
	workoutTypes: WorkoutType[]; // global workout types
	userTypes: WorkoutType[]; // custom user types, non-global
	status: TStatus;
}

const initialState: WorkoutTypesSlice = {
	workoutTypes: [],
	userTypes: [],
	status: "IDLE",
};

const workoutTypesSlice = createSlice({
	name: "workoutTypes",
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		// fetch types
		builder
			.addCase(fetchWorkoutTypes.pending, (state: WorkoutTypesSlice) => {
				state.status = "PENDING";
			})
			.addCase(
				fetchWorkoutTypes.fulfilled,
				(state: WorkoutTypesSlice, action: PayloadAction<WorkoutType[]>) => {
					state.status = "FULFILLED";
					state.workoutTypes = action.payload;
				}
			);
		// update type
		// delete type
		// create type
	},
});

export default workoutTypesSlice.reducer;
