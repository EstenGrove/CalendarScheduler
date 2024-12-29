import type {
	RangeTotals,
	RangeTotalsClient,
} from "../services/SummaryService";
import type {
	MinsSummaryClient,
	MinsSummaryDB,
	StreakDayClient,
	StreakDayDB,
} from "../services/types";

export interface SummaryDayDB {
	dailyMins: MinsSummaryDB[];
	rangeTotals: RangeTotals;
}

export interface SummaryWeekDB {
	dailyMins: MinsSummaryDB[];
	rangeTotals: RangeTotals[];
	weeklyStreak: StreakDayDB[];
}
export interface SummaryWeekClient {
	dailyMins: MinsSummaryClient[];
	rangeTotals: RangeTotalsClient;
	weeklyStreak: StreakDayClient[];
}

// Grouped datasets for 'by week' summary data
export interface SummaryByWeekDB {
	currentWeek: SummaryWeekDB;
	prevWeek: SummaryWeekDB;
}
export interface SummaryByWeekClient {
	currentWeek: SummaryWeekClient;
	prevWeek: SummaryWeekClient;
}
