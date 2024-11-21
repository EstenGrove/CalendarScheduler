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

const eventsNormalizer = new EventsNormalizer();
const schedulesNormalizer = new SchedulesNormalizer();
const summaryNormalizer = new MonthlySummaryNormalizer();
const eventDetailsNormalizer = new EventDetailsNormalizer();
const eventInstancesNormalizer = new EventInstancesNormalizer();

export {
	summaryNormalizer,
	eventsNormalizer,
	eventDetailsNormalizer,
	eventInstancesNormalizer,
	schedulesNormalizer,
};
