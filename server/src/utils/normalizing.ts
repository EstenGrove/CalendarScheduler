import type {
	CalendarEventClient,
	CalendarEventDB,
	MonthlyEventSummaryClient,
	MonthlyEventSummaryDB,
	EventInstanceClient,
	EventInstanceDB,
	CalendarScheduleClient,
	CalendarScheduleDB,
	EventDetailsClient,
	EventDetailsDB,
	WorkoutLogClient,
	WorkoutLogDB,
	UserWorkoutEventClient,
	UserWorkoutEventDB,
	MinsSummaryClient,
	MinsSummaryDB,
	UserWorkoutPlanDB,
	UserWorkoutPlanClient,
	UserWorkoutDB,
	UserWorkoutClient,
} from "../services/types";

class MonthlySummaryNormalizer {
	#toDB(record: MonthlyEventSummaryClient): MonthlyEventSummaryDB {
		const dbRecord: MonthlyEventSummaryDB = {
			target_date: record.eventDate,
			has_event: record.hasEvent,
		};
		return dbRecord;
	}
	#toClient(record: MonthlyEventSummaryDB): MonthlyEventSummaryClient {
		const clientRecord: MonthlyEventSummaryClient = {
			hasEvent: record.has_event,
			eventDate: record.target_date,
		};
		return clientRecord;
	}

	public toDBOne(record: MonthlyEventSummaryClient): MonthlyEventSummaryDB {
		return this.#toDB(record);
	}
	public toClientOne(record: MonthlyEventSummaryDB): MonthlyEventSummaryClient {
		return this.#toClient(record);
	}
	public toDB(records: MonthlyEventSummaryClient[]): MonthlyEventSummaryDB[] {
		const dbRecords: MonthlyEventSummaryDB[] = records.map(this.#toDB);

		return dbRecords;
	}
	public toClient(
		records: MonthlyEventSummaryDB[]
	): MonthlyEventSummaryClient[] {
		const clientRecords: MonthlyEventSummaryClient[] = records.map(
			this.#toClient
		);

		return clientRecords;
	}
}

class EventsNormalizer {
	#toDB(record: CalendarEventClient): CalendarEventDB {
		const dbRecord: CalendarEventDB = {
			event_id: record.eventID,
			event_date: record.eventDate,
			event_name: record.title,
			event_desc: record.desc,
			start_date: record.startDate,
			end_date: record.endDate,
			start_time: record.startTime,
			end_time: record.endTime,
			is_active: record.isActive,
			created_date: record.createdDate,
			modified_date: record.modifiedDate,
			tag_color: record.tagColor,
		};
		return dbRecord;
	}
	#toClient(record: CalendarEventDB): CalendarEventClient {
		const clientRecord: CalendarEventClient = {
			eventID: record.event_id,
			eventDate: record.event_date,
			title: record.event_name,
			desc: record.event_desc,
			startDate: record.start_date,
			endDate: record.end_date,
			startTime: record.start_time,
			endTime: record.end_time,
			isActive: record.is_active,
			createdDate: record.created_date,
			modifiedDate: record.modified_date,
			tagColor: record.tag_color,
		};
		return clientRecord;
	}

	public toDBOne(record: CalendarEventClient): CalendarEventDB {
		return this.#toDB(record);
	}
	public toClientOne(record: CalendarEventDB): CalendarEventClient {
		return this.#toClient(record);
	}
	public toDB(records: CalendarEventClient[]): CalendarEventDB[] {
		const dbRecords: CalendarEventDB[] = records.map(this.#toDB);

		return dbRecords;
	}
	public toClient(records: CalendarEventDB[]): CalendarEventClient[] {
		const clientRecords: CalendarEventClient[] = records.map(this.#toClient);

		return clientRecords;
	}
}

class EventInstancesNormalizer {
	#toDB(record: EventInstanceClient): EventInstanceDB {
		const dbRecord: EventInstanceDB = {
			event_id: record.eventID,
			event_date: record.eventDate,
			event_name: record.title,
			event_desc: record.desc,
			start_date: record.startDate,
			end_date: record.endDate,
			start_time: record.startTime,
			end_time: record.endTime,
			is_active: record.isActive,
			created_date: record.createdDate,
			modified_date: record.modifiedDate,
			schedule_id: record.scheduleID,
			tag_color: record.tagColor,
		};
		return dbRecord;
	}
	#toClient(record: EventInstanceDB): EventInstanceClient {
		const clientRecord: EventInstanceClient = {
			eventDate: record.event_date,
			eventID: record.event_id,
			scheduleID: record.schedule_id,
			eventInstanceID: record.event_instance_id,
			title: record.event_name,
			desc: record.event_desc,
			startDate: record.start_date,
			endDate: record.end_date,
			startTime: record.start_time,
			endTime: record.end_time,
			isActive: record.is_active,
			createdDate: record.created_date,
			modifiedDate: record.modified_date,
			tagColor: record.tag_color,
		};
		return clientRecord;
	}

	public toDBOne(record: EventInstanceClient): EventInstanceDB {
		return this.#toDB(record);
	}
	public toClientOne(record: EventInstanceDB): EventInstanceClient {
		return this.#toClient(record);
	}
	public toDB(records: EventInstanceClient[]): EventInstanceDB[] {
		const dbRecords: EventInstanceDB[] = records.map(this.#toDB);

		return dbRecords;
	}
	public toClient(records: EventInstanceDB[]): EventInstanceClient[] {
		const clientRecords: EventInstanceClient[] = records.map(this.#toClient);

		return clientRecords;
	}
}

class EventDetailsNormalizer {
	#toDB(record: EventDetailsClient): EventDetailsDB {
		const dbRecord: EventDetailsDB = {
			details_id: record.detailsID,
			event_id: record.eventID,
			notes: record.notes,
			url: record.url,
			location: record.location,
			created_date: record.createdDate,
			modified_date: record.modifiedDate,
			is_active: record.isActive,
		};

		return dbRecord;
	}
	#toClient(record: EventDetailsDB): EventDetailsClient {
		const clientRecord: EventDetailsClient = {
			detailsID: record.details_id,
			eventID: record.event_id,
			notes: record.notes,
			url: record.url,
			location: record.location,
			createdDate: record.created_date,
			modifiedDate: record.modified_date,
			isActive: record.is_active,
		};

		return clientRecord;
	}

	public toDBOne() {}
	public toClientOne() {}

	public toDB() {}
	public toClient() {}
}

class SchedulesNormalizer {
	#toDB(record: CalendarScheduleClient): CalendarScheduleDB {
		const dbRecord: CalendarScheduleDB = {
			schedule_id: record.scheduleID,
			event_id: record.eventID,
			start_date: record.startDate,
			end_date: record.endDate,
			interval: record.interval,
			frequency: record.frequency,
			by_day: record.byDay,
			by_month: record.byMonth,
			by_month_day: record.byMonthDay,
			created_date: record.createdDate,
			modified_date: record.modifiedDate,
			is_active: record.isActive,
		};

		return dbRecord;
	}
	#toClient(record: CalendarScheduleDB): CalendarScheduleClient {
		const clientRecord: CalendarScheduleClient = {
			scheduleID: record.schedule_id,
			eventID: record.event_id,
			startDate: record.start_date,
			endDate: record.end_date,
			interval: record.interval,
			frequency: record.frequency,
			byDay: record.by_day,
			byMonth: record.by_month,
			byMonthDay: record.by_month_day,
			createdDate: record.created_date,
			modifiedDate: record.modified_date,
			isActive: record.is_active,
		};
		return clientRecord;
	}

	public toDBOne(record: CalendarScheduleClient): CalendarScheduleDB {
		return this.#toDB(record);
	}
	public toClientOne(record: CalendarScheduleDB): CalendarScheduleClient {
		return this.#toClient(record);
	}

	public toDB(records: CalendarScheduleClient[]): CalendarScheduleDB[] {
		return records.map(this.#toDB);
	}
	public toClient(records: CalendarScheduleDB[]): CalendarScheduleClient[] {
		return records.map(this.#toClient);
	}
}

class HistoryNormalizer {
	#toDB(record: WorkoutLogClient): WorkoutLogDB {
		const dbRecord: WorkoutLogDB = {
			log_id: record.logID,
			user_id: record.userID,
			workout_type_name: record.workoutType,
			reps: record.reps,
			sets: record.sets,
			weight: record.weight,
			miles: record.miles,
			steps: record.steps,
			workout_mins: record.mins,
			workout_date: record.date,
			is_active: record.isActive,
			created_date: record.createdDate,
			start_time: record.startTime,
			end_time: record.endTime,
		};
		return dbRecord;
	}
	#toClient(record: WorkoutLogDB): WorkoutLogClient {
		const clientRecord: WorkoutLogClient = {
			userID: record.user_id,
			logID: record.log_id,
			workoutType: record.workout_type_name,
			reps: record.reps,
			sets: record.sets,
			weight: record.weight,
			miles: record.miles,
			steps: record.steps,
			mins: record.workout_mins,
			startTime: record.start_time,
			endTime: record.end_time,
			date: record.workout_date,
			isActive: record.is_active,
			createdDate: record.created_date,
		};
		return clientRecord;
	}

	toClientOne(record: WorkoutLogDB): WorkoutLogClient {
		return this.#toClient(record);
	}
	toDBOne(record: WorkoutLogClient): WorkoutLogDB {
		return this.#toDB(record);
	}

	toClient(records: WorkoutLogDB[]): WorkoutLogClient[] {
		if (!records || records.length <= 0) return [];
		return records.map(this.#toClient);
	}
	toDB(records: WorkoutLogClient[]): WorkoutLogDB[] {
		if (!records || records.length <= 0) return [];
		return records.map(this.#toDB);
	}
}

class WorkoutEventNormalizer {
	#toDB(record: UserWorkoutEventClient): UserWorkoutEventDB {
		const dbRecord: UserWorkoutEventDB = {
			event_id: record.eventID,
			workout_id: record.workoutID,
			schedule_id: record.scheduleID,
			event_name: record.eventName,
			event_desc: record.eventDesc,
			event_date: record.eventDate,
			start_time: record.startTime,
			end_time: record.endTime,
			created_date: record.createdDate,
			tag_color: record.tagColor,
		};

		return dbRecord;
	}
	#toClient(record: UserWorkoutEventDB): UserWorkoutEventClient {
		const clientRecord: UserWorkoutEventClient = {
			eventID: record.event_id,
			workoutID: record.workout_id,
			scheduleID: record.schedule_id,
			eventName: record.event_name,
			eventDesc: record.event_desc,
			eventDate: record.event_date,
			startTime: record.start_time,
			endTime: record.end_time,
			createdDate: record.created_date,
			tagColor: record.tag_color,
		};

		return clientRecord;
	}
	toDBOne(record: UserWorkoutEventClient): UserWorkoutEventDB {
		const dbRecord = this.#toDB(record);

		return dbRecord;
	}
	toClientOne(record: UserWorkoutEventDB): UserWorkoutEventClient {
		const clientRecord = this.#toClient(record);

		return clientRecord;
	}
	toDB(records: UserWorkoutEventClient[]): UserWorkoutEventDB[] {
		const dbRecords = records.map(this.#toDB);

		return dbRecords;
	}
	toClient(records: UserWorkoutEventDB[]): UserWorkoutEventClient[] {
		const clientRecord = records.map(this.#toClient);

		return clientRecord;
	}
}

class DailyMinsSummaryNormalizer {
	#toDB(record: MinsSummaryClient): MinsSummaryDB {
		const dbRecord: MinsSummaryDB = {
			date: record.date,
			total_mins: record.totalMins,
			week_day: record.weekday.trim(),
			log_count: record.logCount,
		};

		return dbRecord;
	}
	#toClient(record: MinsSummaryDB): MinsSummaryClient {
		const clientRecord: MinsSummaryClient = {
			date: record.date,
			totalMins: record.total_mins,
			weekday: record.week_day.trim(),
			logCount: record.log_count,
		};

		return clientRecord;
	}
	toDBOne(record: MinsSummaryClient): MinsSummaryDB {
		return this.#toDB(record);
	}
	toClientOne(record: MinsSummaryDB): MinsSummaryClient {
		return this.#toClient(record);
	}

	toClient(records: MinsSummaryDB[]): MinsSummaryClient[] {
		if (!records || !records.length) return [];

		return records.map(this.#toClient);
	}
	toDB(records: MinsSummaryClient[]): MinsSummaryDB[] {
		if (!records || !records.length) return [];

		return records.map(this.#toDB);
	}
}

class UserWorkoutPlanNormalizer {
	#toClient(record: UserWorkoutPlanDB): UserWorkoutPlanClient {
		const clientRecord: UserWorkoutPlanClient = {
			workoutID: record.workout_id,
			workoutName: record.workout_name,
			workoutDesc: record.workout_desc,
			workoutTypeID: record.workout_type_id,
			planID: record.plan_id,
			planName: record.plan_name,
			planDesc: record.plan_desc,
			planMins: record.target_mins,
			planWeight: record.target_weight,
			planReps: record.target_reps,
			planSets: record.target_sets,
			createdDate: record.created_date,
			isActive: record.is_active,
		};

		return clientRecord;
	}

	toClientOne(record: UserWorkoutPlanDB): UserWorkoutPlanClient {
		return this.#toClient(record);
	}
	toClient(records: UserWorkoutPlanDB[]): UserWorkoutPlanClient[] {
		return records.map(this.#toClient);
	}
}

class WorkoutNormalizer {
	#toClient(record: UserWorkoutDB): UserWorkoutClient {
		const clientRecord: UserWorkoutClient = {
			userID: record.user_id,
			workoutID: record.workout_id,
			planID: record.plan_id,
			name: record.workout_name,
			desc: record.workout_desc,
			createdDate: record.created_date,
			isActive: record.is_active,
		};

		return clientRecord;
	}

	toClient(records: UserWorkoutDB[]): UserWorkoutClient[] {
		if (!records || !records.length) return [];

		return records.map(this.#toClient);
	}
}

const eventsNormalizer = new EventsNormalizer();
const historyNormalizer = new HistoryNormalizer();
const schedulesNormalizer = new SchedulesNormalizer();
const summaryNormalizer = new MonthlySummaryNormalizer();
const eventDetailsNormalizer = new EventDetailsNormalizer();
const workoutEventNormalizer = new WorkoutEventNormalizer();
const minsSummaryNormalizer = new DailyMinsSummaryNormalizer();
const eventInstancesNormalizer = new EventInstancesNormalizer();
const workoutPlanNormalizer = new UserWorkoutPlanNormalizer();
const workoutNormalizer = new WorkoutNormalizer();

export {
	summaryNormalizer,
	eventsNormalizer,
	eventDetailsNormalizer,
	eventInstancesNormalizer,
	schedulesNormalizer,
	historyNormalizer,
	workoutEventNormalizer,
	minsSummaryNormalizer,
	workoutPlanNormalizer,
	workoutNormalizer,
};
