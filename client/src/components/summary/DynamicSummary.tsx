import styles from "../../css/summary/DynamicSummary.module.scss";
import SummaryCard from "./SummaryCard";
import Loader from "../ui/Loader";
import ScoreCard from "./ScoreCard";
import {
	CustomDateRange,
	DailyMinsSummaryList,
	RangeSummary,
} from "../../features/summary/types";
import { prepareBarChartData } from "../../utils/utils_summary";
import { formatLargeNumber } from "../../utils/utils_misc";
import DynamicBarSummary from "./DynamicBarSummary";

type Props = {
	isLoading: boolean;
	dateRange: CustomDateRange;
	rangeSummary: {
		perDay: DailyMinsSummaryList;
		summary: RangeSummary;
	};
};

const DynamicSummary = ({ isLoading, rangeSummary, dateRange }: Props) => {
	const { perDay, summary } = rangeSummary;
	const barChartData = prepareBarChartData(perDay);
	const { totalMins, totalReps, totalSteps, totalNumOfWorkouts } = summary;

	return (
		<div className={styles.DynamicSummary}>
			<div className={styles.DynamicSummary_week}>
				<SummaryCard title="Last 7 days">
					{isLoading && <Loader />}
					{!isLoading && (
						<DynamicBarSummary data={barChartData} dateRange={dateRange} />
					)}
				</SummaryCard>
			</div>
			<div className={styles.DynamicSummary_scores}>
				<ScoreCard
					title="Past week"
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
			<div className={styles.DynamicSummary_scores}>
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

export default DynamicSummary;
