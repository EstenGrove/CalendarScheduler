import { WeeklyTotalsResp } from "../features/summary/operations";
import {
	CustomDateRange,
	DailyMinsSummaryList,
} from "../features/summary/types";
import { AsyncResponse } from "../features/types";
import { currentEnv, summaryApis } from "./utils_env";

const getDailyMinsSummary = async (
	userID: string,
	dateRange: CustomDateRange
): AsyncResponse<{ summary: DailyMinsSummaryList }> => {
	const { startDate, endDate } = dateRange;
	let url = currentEnv.base + summaryApis.getDailyMins;
	url += "?" + new URLSearchParams({ userID });
	url += "&" + new URLSearchParams({ startDate, endDate });

	try {
		const request = await fetch(url);
		const response = await request.json();

		return response as AsyncResponse<{ summary: DailyMinsSummaryList }>;
	} catch (error) {
		return error;
	}
};

const getWeeklyTotals = async (userID: string, dateRange: CustomDateRange) => {
	const { startDate, endDate } = dateRange;
	let url = currentEnv.base + summaryApis.getWeeklyTotals;
	url += "?" + new URLSearchParams({ userID });
	url += "&" + new URLSearchParams({ startDate, endDate });

	try {
		const request = await fetch(url);
		const response = await request.json();

		return response as AsyncResponse<WeeklyTotalsResp>;
	} catch (error) {
		return error;
	}
};

export { getDailyMinsSummary, getWeeklyTotals };
