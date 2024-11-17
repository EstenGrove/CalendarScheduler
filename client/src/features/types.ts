import { CalendarEvent, CalendarEventSchedule } from "./events/types";

export type TStatus = "IDLE" | "PENDING" | "FULFILLED" | "REJECTED";

export type TResponseStatus = "SUCCESS" | "FAIL";
export type TResponse<T> = {
	Status: TStatus;
	Data: T | Record<string, string>;
	Message: string;
	ErrorMsg: string | null;
	StackTrace: string | null;
};

export type AsyncResponse<T> = Promise<TResponse<T> | unknown>;
export type AwaitedResponse<T> = TResponse<T>;

export interface DateRange {
	startDate: string;
	endDate: string;
}
