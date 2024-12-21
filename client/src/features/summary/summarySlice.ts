import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	DailyMinsSummary,
	DailyMinsSummaryList,
	RangeSummary,
	WeeklyTotals,
} from "./types";
import {
	fetchDailyMinsSummary,
	fetchWeeklyTotals,
	fetchRangeSummary,
	RangeSummaryResp,
	WeeklyTotalsResp,
	DailySummaryResp,
} from "./operations";
import { TStatus } from "../types";
import { RootState } from "../../store/store";
import { endOfWeek, startOfWeek } from "date-fns";
import { formatDate } from "../../utils/utils_dates";

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
	rangeSummary: {
		status: TStatus;
		startDate: string;
		endDate: string;
		perDay: DailyMinsSummaryList;
		summary: RangeSummary;
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
	rangeSummary: {
		startDate: formatDate(startOfWeek(new Date()), "db"), // 2024-12-23
		endDate: formatDate(endOfWeek(new Date()), "db"), // 2024-12-30
		perDay: [],
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

		// Get Range Summary (totals & per day mins list)
		builder
			.addCase(fetchRangeSummary.pending, (state: SummarySlice) => {
				state.rangeSummary.status = "PENDING";
			})
			.addCase(
				fetchRangeSummary.fulfilled,
				(state: SummarySlice, action: PayloadAction<RangeSummaryResp>) => {
					state.rangeSummary.status = "FULFILLED";
					state.rangeSummary.summary = action.payload.rangeSummary;
					state.rangeSummary.perDay = action.payload.perDay;
					state.rangeSummary.startDate = action.payload.dateRange.startDate;
					state.rangeSummary.endDate = action.payload.dateRange.endDate;
				}
			);
	},
});

// RANGE SUMMARY SELECTORS
export const selectRangeSummaryDateRange = (state: RootState) => {
	return {
		startDate: state.summary.rangeSummary.startDate,
		endDate: state.summary.rangeSummary.endDate,
	};
};
export const selectRangeSummary = (state: RootState) => {
	return state.summary.rangeSummary;
};
export const selectRangeSummaryData = (state: RootState) => {
	return state.summary.rangeSummary.summary;
};
export const selectRangeSummaryList = (state: RootState) => {
	return state.summary.rangeSummary.perDay;
};
export const selectIsLoadingRangeSummary = (state: RootState) => {
	return state.summary.rangeSummary.status === "PENDING";
};

// DAILY & WEEKLY SUMMARY SELECTORS
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
