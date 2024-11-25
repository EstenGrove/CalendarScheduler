import { createAsyncThunk } from "@reduxjs/toolkit";
import { saveWorkoutLog } from "../../utils/utils_workoutLogs";
import { CreateLogValues } from "../../components/workout-logs/types";

export interface NewLogParams {
	userID: string;
	workoutLog: CreateLogValues;
}

const saveLogEntry = createAsyncThunk(
	"history/saveLogEntry",
	async (params: NewLogParams) => {
		const { userID, workoutLog } = params;
		const response = await saveWorkoutLog(userID, workoutLog);

		const data = response.Data;

		return data;
	}
);

export { saveLogEntry };
