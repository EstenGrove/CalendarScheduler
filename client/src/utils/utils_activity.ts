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

export { checkActivityType };
