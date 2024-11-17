import db from "../db/db";
import { SchedulesService } from "./SchedulesService";
import { EventsService } from "./EventsService";

const schedulesService = new SchedulesService(db);
const eventsService = new EventsService(db);

const services = {
	schedules: schedulesService,
	events: eventsService,
} as const;

export { schedulesService, eventsService, services };
