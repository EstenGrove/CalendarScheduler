import { createAsyncThunk } from "@reduxjs/toolkit";
import { getWorkoutTypes } from "../../utils/utils_workoutTypes";
import { AwaitedResponse } from "../types";
import { WorkoutType } from "../../utils/utils_workoutPlans";

export interface WorkoutTypeResp {
	workoutTypes: WorkoutType[];
}

const fetchWorkoutTypes = createAsyncThunk(
	"workoutTypes/fetchWorkoutTypes",
	async (userID: string) => {
		const response = (await getWorkoutTypes(
			userID
		)) as AwaitedResponse<WorkoutTypeResp>;
		const data = response.Data;

		return data.workoutTypes as WorkoutType[];
	}
);

export { fetchWorkoutTypes };
