import { AsyncResponse } from "../features/types";
import { currentEnv, workoutTypeApis } from "./utils_env";
import { WorkoutType } from "./utils_workoutPlans";

const getWorkoutTypes = async (
	userID: string
): AsyncResponse<{ workoutTypes: WorkoutType[] }> => {
	let url = currentEnv.base + workoutTypeApis.getAll;
	url += "?" + new URLSearchParams({ userID });

	try {
		const request = await fetch(url);
		const response = await request.json();

		return response as AsyncResponse<{ workoutTypes: WorkoutType[] }>;
	} catch (error) {
		return error;
	}
};

const createWorkoutType = async (userID: string, newType: object) => {
	let url = currentEnv.base + workoutTypeApis.create;
	url += "?" + new URLSearchParams({ userID });

	try {
		const request = await fetch(url, {
			method: "POST",
			body: JSON.stringify({
				userID,
				newType: newType,
			}),
		});
		const response = await request.json();

		return response;
	} catch (error) {
		return error;
	}
};
const updateWorkoutType = async (userID: string, updatedType: object) => {
	let url = currentEnv.base + workoutTypeApis.update;
	url += "?" + new URLSearchParams({ userID });

	try {
		const request = await fetch(url, {
			method: "POST",
			body: JSON.stringify({
				userID,
				updatedType: updatedType,
			}),
		});
		const response = await request.json();

		return response;
	} catch (error) {
		return error;
	}
};
const deleteWorkoutType = async (userID: string, workoutTypeID: number) => {
	let url = currentEnv.base + workoutTypeApis.delete;
	url +=
		"?" + new URLSearchParams({ userID, typeID: workoutTypeID.toString() });

	try {
		const request = await fetch(url, {
			method: "DELETE",
		});
		const response = await request.json();

		return response;
	} catch (error) {
		return error;
	}
};

export {
	getWorkoutTypes,
	createWorkoutType,
	updateWorkoutType,
	deleteWorkoutType,
};
