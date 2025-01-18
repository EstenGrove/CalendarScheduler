import {
	isDistanceType,
	isOtherType,
	isWalkingType,
	isWeightedType,
} from "./utils_workoutLogs";

export type ActivityType =
	| "Lift"
	| "Walk"
	| "Run"
	| "Stretch"
	| "Cardio"
	| "Swim"
	| "Stairs"
	| "Timed"
	| "Strength"
	| "More";

const checkActivityType = (type: string) => {
	const weightType = isWeightedType(type);
	const distanceType = isDistanceType(type);
	const walkType = isWalkingType(type);
	const otherType = isOtherType(type);

	return {
		isWeight: weightType,
		isDistance: distanceType,
		isWalk: walkType,
		isOther: otherType,
	};
};

const activityIcons = {
	time: "timer",
	miles: "follow_the_signs",
	steps: "directions_walk",
	weight: "fitness_center",
	lbs: "fitness_center",
	reps: "timelapse",
	sets: "timelapse",
	run: "directions_run",
	cardio: "",
	stretch: "accessibility",
	done: "done",
	doneAll: "done_all",
	notDone: "clear",
} as const;

const getActivityTypeKey = (
	activityType: ActivityType
): keyof typeof activityIcons => {
	const type = activityType;

	switch (type) {
		case "Lift":
			return "weight";
		case "Walk":
			return "miles";
		case "Run":
			return "run";
		case "Cardio":
			return "cardio";
		case "Stretch":
			return "stretch";
		case "More":
			return "doneAll";

		default:
			return "time";
	}
};

export { checkActivityType, activityIcons, getActivityTypeKey };
