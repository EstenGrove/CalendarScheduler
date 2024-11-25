import type { Pool } from "pg";
import type { CreateLogValues, WorkoutLogClient } from "./types";

class WorkoutHistoryService {
	#db: Pool;
	constructor(db: Pool) {
		this.#db = db;
	}

	async createLog(userID: string, log: CreateLogValues) {
		const {
			workoutTypeID,
			workoutDate,
			mins,
			weight,
			reps,
			sets,
			miles,
			steps,
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
          miles,
          steps,
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
          $8, 
          $9,
          $10 
        ) RETURNING *;
        `;
			const params = [
				workoutTypeID,
				workoutDate,
				weight,
				reps,
				sets,
				miles,
				steps,
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
	async createWeightLog(userID: string, log: WorkoutLogClient) {
		const {
			workoutTypeID,
			workoutDate,
			workoutMins,
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
				workoutDate,
				weight,
				reps,
				sets,
				startTime,
				endTime,
				workoutMins,
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
}

export { WorkoutHistoryService };
