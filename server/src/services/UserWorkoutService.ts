import type { Pool } from "pg";

export interface UserWorkoutPayload {
	workoutTypeID: number;
	name: string;
	desc: string;
	weight: number;
	reps: number;
	sets: number;
	mins: number;
}

/**
 * Creates a workout AND workout plan for a given user.
 */
class UserWorkoutService {
	#db: Pool;
	constructor(db: Pool) {
		this.#db = db;
	}

	// Creates workout, plan & user workout records
	async createWorkout(userID: string, values: UserWorkoutPayload) {
		const { workoutTypeID, name, desc, weight, reps, sets, mins } = values;
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
			const params = [
				userID,
				workoutTypeID,
				name,
				desc,
				weight,
				reps,
				sets,
				mins,
			];
			const results = await this.#db.query(query, params);
			const row = results?.rows?.[0];

			return row;
		} catch (error) {
			return error;
		}
	}
}

export { UserWorkoutService };
