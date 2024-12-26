import { endOfWeek, startOfWeek, subWeeks } from "date-fns";
import { summaryService } from "../services";

export interface SummaryArgs {
	startDate: string;
	endDate: string;
}

const getSummaryWeekData = async (userID: string, params: SummaryArgs) => {
	// target week range (start/end)
	const weekStart = startOfWeek(params.startDate);
	const weekEnd = endOfWeek(params.endDate);

	// prev week range (start/end)
	const prevWeekStart = startOfWeek(subWeeks(weekStart, 1));
	const prevWeekEnd = endOfWeek(prevWeekStart);

	// current week data
	const weekTotals = await summaryService.getTotalsInRange(userID, {
		startDate: weekStart.toString(),
		endDate: weekEnd.toString(),
	});
	const weeklyMins = await summaryService.getDailyMins(userID, {
		startDate: weekStart.toString(),
		endDate: weekEnd.toString(),
	});

	// prev week data
	const prevWeekTotals = await summaryService.getTotalsInRange(userID, {
		startDate: prevWeekStart.toString(),
		endDate: prevWeekEnd.toString(),
	});
	const prevWeeklyMins = await summaryService.getDailyMins(userID, {
		startDate: prevWeekStart.toString(),
		endDate: prevWeekEnd.toString(),
	});

	const weekData = await getSummaryWeek(userID, {
		startDate: weekStart.toString(),
		endDate: weekEnd.toString(),
	});
	const prevData = await getSummaryWeek(userID, {
		startDate: weekStart.toString(),
		endDate: weekEnd.toString(),
	});
};

const getSummaryWeek = async (userID: string, params: SummaryArgs) => {
	try {
		const data = await Promise.all([
			summaryService.getDailyMins(userID, params),
			summaryService.getTotalsInRange(userID, params),
		]);
		return {
			dayTotals: data[0],
			rangeTotals: data[1],
		};
	} catch (error) {
		throw error;
	}
};
