import { subDays } from "date-fns";
import { WeeklyTotalsResp } from "../features/summary/operations";
import {
	CustomDateRange,
	DailyMinsSummaryList,
} from "../features/summary/types";
import { AsyncResponse } from "../features/types";
import { currentEnv, summaryApis } from "./utils_env";
import { formatDate } from "./utils_dates";

export interface DiffDay {
	value: number;
	date: Date | string;
}

export interface TwoWeekRanges {
	currentWeek: CustomDateRange;
	prevWeek: CustomDateRange;
}

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

const getRangeSummary = async (userID: string, dateRange: CustomDateRange) => {
	const { startDate, endDate } = dateRange;
	let url = currentEnv.base + summaryApis.getRangeSummary;
	url += "?" + new URLSearchParams({ userID });
	url += "&" + new URLSearchParams({ startDate, endDate });

	try {
		const request = await fetch(url);
		const response = await request.json();

		return response;
	} catch (error) {
		return error;
	}
};
const getSummaryByDay = async (userID: string, dateRange: CustomDateRange) => {
	const { startDate, endDate } = dateRange;
	let url = currentEnv.base + summaryApis.getSummaryByDay;
	url += "?" + new URLSearchParams({ userID });
	url += "&" + new URLSearchParams({ startDate, endDate });

	try {
		const request = await fetch(url);
		const response = await request.json();

		return response;
	} catch (error) {
		return error;
	}
};
const getSummaryByWeek = async (userID: string, ranges: TwoWeekRanges) => {
	const { currentWeek, prevWeek } = ranges;
	let url = currentEnv.base + summaryApis.getSummaryByWeek;
	url += "?" + new URLSearchParams({ userID });
	url +=
		"&" +
		new URLSearchParams({
			curWeekStart: currentWeek.startDate,
			curWeekEnd: currentWeek.endDate,
		});
	url +=
		"&" +
		new URLSearchParams({
			prevWeekStart: prevWeek.startDate,
			prevWeekEnd: prevWeek.endDate,
		});

	try {
		const request = await fetch(url);
		const response = await request.json();

		return response;
	} catch (error) {
		return error;
	}
};
const getSummaryByMonth = async (
	userID: string,
	dateRange: CustomDateRange
) => {
	const { startDate, endDate } = dateRange;
	let url = currentEnv.base + summaryApis.getSummaryByMonth;
	url += "?" + new URLSearchParams({ userID });
	url += "&" + new URLSearchParams({ startDate, endDate });

	try {
		const request = await fetch(url);
		const response = await request.json();

		return response;
	} catch (error) {
		return error;
	}
};
const getSummaryByYear = async (userID: string, dateRange: CustomDateRange) => {
	const { startDate, endDate } = dateRange;
	let url = currentEnv.base + summaryApis.getSummaryByYear;
	url += "?" + new URLSearchParams({ userID });
	url += "&" + new URLSearchParams({ startDate, endDate });

	try {
		const request = await fetch(url);
		const response = await request.json();

		return response;
	} catch (error) {
		return error;
	}
};

// SUMMARY PARSING/PROCESSING UTILS
const prepareBarChartData = (summary: DailyMinsSummaryList): number[] => {
	if (!summary) return [];

	const data = summary.map((record) => {
		return record.totalMins;
	});

	return data;
};

const getDiffWeek = (base: Date | string) => {
	const start = subDays(base, 6);
	const end = base;

	return {
		startDate: start,
		endDate: end,
	};
};

// Calculatees week ranges from a base date
const getDiffWeekRangesFromBase = (base: Date | string = new Date()) => {
	const thisWeek = getDiffWeek(base);
	const lastWeek = getDiffWeek(thisWeek.startDate);

	return {
		currentWeek: {
			startDate: formatDate(thisWeek.startDate, "db"),
			endDate: formatDate(thisWeek.endDate, "db"),
		},
		prevWeek: {
			startDate: formatDate(lastWeek.startDate, "db"),
			endDate: formatDate(lastWeek.endDate, "db"),
		},
	};
};

export {
	getDailyMinsSummary,
	getWeeklyTotals,
	getRangeSummary,
	getSummaryByDay,
	getSummaryByWeek,
	getSummaryByMonth,
	getSummaryByYear,
	// utils
	prepareBarChartData,
	getDiffWeekRangesFromBase,
};
