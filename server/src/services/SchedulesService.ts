import type { Pool } from "pg";

class SchedulesService {
	#db: Pool;
	constructor(db: Pool) {
		this.#db = db;
	}

	async getSchedulesForRange(start: string, end: string) {
		try {
			// Date Format: "2024-11-01" - "2024-11-30"
			const query = `
        SELECT * FROM calendar_event_schedules
        WHERE start_date::date <@ daterange($1, $2, '[]');  
      `;
			const results = await this.#db.query(query, [start, end]);
			const rows = results?.rows;
			return rows;
		} catch (error) {
			return error;
		}
	}
}

export { SchedulesService };
