import { CreateLogValues } from "../components/workout-logs/types";
import { currentEnv, historyApis } from "./utils_env";
import { WorkoutType, workoutTypes } from "./utils_workoutPlans";

export type LogStep =
	| "Type"
	| "Reps"
	| "Steps"
	| "Length"
	| "Time"
	| "Summary"
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

	return !!record && hasOtherName && hasOtherUnit;
};

// SAVING WORKOUT LOGS

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
	saveWorkoutLog,
};
