import { type Context, Hono } from "hono";
import { getResponseError, getResponseOk } from "../utils/data";
import { historyService } from "../services";
import type { CreateLogValues, WorkoutLogDB } from "../services/types";
import { applyTimeStrToDate, formatDate, parseDate } from "../utils/dates";
import { historyNormalizer } from "../utils/normalizing";

const app = new Hono();

const prepareLogEntry = (log: CreateLogValues) => {
	const {
		startTime = new Date().toString(),
		endTime = new Date().toString(),
		date = new Date().toString(),
	} = log;

	const parsedDate = parseDate(date);
	const adjustedStart = applyTimeStrToDate(startTime, parsedDate);
	const adjustedEnd = applyTimeStrToDate(endTime, parsedDate);

	return {
		...log,
		startTime: adjustedStart,
		endTime: adjustedEnd,
		workoutDate: date,
	};
};

app.post("/createLog", async (ctx: Context) => {
	const { userID, workoutLog } = await ctx.req.json();
	// prepare record before insert!!!
	// const cleanRecord = prepareLogEntry(workoutLog);
	const cleanRecord = workoutLog;
	const record = await historyService.createLog(userID, cleanRecord);

	console.log("cleanRecord", cleanRecord);
	console.log("record", record);

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

app.get("/getWorkoutLogs", async (ctx: Context) => {
	const { userID, startDate, endDate } = ctx.req.query();

	const logRecords = (await historyService.getWorkoutLogs(userID, {
		startDate,
		endDate,
	})) as WorkoutLogDB[];

	console.log("logRecords", logRecords);
	if (logRecords instanceof Error) {
		const errResp = getResponseError(logRecords, {
			history: [],
			logs: [],
			message: "Request for history logs failed",
		});
		return ctx.json(errResp);
	}

	const workoutLogs = historyNormalizer.toClient(logRecords);

	const response = getResponseOk({
		history: [],
		logs: workoutLogs,
	});

	return ctx.json(response);
});

export default app;
