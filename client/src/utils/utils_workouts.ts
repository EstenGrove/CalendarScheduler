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
import { MarkAsDoneParams } from "../features/workouts/operations";
import { UserWorkout, Workout, WorkoutPlan } from "../features/workouts/types";
import { formatTime, parseTime } from "./utils_dates";
import { currentEnv, workoutApis } from "./utils_env";

// REQUEST UTILS

export interface CreateWorkoutResponse {
	event: CalendarEvent;
	schedule: CalendarEventSchedule;
	workout: Workout | UserWorkout;
	plan: WorkoutPlan;
}

export type CreateNewWorkoutResp = AsyncResponse<CreateWorkoutResponse>;

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
const markWorkoutsAsDone = async (userID: string, params: MarkAsDoneParams) => {
	const url = currentEnv.base + workoutApis.markWorkoutsAsDone;

	try {
		const request = await fetch(url, {
			method: "POST",
			body: JSON.stringify({
				userID,
				workoutIDs: params.workoutIDs,
				targetDate: params.targetDate,
			}),
		});
		const response = await request.json();
		return response;
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

export {
	prepareRecurring,
	prepareNewWorkout,
	prepareNewWorkoutWithPlan,
	// requests
	createNewWorkout,
	getWorkouts,
	getWorkoutsByDate,
	markWorkoutsAsDone,
};
