import {
	eventsService,
	userWorkoutService,
	workoutsService,
} from "../services";
import type {
	CreateEventVals,
	NewEventPayload,
	NewUserWorkoutPayload,
	NewWorkoutPayload,
	RecurringWorkoutPayload,
} from "../services/types";

const createUserWorkoutSchedule = async (
	userID: string,
	values: NewUserWorkoutPayload
) => {
	const { workout, schedule } = values;
	const userWorkoutRecord = await userWorkoutService.createWorkout(
		userID,
		workout
	);
	const eventRecord = await eventsService.createEvent(userID, schedule);

	return {
		userWorkout: userWorkoutRecord,
		event: eventRecord,
	};
};

export { createUserWorkoutSchedule };
