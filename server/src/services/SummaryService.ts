import type { Pool } from "pg";
import type { MinsSummaryDB } from "./types";

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

class SummaryService {
	#db: Pool;
	constructor(db: Pool) {
		this.#db = db;
	}

	async getDailyMins(
		userID: string,
		dateRange: CustomRange
	): Promise<MinsSummaryDB[] | unknown> {
		const { startDate, endDate } = dateRange;
		try {
			const query = `SELECT * FROM get_daily_mins_for_range(
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

	async getTotalsInRange(
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
}

export { SummaryService };
