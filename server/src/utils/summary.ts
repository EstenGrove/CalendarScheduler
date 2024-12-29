import { endOfWeek, startOfWeek, subWeeks } from "date-fns";
import { summaryService } from "../services";
import type { RangeTotals } from "../services/SummaryService";
import type { MinsSummaryDB, StreakDayDB } from "../services/types";
import { formatDate } from "./dates";
import type { SummaryByWeekDB, SummaryDayDB, SummaryWeekDB } from "./types";

export interface SummaryArgs {
	startDate: string;
	endDate: string;
}

// Gets mins, totals & streak for a given week & the week prior
const getSummaryWeekData = async (
	userID: string,
	params: SummaryArgs
): Promise<SummaryByWeekDB | unknown> => {
	// target week range (start/end)
	const weekStart = params.startDate; // YYYY--MM-DD
	const weekEnd = params.endDate;
	// prev week range (start/end)
	const prevWeekStart = startOfWeek(subWeeks(weekStart, 1));
	const prevWeekEnd = endOfWeek(prevWeekStart);

	const prevStart = formatDate(prevWeekStart, "db");
	const prevEnd = formatDate(prevWeekEnd, "db");

	const weekData = await getSummaryWeek(userID, {
		startDate: weekStart,
		endDate: weekEnd,
	});
	const prevData = await getSummaryWeek(userID, {
		startDate: prevStart,
		endDate: prevEnd,
	});

	return {
		currentWeek: weekData,
		prevWeek: prevData,
	};
};
const getSummaryWeek = async (
	userID: string,
	params: SummaryArgs
): Promise<SummaryWeekDB | unknown> => {
	try {
		const [dailyMins, rangeTotals, weeklyStreak] = await Promise.all([
			summaryService.getDailyMins(userID, params),
			summaryService.getTotalsInRange(userID, params),
			summaryService.getWeeklyStreak(userID, params),
		]);
		return {
			dailyMins: dailyMins as MinsSummaryDB[],
			rangeTotals: rangeTotals as RangeTotals,
			weeklyStreak: weeklyStreak as StreakDayDB[],
		};
	} catch (error) {
		throw error;
	}
};

// Gets summary mins, totals
const getSummaryDay = async (
	userID: string,
	params: SummaryArgs
): Promise<SummaryDayDB | unknown> => {
	try {
		const [dailyMins, rangeTotals] = await Promise.all([
			summaryService.getDailyMins(userID, params),
			summaryService.getTotalsInRange(userID, params),
		]);

		return {
			dailyMins: dailyMins as MinsSummaryDB[],
			rangeTotals: rangeTotals as RangeTotals,
		};
	} catch (error) {
		return error;
	}
};

export { getSummaryWeek, getSummaryWeekData, getSummaryDay };
