import { createAsyncThunk } from "@reduxjs/toolkit";
import { getWorkoutLogs, saveWorkoutLog } from "../../utils/utils_workoutLogs";
import { CreateLogValues } from "../../components/workout-logs/types";
import { AwaitedResponse } from "../types";
import { WorkoutLogEntry } from "./types";

export interface NewLogValues extends CreateLogValues {
	workoutTypeID: number;
}

export interface NewLogParams {
	userID: string;
	workoutLog: NewLogValues;
}
export interface LogRange {
	start: string;
	end: string;
}
export interface WorkoutLogParams {
	userID: string;
	range: LogRange;
}

// Saves a new log entry
const saveLogEntry = createAsyncThunk(
	"history/saveLogEntry",
	async (params: NewLogParams) => {
		const { userID, workoutLog } = params;
		const response = await saveWorkoutLog(userID, workoutLog);

		const data = response.Data;

		return data;
	}
);

const getWorkoutHistory = createAsyncThunk(
	"history/getWorkoutHistory",
	async (params: WorkoutLogParams) => {
		const { userID, range } = params;
		const response = (await getWorkoutLogs(userID, range)) as AwaitedResponse<{
			history: object[];
			logs: WorkoutLogEntry[];
		}>;

		const data = response.Data;

		return data as { history: object[]; logs: WorkoutLogEntry[] };
	}
);

export { saveLogEntry, getWorkoutHistory };
