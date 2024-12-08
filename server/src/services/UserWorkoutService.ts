import type { Pool } from "pg";
import type {
	UserWorkoutDB,
	UserWorkoutEventDB,
	UserWorkoutPlanDB,
} from "./types";

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

	async getWorkoutEventsByDate(
		userID: string,
		date: Date | string
	): Promise<UserWorkoutEventDB[] | unknown> {
		try {
			const query = `SELECT * FROM get_workouts_by_date(
				$1,
				$2
			)`;
			const results = await this.#db.query(query, [userID, date]);
			const rows = results?.rows as UserWorkoutEventDB[];

			return rows as UserWorkoutEventDB[];
		} catch (error) {
			return error;
		}
	}

	async getWorkoutsByDate(
		userID: string,
		date: Date | string
	): Promise<UserWorkoutEventDB[] | unknown> {
		try {
			const query = `SELECT * FROM get_workouts_by_date(
				$1,
				$2
			)`;
			const results = await this.#db.query(query, [userID, date]);
			const rows = results?.rows as UserWorkoutEventDB[];

			return rows as UserWorkoutEventDB[];
		} catch (error) {
			return error;
		}
	}

	async getUserWorkouts(
		userID: string,
		isActive: boolean = true
	): Promise<UserWorkoutDB[] | unknown> {
		try {
			const query = `SELECT * FROM get_user_workouts(
				$1,
				$2
			)`;
			const results = await this.#db.query(query, [userID, isActive]);
			const rows = results?.rows as UserWorkoutDB[];

			return rows as UserWorkoutDB[];
		} catch (error) {
			return error;
		}
	}
	async getUserWorkoutPlans(
		userID: string,
		isActive: boolean = true
	): Promise<UserWorkoutPlanDB[] | unknown> {
		try {
			const query = `SELECT * FROM get_user_workout_plans(
				$1,
				$2
			)`;
			const results = await this.#db.query(query, [userID, isActive]);
			const rows = results?.rows as UserWorkoutPlanDB[];

			return rows as UserWorkoutPlanDB[];
		} catch (error) {
			return error;
		}
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
