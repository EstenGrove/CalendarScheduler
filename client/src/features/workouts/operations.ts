import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	createNewWorkout,
	CreateWorkoutResponse,
} from "../../utils/utils_workouts";
import {
	NewWorkoutAndPlan,
	NewWorkoutEvent,
} from "../../components/workouts/types";
import { AwaitedResponse } from "../types";

export interface NewWorkoutPlanParams {
	userID: string;
	event: NewWorkoutEvent;
	workout: NewWorkoutAndPlan;
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

export { createWorkoutWithPlan };
