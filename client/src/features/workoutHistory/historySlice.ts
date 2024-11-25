import { createSlice } from "@reduxjs/toolkit";
import { saveLogEntry } from "./operations";
import { TStatus } from "../types";
import { WorkoutType } from "../../utils/utils_workoutPlans";
import { WorkoutHistoryEntry, WorkoutLog } from "./types";

export interface HistorySlice {
	status: TStatus;
	workoutTypes: WorkoutType[];
	workoutHistory: WorkoutHistoryEntry[];
	workoutLogs: WorkoutLog[];
}

const initialState: HistorySlice = {
	status: "IDLE",
	workoutTypes: [],
	workoutHistory: [],
	workoutLogs: [],
};

const historySlice = createSlice({
	name: "history",
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(saveLogEntry.pending, (state) => {
				state.status = "PENDING";
			})
			.addCase(saveLogEntry.fulfilled, (state, action) => {
				state.status = "FULFILLED";
				state.workoutLogs = [action.payload, ...state.workoutLogs];
			});
	},
});

export default historySlice.reducer;
