import { useEffect } from "react";
import styles from "../../css/summary/WeekSummary.module.scss";
import { DailyMinsSummaryList } from "../../features/summary/types";
import { useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import {
	selectDailySummary,
	selectIsLoadingMins,
	selectWeeklySummary,
} from "../../features/summary/summarySlice";
import { getWeekStartAndEnd } from "../../utils/utils_calendar";
import { formatDate } from "../../utils/utils_dates";
import {
	fetchDailyMinsSummary,
	fetchWeeklyTotals,
} from "../../features/summary/operations";
import { CurrentUser } from "../../features/user/types";
// components
import SummaryCard from "./SummaryCard";
import Loader from "../ui/Loader";
import BarSummary from "./BarSummary";
import ScoreCard from "./ScoreCard";
import { formatLargeNumber } from "../../utils/utils_misc";

type Props = {
	currentUser: CurrentUser;
};

const processSummaryData = (summary: DailyMinsSummaryList): number[] => {
	if (!summary) return [];

	const data = summary.map((record) => {
		return record.totalMins;
	});

	return data;
};

const WeekSummary = ({ currentUser }: Props) => {
	const dispatch = useAppDispatch();
	const isLoadingMins = useSelector(selectIsLoadingMins);
	const dailySummary = useSelector(selectDailySummary);
	const weeklySummary = useSelector(selectWeeklySummary);
	const summary = dailySummary?.list as DailyMinsSummaryList;
	const { totalMins, totalReps, totalSteps, totalNumOfWorkouts } =
		weeklySummary;

	// fetch summary data
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}
		const { userID } = currentUser;
		const weekRange = getWeekStartAndEnd();
		const startDate = formatDate(weekRange.startDate, "db");
		const endDate = formatDate(weekRange.endDate, "db");

		const getSummaryData = () => {
			// fetch mins & totals summary
			Promise.all([
				dispatch(
					fetchDailyMinsSummary({
						userID,
						startDate,
						endDate,
					})
				),
				dispatch(
					fetchWeeklyTotals({
						userID,
						startDate,
						endDate,
					})
				),
			]);
		};

		getSummaryData();

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.WeekSummary}>
			<div className={styles.WeekSummary_week}>
				<SummaryCard title="Recent Activity">
					{isLoadingMins && <Loader />}
					{!isLoadingMins && <BarSummary data={processSummaryData(summary)} />}
				</SummaryCard>
			</div>
			<div className={styles.WeekSummary_scores}>
				<ScoreCard
					title="This Week"
					value={totalMins as number}
					label="mins."
					scoreColor="var(--accent)"
				/>
				<ScoreCard
					title="Workouts"
					value={totalNumOfWorkouts}
					label="workouts"
				/>
			</div>
			<div className={styles.WeekSummary_scores}>
				<ScoreCard title="Reps" value={totalReps} label="reps" />
				<ScoreCard
					title="Steps"
					value={formatLargeNumber(totalSteps as number)}
					label="steps"
				/>
			</div>
		</div>
	);
};

export default WeekSummary;
