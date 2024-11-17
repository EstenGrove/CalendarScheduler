import type {
	MonthlyEventSummaryClient,
	MonthlyEventSummaryDB,
} from "../services/types";
import { formatDate } from "./dates";

const createMonthlySummaryMap = (eventsSummary: MonthlyEventSummaryDB[]) => {
	const grouped = {} as Record<string, boolean>;

	for (let i = 0; i < eventsSummary.length; i++) {
		const entry: MonthlyEventSummaryDB = eventsSummary[i];
		const entryDate: string = formatDate(entry.target_date, "db");

		if (!grouped[entryDate]) {
			grouped[entryDate] = entry.has_event;
		}
	}

	return grouped;
};

export { createMonthlySummaryMap };
