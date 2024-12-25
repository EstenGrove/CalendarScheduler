import { Hono, type Context } from "hono";
import { getResponseError, getResponseOk } from "../utils/data";
import { summaryService } from "../services";
import { minsSummaryNormalizer } from "../utils/normalizing";
import type { MinsSummaryClient, MinsSummaryDB } from "../services/types";
import { groupBy, type TRecord } from "../utils/processing";
import type { RangeTotals } from "../services/SummaryService";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

// Summary view: /dashboard/summary/(day|week|month|year|range)
// => /getDashboardSummary/:(day|week|month|year|range)
app.get("/getDashboardSummary/:type", async (ctx: Context) => {
	const param = ctx.req.param();
	const { userID, startDate, endDate } = ctx.req.query();

	const response = getResponseOk({
		message: "",
	});

	return ctx.json(response);
});

app.get("/getDailyMinsSummary", async (ctx: Context) => {
	const { userID, startDate, endDate } = ctx.req.query();

	const minsRecords = (await summaryService.getDailyMins(userID, {
		startDate,
		endDate,
	})) as MinsSummaryDB[];

	if (minsRecords instanceof Error) {
		const errResp = getResponseError(minsRecords);

		return ctx.json(errResp);
	}

	const dailyMinsSummary = minsSummaryNormalizer.toClient(minsRecords);
	const grouped = groupBy("weekday", [...dailyMinsSummary]);

	const response = getResponseOk({
		summary: dailyMinsSummary,
		summaryByDay: grouped,
	});

	return ctx.json(response);
});

app.get("/getWeeklyTotals", async (ctx: Context) => {
	const { userID, startDate, endDate } = ctx.req.query();

	const summary = (await summaryService.getTotalsInRange(userID, {
		startDate,
		endDate,
	})) as RangeTotals[];

	if (summary instanceof Error) {
		const errResp = getResponseError(summary, {
			weeklySummary: {},
		});

		return ctx.json(errResp);
	}

	const summaryRecord = summary?.[0];

	const response = getResponseOk({
		weeklySummary: {
			totalMins: summaryRecord.total_mins || 0,
			totalReps: summaryRecord.total_reps || 0,
			totalMiles: summaryRecord.total_miles || 0,
			totalSteps: summaryRecord.total_steps || 0,
			totalNumOfWorkouts: summaryRecord.total_workouts || 0,
			totalNumOfWorkoutTypes: summaryRecord.total_workout_types || 0,
		},
	});

	return ctx.json(response);
});

app.get("/getRangeSummary", async (ctx: Context) => {
	const { userID, startDate, endDate } = ctx.req.query();

	const rawSummary = (await summaryService.getTotalsInRange(userID, {
		startDate,
		endDate,
	})) as RangeTotals[];

	const rawMins = (await summaryService.getDailyMins(userID, {
		startDate,
		endDate,
	})) as MinsSummaryDB[];

	if (rawSummary instanceof Error) {
		const errResp = getResponseError(rawSummary, {
			weeklySummary: {},
		});

		return ctx.json(errResp);
	}
	if (rawMins instanceof Error) {
		const errResp = getResponseError(rawMins, {
			weeklySummary: {},
		});

		return ctx.json(errResp);
	}

	const summaryRecord = rawSummary?.[0] as RangeTotals;
	const perDayMins = minsSummaryNormalizer.toClient(
		rawMins
	) as MinsSummaryClient[];
	const grouped = groupBy("weekday", [
		...perDayMins,
	]) as TRecord<MinsSummaryClient>;

	const response = getResponseOk({
		perDay: perDayMins,
		dateRange: {
			startDate,
			endDate,
		},
		rangeSummary: {
			totalMins: summaryRecord.total_mins || 0,
			totalReps: summaryRecord.total_reps || 0,
			totalMiles: summaryRecord.total_miles || 0,
			totalSteps: summaryRecord.total_steps || 0,
			totalNumOfWorkouts: summaryRecord.total_workouts || 0,
			totalNumOfWorkoutTypes: summaryRecord.total_workout_types || 0,
		},
		groupedByDay: grouped,
	});

	return ctx.json(response);
});

export default app;
