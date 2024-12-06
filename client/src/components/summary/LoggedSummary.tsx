import styles from "../../css/summary/LoggedSummary.module.scss";
import {
	LogRangeSummary,
	WorkoutLogSummary,
} from "../../features/workoutHistory/types";
import SummaryTotal from "./SummaryTotal";

type Props = {
	summary: LogRangeSummary;
};

// Summary Details:
// - Logged workouts (number of log entries) (eg. "4 Workouts logged today/this-week/this-month/etc")
// - Total number of mins (eg. "46 mins logged today")
// - Number of different workout types (eg. "3 different workouts logged.")

const fakeSummary: WorkoutLogSummary = {
	totalMins: 133,
	totalReps: 118,
	totalMiles: 4.7,
	totalSteps: 9505,
	totalNumOfWorkouts: 4,
	totalNumOfWorkoutTypes: 3,
};

const fakeLogSummary: LogRangeSummary = {
	details: fakeSummary,
	byType: [],
};

const LoggedSummary = ({ summary = fakeLogSummary }: Props) => {
	const { details } = summary;

	return (
		<div className={styles.LoggedSummary}>
			<div className={styles.LoggedSummary_inner}>
				<SummaryTotal
					total={details.totalMins}
					label="mins."
					style={{ color: "var(--accent)" }}
				/>
				<SummaryTotal total={details.totalReps} label="reps" />
				<SummaryTotal total={details.totalMiles} label="miles" />
			</div>
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default LoggedSummary;
