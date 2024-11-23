import type { Pool } from "pg";
import type { WorkoutPlanClient } from "./types";

class WorkoutPlansService {
	#db: Pool;
	constructor(db: Pool) {
		this.#db = db;
	}

	async createPlan(userID: string, plan: WorkoutPlanClient) {
		//
		//
	}
}

export { WorkoutPlansService };
