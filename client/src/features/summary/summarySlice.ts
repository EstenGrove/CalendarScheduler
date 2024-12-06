import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DailyMinsSummary, DailyMinsSummaryList, WeeklyTotals } from "./types";
import {
	DailySummaryResp,
	fetchDailyMinsSummary,
	fetchWeeklyTotals,
	WeeklyTotalsResp,
} from "./operations";
import { TStatus } from "../types";
import { RootState } from "../../store/store";

export interface SummarySlice {
	status: TStatus;
	dailyMins: {
		status: TStatus;
		summary: DailyMinsSummary | null; // object grouped by week day
		list: DailyMinsSummaryList | null; // raw list data records
	};
	dailyWorkouts: {
		status: TStatus;
		summary: object | null; // grouped by workout type
		list: object[] | null; // raw list data records
	};
	weeklySummary: {
		summary: WeeklyTotals;
		status: TStatus;
	};
}

const initialState: SummarySlice = {
	status: "IDLE",
	dailyMins: {
		status: "IDLE",
		summary: null,
		list: [],
	},
	dailyWorkouts: {
		status: "IDLE",
		summary: null,
		list: [],
	},
	weeklySummary: {
		summary: {
			totalMins: 0,
			totalReps: 0,
			totalMiles: 0,
			totalSteps: 0,
			totalNumOfWorkouts: 0,
			totalNumOfWorkoutTypes: 0,
		},
		status: "IDLE",
	},
};

const summarySlice = createSlice({
	name: "summary",
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		// Get Daily Minutes Summary
		builder
			.addCase(fetchDailyMinsSummary.pending, (state: SummarySlice) => {
				state.dailyMins.status = "PENDING";
			})
			.addCase(
				fetchDailyMinsSummary.fulfilled,
				(state: SummarySlice, action: PayloadAction<DailySummaryResp>) => {
					state.dailyMins.status = "FULFILLED";
					state.dailyMins.list = action.payload.summary;
					state.dailyMins.summary = action.payload.summaryByDay;
				}
			);
		// Get Weekly Totals (mins)
		builder
			.addCase(fetchWeeklyTotals.pending, (state: SummarySlice) => {
				state.weeklySummary.status = "PENDING";
			})
			.addCase(
				fetchWeeklyTotals.fulfilled,
				(state: SummarySlice, action: PayloadAction<WeeklyTotalsResp>) => {
					state.weeklySummary.status = "FULFILLED";
					state.weeklySummary.summary = action.payload.weeklySummary;
				}
			);
	},
});

export const selectIsLoadingMins = (state: RootState): boolean => {
	return state.summary.dailyMins.status === "PENDING";
};

export const selectDailySummary = (state: RootState) => {
	return state.summary.dailyMins;
};

export const selectWeeklySummary = (state: RootState) => {
	return state.summary.weeklySummary.summary;
};

export default summarySlice.reducer;
