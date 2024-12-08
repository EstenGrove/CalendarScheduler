import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	getDailyMinsSummary,
	getRangeSummary,
	getWeeklyTotals,
} from "../../utils/utils_summary";
import { AwaitedResponse } from "../types";
import {
	DailyMinsSummary,
	DailyMinsSummaryList,
	RangeSummary,
	WeeklyTotals,
} from "./types";

export type SummaryParams = {
	userID: string;
	startDate: string;
	endDate: string;
};

export interface DailySummaryResp {
	summary: DailyMinsSummaryList;
	summaryByDay: DailyMinsSummary;
}

export interface WeeklyTotalsResp {
	weeklySummary: WeeklyTotals;
}

export interface RangeSummaryResp {
	perDay: DailyMinsSummaryList;
	rangeSummary: RangeSummary;
}

const fetchDailyMinsSummary = createAsyncThunk(
	"summary/fetchDailyMinsSummary",
	async (params: SummaryParams) => {
		const { userID, startDate, endDate } = params;
		const response = (await getDailyMinsSummary(userID, {
			startDate,
			endDate,
		})) as AwaitedResponse<DailySummaryResp>;

		const data = response.Data as DailySummaryResp;

		return data as DailySummaryResp;
	}
);

const fetchWeeklyTotals = createAsyncThunk(
	"summary/fetchWeeklyTotals",
	async (params: SummaryParams) => {
		const { userID, startDate, endDate } = params;
		const response = (await getWeeklyTotals(userID, {
			startDate,
			endDate,
		})) as AwaitedResponse<WeeklyTotalsResp>;

		const data = response.Data as WeeklyTotalsResp;

		return data as WeeklyTotalsResp;
	}
);
const fetchRangeSummary = createAsyncThunk(
	"summary/fetchRangeSummary",
	async (params: SummaryParams) => {
		const { userID, startDate, endDate } = params;
		const response = (await getRangeSummary(userID, {
			startDate,
			endDate,
		})) as AwaitedResponse<RangeSummaryResp>;

		const data = response.Data as RangeSummaryResp;

		return data as RangeSummaryResp;
	}
);

export { fetchDailyMinsSummary, fetchWeeklyTotals, fetchRangeSummary };
