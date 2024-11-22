import type { Pool } from "pg";
import type { CreateEventVals, MonthlyEventSummaryDB } from "./types";

export interface NewTagVals {
	eventID: number;
	userID: string;
	tagName: string;
	tagColor: string;
}

class EventsService {
	#db: Pool;
	constructor(db: Pool) {
		this.#db = db;
	}

	async getMonthlySummary(
		userID: string,
		startDate: Date | string,
		endDate: Date | string
	): Promise<MonthlyEventSummaryDB[] | unknown> {
		try {
			const query = `SELECT * FROM check_events_by_month_range($1, $2);`;
			const results = await this.#db.query(query, [startDate, endDate]);
			const rows = results?.rows;
			console.log("rows", rows);
			return rows;
		} catch (error) {
			return error;
		}
	}

	async createEvent(userID: string, newEvent: CreateEventVals) {
		const {
			title,
			desc,
			startDate,
			endDate,
			startTime,
			endTime,
			isRecurring,
			frequency,
			interval,
			byDay,
			byMonthDay,
			byMonth,
		} = newEvent;
		try {
			const query = `SELECT * FROM create_calendar_event(
        $1,
        $2,
        $3::date,
        $4::date,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11
      )`;
			const results = await this.#db.query(query, [
				title,
				desc,
				startDate,
				endDate,
				startTime,
				endTime,
				frequency,
				interval,
				byDay,
				byMonthDay,
				byMonth,
			]);
			const rows = results?.rows;
			console.log("results", results);
			console.log("rows", rows);
			return rows;
		} catch (error) {
			return error;
		}
	}
	async createEventRecord(userID: string, newEvent: CreateEventVals) {
		const { title, desc, startDate, endDate, startTime, endTime } = newEvent;

		try {
			const query = `
				INSERT INTO calendar_events (
					event_name,
					event_desc,
					start_date,
					end_date,
					start_time,
					end_time
				) VALUES (
					$1, $2, $3, $4, $5, $6  
				) RETURNING *;
			`;
			const results = await this.#db.query(query, [
				title,
				desc,
				startDate,
				endDate,
				startTime,
				endTime,
			]);
			const record = results?.rows;
			console.log("results", results);
			console.log("record", record);
			return record;
		} catch (error) {
			return error;
		}
	}
	async createEventSchedule(eventID: number, newEvent: CreateEventVals) {
		const {
			startDate,
			endDate,
			startTime,
			endTime,
			frequency,
			interval,
			byDay,
			byMonth = 0,
			byMonthDay = 0,
		} = newEvent;

		try {
			const query = `
				INSERT INTO calendar_event_schedules (
					event_id,
					start_date,
					end_date,
					interval,
					frequency,
					by_day,
					by_month_day,
					by_month
				) VALUES (
					$1,
					$2,
					$3, 
					$4, 
					$5, 
					$6, 
					$7, 
					$8 
				) RETURNING *;
			`;
			const results = await this.#db.query(query, [
				eventID,
				startDate,
				endDate,
				interval,
				frequency,
				byDay,
				byMonthDay,
				byMonth,
			]);
			console.log("results", results);
			const row = results?.rows;
			return row;
		} catch (error) {
			return error;
		}
	}
	async createEventTag(userID: string, newTag: NewTagVals) {
		const { eventID, tagName, tagColor } = newTag;
		try {
			// do stuff
			const query = `SELECT * FROM create_calendar_tag(
				$1,
				$2,
				$3,
				$4
			)`;
			// UserID, TagName, TagColor, IsActive
			const results = await this.#db.query(query, [
				userID,
				tagName,
				tagColor,
				true,
			]);
			const row = results?.rows?.[0];
			return row;
		} catch (error) {}
	}
}

export { EventsService };
