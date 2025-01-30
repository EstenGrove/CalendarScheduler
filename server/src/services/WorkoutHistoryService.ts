import type { Pool } from "pg";
import type {
	CreateHistoryEntryValues,
	CreateLogValues,
	MarkHistoryEntryValues,
	WorkoutLogClient,
	WorkoutLogDB,
} from "./types";

export interface LogRange {
	startDate: string;
	endDate: string;
}

class WorkoutHistoryService {
	#db: Pool;
	constructor(db: Pool) {
		this.#db = db;
	}

	async createHistoryEntry(userID: string, entry: CreateHistoryEntryValues) {
		//
	}
	async editHistoryEntry(userID: string, entry: CreateHistoryEntryValues) {
		//
	}
	async markHistoryEntry(userID: string, entry: MarkHistoryEntryValues) {
		//
	}
	async createLog(userID: string, log: CreateLogValues) {
		const {
			workoutTypeID,
			date,
			mins,
			weight,
			reps,
			sets,
			miles,
			steps,
			startTime,
			endTime,
		} = log;

		console.log("startTime", startTime);
		console.log("endTime", endTime);

		try {
			const query = `
        INSERT INTO workout_log (
          workout_type_id,
          workout_date,
          weight,
          reps,
          sets,
          miles,
          steps,
          start_time,
          end_time,
          workout_mins,
					user_id
        ) VALUES (
          $1,
          $2,
          $3, 
          $4, 
          $5, 
          $6, 
          $7, 
          $8, 
          $9,
          $10,
					$11 
        ) RETURNING *;
        `;
			const params = [
				workoutTypeID,
				date,
				weight,
				reps,
				sets,
				miles,
				steps,
				startTime,
				endTime,
				mins,
				userID,
			];
			const result = await this.#db.query(query, params);
			const row = result?.rows?.[0];
			console.log("result", result);
			console.log("row", row);
			return row;
		} catch (error) {
			return error;
		}
	}
	async createWeightLog(userID: string, log: CreateLogValues) {
		const {
			workoutTypeID,
			date,
			mins,
			weight,
			reps,
			sets,
			startTime,
			endTime,
		} = log;
		try {
			const query = `
        INSERT INTO workout_log (
          workout_type_id,
          workout_date,
          weight,
          reps,
          sets,
          start_time,
          end_time,
          workout_mins
        ) VALUES (
          $1,
          $2,
          $3, 
          $4, 
          $5, 
          $6, 
          $7,
          $8 
        ) RETURNING *;
        `;
			const params = [
				workoutTypeID,
				date,
				weight,
				reps,
				sets,
				startTime,
				endTime,
				mins,
			];
			const result = await this.#db.query(query, params);
			const row = result?.rows?.[0];
			console.log("result", result);
			console.log("row", row);
			return row;
		} catch (error) {
			return error;
		}
	}
	async getWorkoutLogs(
		userID: string,
		range: LogRange
	): Promise<WorkoutLogDB[] | unknown> {
		const { startDate, endDate } = range;

		try {
			const query = `SELECT * FROM get_user_workout_history(
				$1,
				$2,
				$3
			)`;
			const results = await this.#db.query(query, [userID, startDate, endDate]);
			const rows = results?.rows;
			console.log("rows", rows);
			return rows;
		} catch (error) {
			return error;
		}
	}
	async getWorkoutHistory(userID: string, range: LogRange) {
		const { startDate, endDate } = range;

		try {
			const query = `SELECT * FROM get_user_workout_scheduled_history(
				$1,
				$2,
				$3
			)`;
			const results = await this.#db.query(query, [userID, startDate, endDate]);
			const rows = results?.rows;
			console.log("rows", rows);
			return rows;
		} catch (error) {}
	}
}

export { WorkoutHistoryService };
