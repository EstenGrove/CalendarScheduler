import type { Pool } from "pg";
import type {
	CancelledWorkoutDB,
	UserWorkoutByDateDB,
	UserWorkoutDB,
	UserWorkoutEventDB,
	UserWorkoutPlanDB,
	WorkoutCustomDB,
	WorkoutHistoryDB,
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

export interface CancelWorkoutPayload {
	workoutID: number;
	workoutDate: Date | string;
}

export interface MarkAsPayload {
	workoutID: number;
	workoutDate: string;
	startTime: string;
	endTime: string;
	isCompleted: boolean;
}

/**
 * Creates a workout AND workout plan for a given user.
 */
class UserWorkoutService {
	#db: Pool;
	constructor(db: Pool) {
		this.#db = db;
	}

	async getWorkoutByID(
		userID: string,
		workoutID: number
	): Promise<UserWorkoutDB | unknown> {
		try {
			const query = `SELECT * FROM workouts WHERE workout_id = $1`;
			const result = await this.#db.query(query, [workoutID]);
			const row = result?.rows?.[0];

			return row;
		} catch (error) {
			return error;
		}
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
	async getUserWorkoutsByDate(
		userID: string,
		date: Date | string
	): Promise<UserWorkoutByDateDB[] | unknown> {
		try {
			const query = `SELECT * FROM get_user_workouts_with_status_by_date(
				$1,
				$2
			)`;
			const results = await this.#db.query(query, [userID, date]);
			const rows = results?.rows;

			return rows as UserWorkoutByDateDB[];
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
	async getUserWorkoutsCustom(
		userID: string,
		workoutDate: Date | string
	): Promise<WorkoutCustomDB[] | unknown> {
		try {
			const query = `SELECT * FROM get_user_workouts_with_status_by_date(
				$1,
				$2
			)`;
			const results = await this.#db.query(query, [userID, workoutDate]);
			const rows = results?.rows as WorkoutCustomDB[];

			return rows as WorkoutCustomDB[];
		} catch (error) {
			return error;
		}
	}
	async getUserWorkoutByID(userID: string, workoutID: number) {}
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
	// Gets all workout plans for a given workoutID
	async getUserWorkoutDetailsByEventID(
		userID: string,
		eventID: number
	): Promise<UserWorkoutPlanDB[] | unknown> {
		try {
			const query = `SELECT * FROM get_workout_details_by_id(
				$1,
				$2
			)`;
			const results = await this.#db.query(query, [userID, eventID]);
			const rows = results?.rows || [];
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
	async editWorkout(userID: string, values: UserWorkoutPayload) {
		try {
			//
		} catch (error) {
			return error;
		}
	}
	async cancelWorkout(
		userID: string,
		params: CancelWorkoutPayload
	): Promise<CancelledWorkoutDB | unknown> {
		const { workoutID, workoutDate } = params;

		try {
			const query = `SELECT * FROM cancel_workout_instance(
				$1,
				$2,
				$3
			)`;
			const results = await this.#db.query(query, [
				userID,
				workoutID,
				workoutDate,
			]);
			const row = results?.rows?.[0];

			return row as CancelledWorkoutDB;
		} catch (error) {
			return error;
		}
	}

	async markWorkoutAsDone(
		userID: string,
		values: MarkAsPayload
	): Promise<WorkoutHistoryDB | unknown> {
		const { workoutID, workoutDate, startTime, endTime, isCompleted } = values;
		try {
			const query = `SELECT * FROM mark_workout_as_done(
				$1,
				$2,
				$3,
				$4,
				$5,
				$6
			)`;
			const result = await this.#db.query(query, [
				userID,
				workoutID,
				workoutDate,
				startTime,
				endTime,
				isCompleted,
			]);
			const row = result?.rows?.[0];

			return row;
		} catch (error) {
			return error;
		}
	}
	async deleteWorkout(userID: string, workoutID: number) {
		//
	}
	async deleteRecurringWorkout(userID: string, workoutID: number) {
		//
	}
}

export { UserWorkoutService };
