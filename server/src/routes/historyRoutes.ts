import { type Context, Hono } from "hono";
import { getResponseError, getResponseOk } from "../utils/data";
import { historyService } from "../services";
import type { CreateLogValues, WorkoutLogClient } from "../services/types";
import { formatDate } from "../utils/dates";

const app = new Hono();

const prepareLogEntry = (log: CreateLogValues) => {
	const {
		startTime = new Date().toString(),
		endTime = new Date().toString(),
		workoutDate = formatDate(new Date(), "db").toString(),
	} = log;

	return {
		...log,
		startTime,
		endTime,
		workoutDate: workoutDate,
	};
};

app.post("/createLog", async (ctx: Context) => {
	const { userID, workoutLog } = await ctx.req.json();
	// prepare record before insert!!!
	const cleanRecord = prepareLogEntry(workoutLog);

	// const record = await historyService.createLog(userID, cleanRecord);
	const record = cleanRecord;

	if (record instanceof Error) {
		const errResp = getResponseError(record);
		return ctx.json(errResp);
	}

	const response = getResponseOk({
		UserID: userID,
		Record: record,
		Clean: cleanRecord,
	});

	return ctx.json(response);
});

export default app;
