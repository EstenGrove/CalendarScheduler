import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	cancelWorkoutForDate,
	CancelWorkoutParams,
	createNewWorkout,
	createQuickNewWorkout,
	CreateWorkoutResponse,
	getWorkouts,
	getWorkoutsByDate,
	markWorkoutAsComplete,
	QuickWorkoutPayload,
	QuickWorkoutResponse,
} from "../../utils/utils_workouts";
import {
	NewWorkoutAndPlan,
	NewWorkoutEvent,
} from "../../components/workouts/types";
import { AwaitedResponse } from "../types";
import { getWorkoutPlans } from "../../utils/utils_workoutPlans";
import { UserWorkout, WorkoutPlan } from "./types";

export interface NewWorkoutPlanParams {
	userID: string;
	event: NewWorkoutEvent;
	workout: NewWorkoutAndPlan;
}
export interface CreateQuickWorkoutParams {
	userID: string;
	workout: QuickWorkoutPayload;
}

export interface UserRangeParams {
	userID: string;
	startDate: string;
	endDate: string;
}
export interface UserDateParams {
	userID: string;
	targetDate: string;
}

export interface UserWorkoutEntry {
	workoutID: number;
	scheduleID: number;
	eventID: number;
	startTime: string;
	endTime: string;
	tag_color: string | null;
	workoutType: string;
	name: string;
	desc: string;
	weight: number;
	mins: number;
	reps: number;
	sets: number;
	miles: number;
	steps: number;
	createdDate: string;
}
export interface UserWorkoutsResp {
	workouts: UserWorkout[];
}

export interface MarkAsDoneBatchParams {
	workoutIDs: number[];
	workoutDate: string;
}
export interface MarkAsDoneParams {
	userID: string;
	updatedWorkout: UserWorkout;
	workoutDate: string;
}
export interface MarkAsParams {
	updatedWorkout: UserWorkout;
	workoutDate: string;
}

export interface MarkWorkoutDoneParams {
	userID: string;
	workoutID: number;
	workoutDate: string;
	startTime: string;
	endTime: string;
	isCompleted: boolean;
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
const markWorkoutAsDone = createAsyncThunk(
	"workouts/markWorkoutAsDone",
	async (params: MarkWorkoutDoneParams) => {
		const { userID, workoutID, workoutDate, startTime, endTime, isCompleted } =
			params;
		const response = (await markWorkoutAsComplete(userID, {
			workoutID,
			workoutDate,
			startTime,
			endTime,
			isCompleted,
		})) as AwaitedResponse<{ updatedWorkout: UserWorkout }>;

		const data = response.Data;
		const updated = data.updatedWorkout as UserWorkout;

		console.log("Status:", updated.workoutStatus);

		return updated as UserWorkout;
	}
);
const cancelWorkoutByDate = createAsyncThunk(
	"workouts/cancelWorkoutByDate",
	async (params: CancelWorkoutParams) => {
		const {
			userID,
			workoutID,
			workoutDate,
			cancelReason = "Not available",
		} = params;
		const response = (await cancelWorkoutForDate(userID, {
			userID: userID,
			workoutID: workoutID,
			workoutDate: workoutDate,
			cancelReason: cancelReason,
		})) as AwaitedResponse<{ cancelledWorkout: UserWorkout }>;
		const data = response.Data;
		console.log("response", response);

		return data.cancelledWorkout as UserWorkout;
	}
);
const createQuickWorkout = createAsyncThunk(
	"workouts/createQuickWorkout",
	async (params: CreateQuickWorkoutParams) => {
		const { userID, workout } = params;
		const response = (await createQuickNewWorkout(
			userID,
			workout
		)) as AwaitedResponse<QuickWorkoutResponse>;
		const data = response.Data;

		return data as QuickWorkoutResponse;
	}
);

export {
	createQuickWorkout,
	createWorkoutWithPlan,
	fetchWorkoutPlans,
	fetchWorkouts,
	fetchWorkoutsByDate,
	markWorkoutAsDone,
	cancelWorkoutByDate,
};
