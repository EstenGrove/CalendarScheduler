import type { Pool } from "pg";
import type { NewWorkoutPlanPayload, WorkoutPlanClient } from "./types";

class WorkoutPlansService {
	#db: Pool;
	constructor(db: Pool) {
		this.#db = db;
	}

	async createPlan(userID: string, plan: NewWorkoutPlanPayload) {
		const { workoutTypeID: id, name, desc, weight, reps, sets, mins } = plan;
		try {
			const query = `
				INSERT INTO workout_plans (
					workout_type_id,
					plan_name,
					plan_desc,
					target_weight,
					target_reps,
					target_sets,
					target_mins
				) VALUES (
					$1,
					$2,
					$3,
					$4,
					$5,
					$6,
					$7
				) RETURNING *;
			`;
			const params = [id, name, desc, weight, reps, sets, mins];
			const results = await this.#db.query(query, params);
			const row = results?.rows?.[0];
			console.log("row", row);
			return row;
		} catch (error) {
			return error;
		}
	}
}

export { WorkoutPlansService };
