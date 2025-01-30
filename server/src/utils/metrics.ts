// Calulating various health/workout related metrics: calories, stride_length etc

import type { ActivityType } from "../services/types";

const CALORIES_MULTIPLIERS = {
	Lift: {
		Men: 0.0713,
		Women: 0.0637,
	},
	Walk: {
		Men: 2.9,
		Women: 2.7,
	},
	Stretch: {
		Men: 0.0,
		Women: 0.0,
	},
	MET: {
		Men: 2.3,
		Women: 2.1,
	},
};

export interface CaloriesReqs {
	type: ActivityType;
	gender: "Men" | "Women";
	mins: number; // mins
	bodyWeight: number; // lbs.
}

// mins * weight(kg) * 0.0713
const calculateLiftCalories = (values: CaloriesReqs): number => {
	const { gender, mins, bodyWeight } = values;
	const multiplier = CALORIES_MULTIPLIERS.Lift[gender];
	const weightInKg = poundsToKg(bodyWeight);
	const calories = mins * weightInKg * multiplier;

	return calories;
};

const calculateStretchCalories = (values: CaloriesReqs): number => {
	const { gender, mins, bodyWeight } = values;
	const multiplier = CALORIES_MULTIPLIERS.MET[gender];
	const weightInKg = poundsToKg(bodyWeight);
	const caloriesPerMin = (multiplier * weightInKg * 3.5) / 200;
	const calories = caloriesPerMin * mins;

	return calories;
};

// 135*30(mins) = 130
const calculateWalkCalories = (values: CaloriesReqs): number => {
	const { gender, mins, bodyWeight } = values;
	const MET = CALORIES_MULTIPLIERS.MET[gender];
	const weightInKg = poundsToKg(bodyWeight);
	const calories = (MET * weightInKg * mins) / 20;

	return calories;
};
const calculateCardioCalories = (values: CaloriesReqs): number => {
	const { gender, mins, bodyWeight } = values;
	const MET = CALORIES_MULTIPLIERS.MET[gender];
	const weightInKg = poundsToKg(bodyWeight);
	const duration = mins / 60;
	const calories = MET * weightInKg * duration;

	return calories;
};
const calculateTimedCalories = (values: CaloriesReqs): number => {
	const { gender, mins, bodyWeight } = values;
	const MET = CALORIES_MULTIPLIERS.MET[gender];
	const weightInKg = poundsToKg(bodyWeight);
	const duration = mins / 60;
	const calories = (duration * MET * weightInKg) / 200;

	return calories;
};

const calculateBurnedCalories = (values: CaloriesReqs) => {
	const { type } = values;

	switch (type) {
		case "Lift": {
			const caloriesBurned = calculateLiftCalories(values);

			return caloriesBurned;
		}
		case "Stretch": {
			const caloriesBurned = calculateStretchCalories(values);

			return caloriesBurned;
		}
		case "Walk": {
			const caloriesBurned = calculateWalkCalories(values);

			return caloriesBurned;
		}
		case "Cardio": {
			const caloriesBurned = calculateCardioCalories(values);

			return caloriesBurned;
		}
		case "Timed": {
			const caloriesBurned = calculateTimedCalories(values);

			return caloriesBurned;
		}

		default:
			return 0;
	}
};

// Utils
const poundsToKg = (lbs: number): number => {
	return lbs / 2.205;
};

export {
	CALORIES_MULTIPLIERS,
	// Calculators
	calculateLiftCalories,
	calculateStretchCalories,
	// wrapper around activity type calories calculators
	calculateBurnedCalories,
	// Converters & utils
	poundsToKg,
};
