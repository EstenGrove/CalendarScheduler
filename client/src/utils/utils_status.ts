import { isAfter } from "date-fns";

export type StatusKey =
	| "COMPLETE"
	| "NOT-COMPLETE"
	| "IN-PROGRESS"
	| "CANCELLED"
	| "PAST-DUE";

export interface StatusParams {
	hasStarted: boolean;
	dueDate: Date | string;
}

const getStatusKey = (
	isCompleted: boolean,
	isCancelled: boolean,
	params: StatusParams
): StatusKey => {
	if (isCompleted) return "COMPLETE";
	if (isCancelled) return "CANCELLED";
	if (params.hasStarted) return "IN-PROGRESS";
	const isPast = isAfter(new Date(), params.dueDate);
	if (isPast) return "PAST-DUE";

	return "NOT-COMPLETE";
};

export { getStatusKey };
