import type { Pool } from "pg";
import type { MinsSummaryDB, StreakDayDB } from "./types";

export interface CustomRange {
	startDate: string;
	endDate: string;
}

export interface RangeTotals {
	total_mins: number;
	total_reps: number;
	total_miles: number;
	total_steps: number;
	total_workouts: number;
	total_workout_types: number;
}
export interface RangeTotalsClient {
	totalMins: number;
	totalReps: number;
	totalMiles: number;
	totalSteps: number;
	totalWorkouts: number;
	totalWorkoutTypes: number;
}

class SummaryService {
	#db: Pool;
	constructor(db: Pool) {
		this.#db = db;
	}

	// Retrieves ALL mins for each day, grouped by day & summed
	// - Includes BOTH 'workout_logs' & 'workout_history' tables!
	async getDailyMins(
		userID: string,
		dateRange: CustomRange
	): Promise<MinsSummaryDB[] | unknown> {
		const { startDate, endDate } = dateRange;
		try {
			const query = `SELECT * FROM get_daily_mins_in_range_with_history(
        $1,
        $2,
        $3
      )`;
			const results = await this.#db.query(query, [userID, startDate, endDate]);
			const rows = results?.rows;

			return rows as MinsSummaryDB[];
		} catch (error) {
			return error;
		}
	}

	async getTotalsInRangeOLD(
		userID: string,
		dateRange: CustomRange
	): Promise<RangeTotals | unknown> {
		const { startDate, endDate } = dateRange;
		try {
			const query = `SELECT * FROM get_totals_in_range(
				$1,
				$2,
				$3
			)`;
			const results = await this.#db.query(query, [userID, startDate, endDate]);
			const rows = results?.rows;

			return rows as RangeTotals[];
		} catch (error) {
			return error;
		}
	}
	async getTotalsInRange(
		userID: string,
		dateRange: CustomRange
	): Promise<RangeTotals | unknown> {
		const { startDate, endDate } = dateRange;
		try {
			const query = `SELECT * FROM get_summary_range_totals(
				$1,
				$2,
				$3
			)`;
			const results = await this.#db.query(query, [userID, startDate, endDate]);
			const rows = results?.rows;

			return rows as RangeTotals[];
		} catch (error) {
			return error;
		}
	}

	async getWeeklyStreak(
		userID: string,
		dateRange: CustomRange
	): Promise<StreakDayDB[] | unknown> {
		const { startDate, endDate } = dateRange;
		try {
			const query = `SELECT * FROM get_workout_streak_for_week(
				$1,
				$2,
				$3
			)`;
			const results = await this.#db.query(query, [userID, startDate, endDate]);
			const rows = results?.rows;

			return rows;
		} catch (error) {
			return error;
		}
	}
}

export { SummaryService };
