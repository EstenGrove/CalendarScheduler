import db from "../db/db";
import { SchedulesService } from "./SchedulesService";
import { EventsService } from "./EventsService";
import { WorkoutPlansService } from "./WorkoutPlansService";
import { WorkoutHistoryService } from "./WorkoutHistoryService";
import { WorkoutsServices } from "./WorkoutsServices";
import { UserWorkoutService } from "./UserWorkoutService";
import { SummaryService } from "./SummaryService";
import { WorkoutTypesService } from "./WorkoutTypesService";

const eventsService = new EventsService(db);
const summaryService = new SummaryService(db);
const workoutsService = new WorkoutsServices(db);
const plansService = new WorkoutPlansService(db);
const schedulesService = new SchedulesService(db);
const historyService = new WorkoutHistoryService(db);
const userWorkoutService = new UserWorkoutService(db);
const workoutTypesService = new WorkoutTypesService(db);

const services = {
	schedules: schedulesService,
	events: eventsService,
	workouts: workoutsService,
	workoutPlans: plansService,
	userWorkouts: userWorkoutService,
	history: historyService,
	summary: summaryService,
	workoutTypes: workoutTypesService,
} as const;

export {
	schedulesService,
	eventsService,
	plansService,
	workoutsService,
	historyService,
	summaryService,
	userWorkoutService,
	workoutTypesService,
	services,
};
