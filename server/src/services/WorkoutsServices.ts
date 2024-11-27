import type { Pool } from "pg";

export interface NewWorkoutValues {
	planID: number;
	name: string;
	desc: string;
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
	async createRecurringWorkout(userID: string) {
		//
		//
	}
}

export { WorkoutsServices };
