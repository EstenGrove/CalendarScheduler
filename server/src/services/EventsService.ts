import type { Pool } from "pg";
import type { CreateEventVals } from "./types";

class EventsService {
	#db: Pool;
	constructor(db: Pool) {
		this.#db = db;
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
	async createEventTag(userID: string, newEvent: CreateEventVals) {
		const { eventID, tagName, tagColor } = newEvent;
		try {
			// do stuff
			const query = `SELECT * FROM create_calendar_tag(
				$1,
				$2,
				$3
			)`;
			const results = await this.#db.query(query, [userID, eventID, tagName]);
		} catch (error) {}
	}
}

export { EventsService };
