import { AsyncResponse } from "../features/types";
import { currentEnv, historyApis } from "./utils_env";
import { WorkoutType, workoutTypes } from "./utils_workoutPlans";
import { CreateLogValues } from "../components/workout-logs/types";
import { WorkoutLogEntry } from "../features/workoutHistory/types";
import { WorkoutLogParams } from "../features/workoutHistory/operations";
import { applyTimeStrToDate } from "./utils_dates";
import { addMinutes } from "date-fns";

export type LogStep =
	| "Type"
	| "Reps"
	| "Steps"
	| "Length"
	| "Time"
	| "Summary"
	| "SUCCESS"
	| "FAILED"
	| null;

// Checks if workout type uses weights, like curls, dumbells etc
const isWeightedType = (type: string): boolean => {
	const record = workoutTypes.find(
		(entry) => entry.workoutType === type
	) as WorkoutType;

	return !!record && record.units === "lbs.";
};

// Checks if workout type is walking/running etc
const isWalkingType = (type: string): boolean => {
	const record = workoutTypes.find(
		(entry) => entry.workoutType === type
	) as WorkoutType;

	const hasStepsOrMiles = record.units === "steps" || record.units === "miles";

	return !!record && hasStepsOrMiles;
};

// Checks if workout type measures distance travelled, like distance run/walk etc.
const isDistanceType = (type: string): boolean => {
	const record = workoutTypes.find(
		(entry) => entry.workoutType === type
	) as WorkoutType;

	const hasMiles = record.units === "miles";

	return !!record && hasMiles;
};

// Checks if workout type measures distance travelled, like distance run/walk etc.
const isOtherType = (type: string): boolean => {
	const record = workoutTypes.find(
		(entry) => entry.workoutType === type
	) as WorkoutType;

	const hasOtherName = !!record && record.workoutType === "Other";
	const hasOtherUnit = !!record && record.units === "other";
	// yoga/stretching or other timed excercise
	const hasOtherLikeness = !!record && record.units === "other";

	return !!record && (hasOtherName || hasOtherUnit || hasOtherLikeness);
};

// Finds matching workout typeID from name, falls back to 'Other' type, if not found
const getWorkoutTypeIDFromName = (type: string): number => {
	const record = workoutTypes.find((entry) => entry.workoutType === type);

	const typeID: number = record?.workoutTypeID || 10;

	return typeID;
};

// SAVING WORKOUT LOGS

export interface TimeRange {
	startTime: Date;
	endTime: Date;
}
// Convert startTime (eg. '04:35 PM') to a real Date instance
// - Calculate the endTime from: 'startTime(Date)' + 'mins(number)' = 'endTime(Date)'
const prepareLogDates = (values: CreateLogValues): TimeRange => {
	const { startTime, mins, date } = values;
	const newStart = applyTimeStrToDate(startTime, date);
	const newEnd = addMinutes(newStart, mins);

	return {
		startTime: newStart,
		endTime: newEnd,
	};
};

const getWorkoutLogs = async (
	userID: string,
	range: WorkoutLogParams["range"]
): AsyncResponse<{ history: object[]; logs: WorkoutLogEntry[] }> => {
	const { start, end } = range;
	let url = currentEnv.base + historyApis.getLogs;
	url += "?" + new URLSearchParams({ userID });
	url += "&" + new URLSearchParams({ startDate: start, endDate: end });

	try {
		const request = await fetch(url);
		const response = await request.json();
		return response;
	} catch (error) {
		return error;
	}
};

const saveWorkoutLog = async (userID: string, workoutLog: CreateLogValues) => {
	const url = currentEnv.base + historyApis.createLog;

	try {
		const request = await fetch(url, {
			method: "POST",
			body: JSON.stringify({ userID, workoutLog }),
		});
		const response = await request.json();
		return response;
	} catch (error) {
		return error;
	}
};

export {
	isWeightedType,
	isWalkingType,
	isDistanceType,
	isOtherType,
	// request utils
	getWorkoutLogs,
	saveWorkoutLog,
	// utils
	getWorkoutTypeIDFromName,
	prepareLogDates,
};
