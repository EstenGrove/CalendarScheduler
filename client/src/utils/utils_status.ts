import { isAfter } from "date-fns";

export type StatusKey =
	| "COMPLETE"
	| "NOT-COMPLETE"
	| "IN-PROGRESS"
	| "PAST-DUE";

export interface StatusParams {
	hasStarted: boolean;
	dueDate: Date | string;
}

const getStatusKey = (
	isCompleted: boolean,
	params: StatusParams
): StatusKey => {
	if (isCompleted) return "COMPLETE";
	if (params.hasStarted) return "IN-PROGRESS";
	const isPast = isAfter(new Date(), params.dueDate);
	if (isPast) return "PAST-DUE";

	return "NOT-COMPLETE";
};

export { getStatusKey };
