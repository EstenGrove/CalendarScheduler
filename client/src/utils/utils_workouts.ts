import { NewWorkoutValues } from "../components/workouts/types";

const prepareRecurring = (values: NewWorkoutValues) => {
	const { endDate, startTime, endTime, frequency } = values;
	const newEnd = !endDate || endDate === "" ? null : endDate;

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

// clean the dataset for a new workout with an existing plan
const prepareNewWorkout = (values: NewWorkoutValues) => {
	//
	//
};

// clean the dataset for a new workout with a new plan
const prepareNewWorkoutWithPlan = (values: NewWorkoutValues) => {
	//
	//
};

export { prepareNewWorkout, prepareNewWorkoutWithPlan };
