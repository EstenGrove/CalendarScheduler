import db from "../db/db";
import { SchedulesService } from "./SchedulesService";
import { EventsService } from "./EventsService";
import { WorkoutPlansService } from "./WorkoutPlansService";

const eventsService = new EventsService(db);
const plansService = new WorkoutPlansService(db);
const schedulesService = new SchedulesService(db);

const services = {
	schedules: schedulesService,
	events: eventsService,
	workoutPlans: plansService,
} as const;

export { schedulesService, eventsService, plansService, services };
