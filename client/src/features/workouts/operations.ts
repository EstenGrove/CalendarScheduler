import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	createNewWorkout,
	CreateWorkoutResponse,
	getWorkouts,
	getWorkoutsByDate,
} from "../../utils/utils_workouts";
import {
	NewWorkoutAndPlan,
	NewWorkoutEvent,
} from "../../components/workouts/types";
import { AwaitedResponse } from "../types";
import { getWorkoutPlans } from "../../utils/utils_workoutPlans";
import { Workout, WorkoutPlan } from "./types";

export interface NewWorkoutPlanParams {
	userID: string;
	event: NewWorkoutEvent;
	workout: NewWorkoutAndPlan;
}

export interface UserRangeParams {
	userID: string;
	startDate: string;
	endDate: string;
}

export interface UserWorkoutsResp {
	workouts: Workout[];
}

export interface MarkAsDoneParams {
	userID: string;
	workoutIDs: number[];
	targetDate: string;
}

const createWorkoutWithPlan = createAsyncThunk(
	"workouts/createWorkoutWithPlan",
	async (params: NewWorkoutPlanParams) => {
		const { userID, event, workout } = params;
		const response = (await createNewWorkout(userID, {
			event,
			workout,
		})) as AwaitedResponse<CreateWorkoutResponse>;

		const data = response.Data as CreateWorkoutResponse;

		return data as CreateWorkoutResponse;
	}
);
const fetchWorkouts = createAsyncThunk(
	"workouts/fetchWorkouts",
	async (params: UserRangeParams) => {
		const { userID, startDate, endDate } = params;
		const response = (await getWorkouts(userID, {
			startDate,
			endDate,
		})) as AwaitedResponse<UserWorkoutsResp>;

		const data = response.Data as UserWorkoutsResp;

		return data as UserWorkoutsResp;
	}
);
const fetchWorkoutsByDate = createAsyncThunk(
	"workouts/fetchWorkoutsByDate",
	async (params: UserRangeParams) => {
		const { userID, startDate, endDate } = params;
		const response = (await getWorkoutsByDate(userID, {
			startDate,
			endDate,
		})) as AwaitedResponse<UserWorkoutsResp>;

		const data = response.Data as UserWorkoutsResp;

		return data as UserWorkoutsResp;
	}
);
const fetchWorkoutPlans = createAsyncThunk(
	"workouts/fetchWorkoutPlans",
	async (params: UserRangeParams) => {
		const { userID, startDate, endDate } = params;
		const response = (await getWorkoutPlans(userID, {
			startDate,
			endDate,
		})) as AwaitedResponse<{ workoutPlans: WorkoutPlan[] }>;

		const data = response.Data as { workoutPlans: WorkoutPlan[] };

		return data as { workoutPlans: WorkoutPlan[] };
	}
);
const markWorkoutAsComplete = createAsyncThunk(
	"workouts/markWorkoutAsComplete",
	async (params) => {
		const { userID, workoutIDs, targetDate } = params;
		//
	}
);

export {
	createWorkoutWithPlan,
	fetchWorkoutPlans,
	fetchWorkouts,
	fetchWorkoutsByDate,
	markWorkoutAsComplete,
};
