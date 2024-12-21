import { CustomDateRange } from "../features/summary/types";
import { currentEnv, planApis } from "./utils_env";
import { groupByFn } from "./utils_misc";

export interface CreatePlanValues {
	workoutType: string;
	workoutPlanName: string;
	workoutPlanDesc: string;
	workoutPlanLength: number;
	workoutPlanSets: number;
	workoutPlanReps: number;
	workoutPlanWeight: number;
}

export interface WorkoutType {
	workoutTypeID: number;
	workoutType: string;
	workoutTypeDesc: string;
	units: "lbs." | "miles" | "steps" | "other";
	isActive: boolean;
	createdDate: string;
}

const workoutTypes: WorkoutType[] = [
	{
		workoutTypeID: 2,
		workoutType: "Planked Pull-ups",
		workoutTypeDesc:
			"Plank your back horizontally, like picking something up & pull the dumbell up and down beneath you.",
		isActive: true,
		createdDate: "2024-11-19 07:28:47.097325",
		units: "lbs.",
	},
	{
		workoutTypeID: 3,
		workoutType: "Lateral Butterflys",
		workoutTypeDesc:
			"Stand upright w/ arms wide open & bring them together like a butterflys wings.",
		isActive: true,
		createdDate: "2024-11-19 07:28:47.097325",
		units: "lbs.",
	},
	{
		workoutTypeID: 3,
		workoutType: "Overhead Press",
		workoutTypeDesc:
			"Stand upright & perform an overhead bench press w/ the dumbells above your head.",
		isActive: true,
		createdDate: "2024-11-19 07:28:47.097325",
		units: "lbs.",
	},
	{
		workoutTypeID: 5,
		workoutType: "Pushups",
		workoutTypeDesc:
			"Perform push-ups from the ground lowering your body & face as close to the ground as possible.",
		isActive: true,
		createdDate: "2024-11-19 07:28:47.097325",
		units: "lbs.",
	},
	{
		workoutTypeID: 6,
		workoutType: "Situps",
		workoutTypeDesc:
			"Lay down w/ your legs folded at the knees & your arms behind your head and bring your face to your knees for a situp",
		isActive: true,
		createdDate: "2024-11-19 07:28:47.097325",
		units: "lbs.",
	},
	{
		workoutTypeID: 1,
		workoutType: "Curls",
		workoutTypeDesc: "Perform curls standing or sitting w/ dumbells",
		isActive: true,
		createdDate: "2024-11-19 07:28:47.097325",
		units: "lbs.",
	},
	{
		workoutTypeID: 7,
		workoutType: "Timed Walk",
		workoutTypeDesc:
			"Walking for a specified amount of time via Pomodoro or other timer.",
		isActive: true,
		createdDate: "2024-11-22 07:05:48.301667",
		units: "steps",
	},
	{
		workoutTypeID: 8,
		workoutType: "Free Walk",
		workoutTypeDesc:
			"Walking for an un-specified amount of time. Record the time walking.",
		isActive: true,
		createdDate: "2024-11-22 07:05:48.301667",
		units: "steps",
	},
	{
		workoutTypeID: 8,
		workoutType: "Distance Walk",
		workoutTypeDesc: "Timed walking with a specified target distance in miles",
		isActive: true,
		createdDate: "2024-11-23 11:04:57.394021",
		units: "miles",
	},
	{
		workoutTypeID: 11,
		workoutType: "Stretch",
		workoutTypeDesc: "Stretching excersise",
		isActive: true,
		createdDate: "2024-11-23 11:04:57.394021",
		units: "other",
	},
	{
		workoutTypeID: 12,
		workoutType: "Yoga",
		workoutTypeDesc: "Yoga excersise",
		isActive: true,
		createdDate: "2024-11-23 11:04:57.394021",
		units: "other",
	},
	{
		workoutTypeID: 10,
		workoutType: "Other",
		workoutTypeDesc: "Miscellaneous workout type.",
		isActive: true,
		createdDate: "2024-11-23 13:04:21.425857",
		units: "other",
	},
] as const;

export type WorkoutTypeName =
	| "Planked Pull-ups"
	| "Lateral Butterflys"
	| "Overhead Press"
	| "Pushups"
	| "Situps"
	| "Curls"
	| "Timed Walk"
	| "Free Walk"
	| "Distance Walk"
	| "Stretch"
	| "Yoga"
	| "Other";

const groupTypesByUnit = (workoutTypes: WorkoutType[]) => {
	const grouped = groupByFn(workoutTypes, (x) => x.units);

	return grouped;
};

const groupedTypes = (workoutTypes: WorkoutType[]) => {
	const byUnit = groupTypesByUnit(workoutTypes);

	return byUnit;
};

const getActivityTypeFromWorkoutTypeID = (typeID: number) => {
	const record = workoutTypes.find((type) => type.workoutTypeID === typeID);

	const activityTypes = {
		"lbs.": "weight",
		steps: "walk",
		miles: "distance",
		null: "timed",
	};

	const type = activityTypes[record?.units as keyof object];

	return type;
};

const getPlanIDFromType = (type: string, planTypes: WorkoutType[]) => {
	const planRecord = planTypes.find((plan) => plan.workoutType === type);

	const id: number = planRecord?.workoutTypeID || 0;

	return id;
};

// FETCHING DATA

const getWorkoutPlans = async (userID: string, dateRange: CustomDateRange) => {
	const { startDate, endDate } = dateRange;
	let url = currentEnv.base + planApis.getPlans;
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

export {
	workoutTypes,
	getPlanIDFromType,
	groupTypesByUnit,
	groupedTypes,
	getWorkoutPlans,
	getActivityTypeFromWorkoutTypeID,
};
