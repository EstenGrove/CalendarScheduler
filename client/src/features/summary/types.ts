export interface CustomDateRange {
	startDate: string;
	endDate: string;
}

export type WeekDay =
	| "Sunday"
	| "Monday"
	| "Tuesday"
	| "Wednesday"
	| "Thursday"
	| "Friday"
	| "Saturday";

export interface DailyMins {
	date: string;
	totalMins: number;
	weekday: WeekDay;
	logCount: number;
}

export type DailyMinsSummaryList = DailyMins[];

export type DailyMinsSummary = {
	[key in WeekDay]: DailyMins;
};

export interface WeeklyTotals {
	totalMins: number;
	totalReps: number;
	totalMiles: number;
	totalSteps: number;
	totalNumOfWorkouts: number;
	totalNumOfWorkoutTypes: number;
}

export interface RangeSummary {
	totalMins: number;
	totalReps: number;
	totalMiles: number;
	totalSteps: number;
	totalNumOfWorkouts: number;
	totalNumOfWorkoutTypes: number;
}

export interface StreakItem {
	day: Date | string;
	isCompleted: boolean | null;
}
export interface SummaryWeekData {
	currentWeek: {
		totalMins: number;
		totalReps: number;
		totalSteps: number;
		totalMiles: number;
		totalNumOfWorkouts: number;
		totalNumOfWorkoutTypes: number;
		dayTotals: RangeSummary[];
		streak: StreakItem[];
	};
	prevWeek: {
		totalMins: number;
		totalReps: number;
		totalSteps: number;
		totalMiles: number;
		totalNumOfWorkouts: number;
		totalNumOfWorkoutTypes: number;
		dayTotals: RangeSummary[];
		streak: StreakItem[];
	};
}
