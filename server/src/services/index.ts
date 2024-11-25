import db from "../db/db";
import { SchedulesService } from "./SchedulesService";
import { EventsService } from "./EventsService";
import { WorkoutPlansService } from "./WorkoutPlansService";
import { WorkoutHistoryService } from "./WorkoutHistoryService";

const eventsService = new EventsService(db);
const plansService = new WorkoutPlansService(db);
const schedulesService = new SchedulesService(db);
const historyService = new WorkoutHistoryService(db);

const services = {
	schedules: schedulesService,
	events: eventsService,
	workoutPlans: plansService,
	history: historyService,
} as const;

export {
	schedulesService,
	eventsService,
	plansService,
	historyService,
	services,
};
