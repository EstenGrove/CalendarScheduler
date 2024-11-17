import type {
	MonthlyEventSummaryClient,
	MonthlyEventSummaryDB,
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

const summaryNormalizer = new MonthlySummaryNormalizer();

export { summaryNormalizer };
