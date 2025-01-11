import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	getWorkoutHistory,
	getWorkoutLogs,
	saveWorkoutLog,
} from "../../utils/utils_workoutLogs";
import { CreateLogValues } from "../../components/workout-logs/types";
import { AwaitedResponse } from "../types";
import { HistoryEntry, WorkoutLogEntry } from "./types";

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
	workoutTypeID?: number;
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

const getWorkoutLogRecords = createAsyncThunk(
	"history/getWorkoutLogRecords",
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

const getWorkoutHistoryRecords = createAsyncThunk(
	"history/getWorkoutHistoryRecords",
	async (params: WorkoutLogParams) => {
		const { userID, range } = params;
		const response = (await getWorkoutHistory(
			userID,
			range
		)) as AwaitedResponse<{
			history: HistoryEntry[];
		}>;

		const data = response.Data;

		return data.history as HistoryEntry[];
	}
);

export { saveLogEntry, getWorkoutLogRecords, getWorkoutHistoryRecords };
