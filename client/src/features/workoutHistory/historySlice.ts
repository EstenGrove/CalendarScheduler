import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	getWorkoutHistoryRecords,
	getWorkoutLogRecords,
	saveLogEntry,
} from "./operations";
import { TStatus } from "../types";
import { WorkoutType } from "../../utils/utils_workoutPlans";
import { HistoryEntry, WorkoutLogEntry } from "./types";
import { RootState } from "../../store/store";
import { sortWorkoutLogsBy } from "../../utils/utils_workoutLogs";

export interface HistorySlice {
	status: TStatus;
	workoutTypes: WorkoutType[];
	// workoutHistory: WorkoutHistoryEntry[];
	workoutHistory: HistoryEntry[];
	workoutLogs: WorkoutLogEntry[];
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

		// get logs records
		builder
			.addCase(getWorkoutLogRecords.pending, (state: HistorySlice) => {
				state.status = "PENDING";
			})
			.addCase(
				getWorkoutLogRecords.fulfilled,
				(
					state: HistorySlice,
					action: PayloadAction<{ history: object[]; logs: WorkoutLogEntry[] }>
				) => {
					const { logs } = action.payload;
					const sortedByDate = sortWorkoutLogsBy(logs, "workoutDate:DESC");
					state.status = "FULFILLED";
					state.workoutLogs = sortedByDate;
				}
			);
		// get history records
		builder
			.addCase(getWorkoutHistoryRecords.pending, (state: HistorySlice) => {
				state.status = "PENDING";
			})
			.addCase(
				getWorkoutHistoryRecords.fulfilled,
				(state: HistorySlice, action: PayloadAction<HistoryEntry[]>) => {
					state.status = "FULFILLED";
					state.workoutHistory = action.payload;
				}
			);
	},
});

export const selectWorkoutLogs = (state: RootState) => {
	return state.history.workoutLogs;
};
export const selectWorkoutHistory = (state: RootState) => {
	return state.history.workoutHistory;
};
export const selectHistoryStatus = (state: RootState) => {
	return state.history.status;
};
export const selectIsHistoryLoading = (state: RootState) => {
	return state.history.status === "PENDING";
};

export default historySlice.reducer;
