import type { Pool } from "pg";
import type { RecurringWorkoutAndPlanPayload } from "./types";

export interface NewWorkoutValues {
	planID: number;
	name: string;
	desc: string;
}

export interface WorkoutAndPlanValues {
	typeID: number;
	name: string;
	desc: string;
	weight: number;
	reps: number;
	sets: number;
	mins: number;
	steps?: number;
	miles?: number;
}

class WorkoutsServices {
	#db: Pool;
	constructor(db: Pool) {
		this.#db = db;
	}

	async createWorkout(userID: string, values: NewWorkoutValues) {
		const { planID, name, desc } = values;
		try {
			const query = `
      INSERT INTO workouts (
        plan_id,
        workout_name,
        workout_desc
      ) VALUES (
        $1,
        $2,
        $3
      ) RETURNING *;
      `;
			const results = await this.#db.query(query, [planID, name, desc]);
			const row = results?.rows[0];
			console.log("row", row);
			return row;
		} catch (error) {
			return error;
		}
	}
	// creates, workout, plan & user-workout records
	async createNewWorkout(userID: string, values: WorkoutAndPlanValues) {
		const { typeID, name, desc, weight, reps, sets, mins, steps, miles } =
			values;
		try {
			const query = `SELECT * FROM create_workout(
				$1,
				$2,
				$3,
				$4,
				$5,
				$6,
				$7,
				$8
			)`;
			const params = [userID, typeID, name, desc, weight, reps, sets, mins];
			const results = await this.#db.query(query, params);
			const row = results?.rows?.[0];

			return row;
		} catch (error) {
			return error;
		}
	}

	async createRecurringWorkout(
		userID: string,
		values: RecurringWorkoutAndPlanPayload
	) {
		const { newEvent, newWorkout } = values;
		const {
			title,
			desc,
			startDate,
			endDate,
			frequency,
			interval,
			byDay,
			byMonth,
			byMonthDay,
			startTime,
			endTime,
		} = newEvent;
		const { workoutTypeID, weight, reps, sets, mins } = newWorkout;
		const workoutVals = [
			userID,
			workoutTypeID,
			title,
			desc,
			weight,
			reps,
			sets,
			mins,
		];
		const eventVals = [
			startDate,
			endDate,
			frequency,
			interval,
			byDay,
			byMonth,
			byMonthDay,
			startTime,
			endTime,
		];

		try {
			const query = `SELECT * FROM create_recurring_workout(
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
				$11,
				$12,
				$13,
				$14,
				$15,
				$16,
				$17
			)`;
			const params = [...workoutVals, ...eventVals];
			const results = await this.#db.query(query, params);
			const rows = results?.rows;
			console.log("results", results);
			console.log("rows", rows);
			return rows;
		} catch (error) {
			return error;
		}
	}
}

export { WorkoutsServices };
