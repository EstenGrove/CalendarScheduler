import { subMinutes } from "date-fns";
import {
	NewWorkoutAndPlan,
	NewWorkoutEvent,
	NewWorkoutPayload,
	NewWorkoutValues,
	RecurringWorkoutAndPlan,
} from "../components/workouts/types";
import { CalendarEvent, CalendarEventSchedule } from "../features/events/types";
import { CustomDateRange } from "../features/summary/types";
import { AsyncResponse } from "../features/types";
import {
	MarkAsDoneBatchParams,
	MarkWorkoutDoneParams,
} from "../features/workouts/operations";
import { UserWorkout, Workout, WorkoutPlan } from "../features/workouts/types";
import {
	applyTimeStrToDate,
	formatDate,
	formatTime,
	parseTime,
} from "./utils_dates";
import { currentEnv, workoutApis } from "./utils_env";

// REQUEST UTILS

export interface CreateWorkoutResponse {
	event: CalendarEvent;
	schedule: CalendarEventSchedule;
	workout: Workout | UserWorkout;
	plan: WorkoutPlan;
}

export type CreateNewWorkoutResp = AsyncResponse<CreateWorkoutResponse>;

export interface CancelWorkoutParams {
	userID: string;
	workoutID: number;
	workoutDate: string;
	cancelReason?: string;
}

// REQUESTS

const createNewWorkout = async (
	userID: string,
	values: NewWorkoutWithPlan
): CreateNewWorkoutResp => {
	const { event, workout } = values;
	const url = currentEnv.base + workoutApis.createNewWorkout;

	try {
		const request = await fetch(url, {
			method: "POST",
			body: JSON.stringify({
				userID,
				newEvent: event,
				newWorkout: workout,
			}),
		});
		const response = await request.json();
		return response as CreateWorkoutResponse;
	} catch (error) {
		return error;
	}
};

const getWorkouts = async (userID: string, dateRange: CustomDateRange) => {
	const { startDate, endDate } = dateRange;
	let url = currentEnv.base + workoutApis.getWorkouts;
	url += "?" + new URLSearchParams({ userID });
	url += "&" + new URLSearchParams({ startDate, endDate });

	try {
		const request = await fetch(url);
		const response = await request.json();

		return response;
	} catch (error) {
		return error;
	}
};
const getWorkoutsByDate = async (
	userID: string,
	dateRange: CustomDateRange
) => {
	const { startDate, endDate } = dateRange;
	let url = currentEnv.base + workoutApis.getWorkoutsByDate;
	url += "?" + new URLSearchParams({ userID });
	url += "&" + new URLSearchParams({ startDate, endDate });

	try {
		const request = await fetch(url);
		const response = await request.json();

		return response;
	} catch (error) {
		return error;
	}
};
// Marks a single workout status as complete/not-complete
const markWorkoutAsComplete = async (
	userID: string,
	params: Omit<MarkWorkoutDoneParams, "userID">
): AsyncResponse<{ updatedWorkout: UserWorkout }> => {
	let url = currentEnv.base + workoutApis.markWorkoutAsDone;
	url += "?" + new URLSearchParams({ userID });

	try {
		const request = await fetch(url, {
			method: "POST",
			body: JSON.stringify({
				workoutID: params.workoutID,
				workoutDate: params.workoutDate,
				isCompleted: params.isCompleted,
				startTime: params.startTime,
				endTime: params.endTime,
			}),
		});
		const response = await request.json();
		return response;
	} catch (error) {
		return error;
	}
};
// Saves workout status for multiple workouts at once
const markWorkoutsAsComplete = async (
	userID: string,
	params: MarkAsDoneBatchParams
) => {
	const url = currentEnv.base + workoutApis.markWorkoutAsDoneMany;

	try {
		const request = await fetch(url, {
			method: "POST",
			body: JSON.stringify({
				userID,
				workoutIDs: params.workoutIDs,
				targetDate: params.workoutDate,
			}),
		});
		const response = await request.json();
		return response;
	} catch (error) {
		return error;
	}
};

// Cancels a single workout instance for a given date
const cancelWorkoutForDate = async (
	userID: string,
	cancelValues: CancelWorkoutParams
): AsyncResponse<{ cancelledWorkout: UserWorkout }> => {
	let url = currentEnv.base + workoutApis.cancelWorkout;
	url += "?" + new URLSearchParams({ userID });

	try {
		const request = await fetch(url, {
			method: "POST",
			body: JSON.stringify({
				userID: userID,
				workoutID: cancelValues.workoutID,
				cancelDate: cancelValues.workoutDate,
				cancelReason: cancelValues?.cancelReason || "Not available",
			}),
		});
		const response = await request.json();

		return response as AsyncResponse<{ cancelledWorkout: UserWorkout }>;
	} catch (error) {
		return error;
	}
};

// UTILS

const prepareEventTimes = (startTime: string, endTime: string) => {
	const pStart = parseTime(startTime);
	const pEnd = parseTime(endTime);

	return {
		startTime: formatTime(pStart, "long"),
		endTime: formatTime(pEnd, "long"),
	};
};

const prepareRecurring = (values: NewWorkoutValues): NewWorkoutValues => {
	const { endDate, frequency } = values;
	const newEnd = (
		!endDate || endDate === "" ? null : endDate
	) as NewWorkoutValues["endDate"];

	switch (frequency) {
		case "Daily": {
			return {
				...values,
				byDay: [],
				byMonth: 0,
				byMonthDay: 0,
				endDate: newEnd,
			};
		}
		case "Weekly": {
			return {
				...values,
				byMonth: 0,
				byMonthDay: 0,
				endDate: newEnd,
			};
		}
		case "Monthly": {
			return {
				...values,
				byDay: [],
				endDate: newEnd,
			};
		}
		case "Yearly": {
			return {
				...values,
				byDay: [],
				endDate: newEnd,
			};
		}
		case "Custom": {
			return values;
		}
		case "Never": {
			return values;
		}

		default:
			return values;
	}
};

const prepareWorkoutEvent = (values: NewWorkoutValues): NewWorkoutEvent => {
	const { noEndDate, endDate, startTime, endTime } = values;
	const end: string | null = noEndDate ? "" : endDate;
	const times = prepareEventTimes(startTime, endTime);

	const eventValues: NewWorkoutEvent = {
		title: values.planName,
		desc: values.planDesc,
		startDate: values.startDate,
		endDate: end,
		startTime: times.startTime,
		endTime: times.endTime,
		isRecurring: values.isRecurring,
		frequency: values.frequency,
		interval: Number(values.interval),
		byDay: values.byDay,
		byMonth: values.byMonth,
		byMonthDay: values.byMonthDay,
		location: "",
		url: "",
		notes: values.notes || "",
		noEndDate: noEndDate,
	};

	return eventValues;
};

// prepares the records for a new plan AND workout
const prepareWorkoutAndPlan = (
	workoutTypeID: number,
	values: NewWorkoutValues
): NewWorkoutAndPlan => {
	const plan = {
		workoutTypeID: workoutTypeID,
		planName: values.planName,
		planDesc: values.planDesc,
		weight: values.weight,
		reps: values.reps,
		sets: values.sets,
		mins: values.mins,
		steps: values.steps,
		miles: values.miles,
		title: values.planName,
		notes: values.notes,
	};

	return plan;
};

// clean the dataset for a new workout with an existing plan
const prepareNewWorkout = (workoutTypeID: number, values: NewWorkoutValues) => {
	// should have a planID & typeID already available!!
	console.log("workoutTypeID", workoutTypeID);
	console.log("values", values);
	//
	//
};
export interface NewWorkoutWithPlan {
	event: NewWorkoutEvent;
	workout: NewWorkoutPayload;
}
// clean the dataset for a new workout with a new plan
const prepareNewWorkoutWithPlan = (
	workoutTypeID: number,
	values: NewWorkoutValues
): RecurringWorkoutAndPlan => {
	const recurringVals = prepareRecurring(values);
	const withRecurring = { ...values, ...recurringVals } as NewWorkoutValues;
	// recurring event payload
	const eventValues: NewWorkoutEvent = prepareWorkoutEvent(withRecurring);
	// custom workout payload
	const workoutValues: NewWorkoutAndPlan = prepareWorkoutAndPlan(
		workoutTypeID,
		values
	);

	return { event: eventValues, workout: workoutValues };
};

// WORKOUT STATUS/MARK-AS-DONE UTILS

const prepareValuesForMarkAsDone = (
	selectedDate: string,
	workout: UserWorkout
): Omit<MarkWorkoutDoneParams, "userID"> => {
	const { workoutID, mins, workoutStatus } = workout;
	const currentDateTime = new Date();
	const timeStr = formatTime(currentDateTime, "long");
	const endTime = applyTimeStrToDate(timeStr, selectedDate);
	const startTime = subMinutes(endTime, mins);

	return {
		workoutID: workoutID,
		workoutDate: formatDate(selectedDate, "db"),
		startTime: startTime.toISOString(),
		endTime: endTime.toISOString(),
		isCompleted: workoutStatus === "COMPLETE" ? true : false,
	};
};
interface WorkoutMins {
	hrs: number;
	mins: number;
}
const convertMinsToHoursAndMins = (mins: number): WorkoutMins => {
	if (mins <= 60) return { hrs: 0, mins: mins };
	const hrs = Math.floor(mins / 60);
	const remains = mins % 60;

	return {
		hrs: hrs,
		mins: remains,
	};
};

const formatWorkoutMins = (originMins: number) => {
	if (originMins <= 60) {
		return originMins + "m";
	} else {
		const { hrs, mins } = convertMinsToHoursAndMins(originMins);
		return `${hrs}h ${mins}m`;
	}
};

// WORKOUT TRACKER

export {
	prepareRecurring,
	prepareNewWorkout,
	prepareNewWorkoutWithPlan,
	prepareValuesForMarkAsDone,
	// requests
	createNewWorkout,
	getWorkouts,
	getWorkoutsByDate,
	markWorkoutAsComplete,
	markWorkoutsAsComplete,
	cancelWorkoutForDate,
	// utils
	formatWorkoutMins,
	convertMinsToHoursAndMins,
};
