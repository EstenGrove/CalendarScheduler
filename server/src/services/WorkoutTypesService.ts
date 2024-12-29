import type { Pool } from "pg";

export interface NewWorkoutTypeValues {
	name: string;
	desc: string;
	units: "lbs." | "steps" | "miles" | string | null;
}

class WorkoutTypesService {
	#db: Pool;
	constructor(db: Pool) {
		this.#db = db;
	}

	async createNewType(userID: string, entry: NewWorkoutTypeValues) {
		const { name, desc, units = null } = entry;
		try {
			const query = `SELECT * FROM create_workout_type(
        $1,
        $2,
        $3,
        $4
      )`;
			const results = await this.#db.query(query, [userID, name, desc, units]);
			const row = results?.rows?.[0];

			return row;
		} catch (error) {
			return error;
		}
	}
	async getAllTypes() {
		try {
			const query = `SELECT * FROM workout_types WHERE is_active = true`;
			const results = await this.#db.query(query);
			const rows = results?.rows;

			return rows;
		} catch (error) {
			return error;
		}
	}
}

export { WorkoutTypesService };
