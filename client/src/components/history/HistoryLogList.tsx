import styles from "../../css/history/HistoryLogList.module.scss";
import { WorkoutLogEntry } from "../../features/workoutHistory/types";
import HistoryLogEntry from "./HistoryLogEntry";

type Props = {
	workoutLogs: WorkoutLogEntry[];
};

const NoData = () => {
	return (
		<div className={styles.NoData}>
			<div>No data found for this query.</div>
		</div>
	);
};

const HistoryLogList = ({ workoutLogs }: Props) => {
	return (
		<div className={styles.HistoryLogList}>
			{(!workoutLogs || workoutLogs?.length <= 0) && <NoData />}
			{workoutLogs &&
				workoutLogs.length > 0 &&
				workoutLogs.map((logEntry, idx) => (
					<HistoryLogEntry key={idx} logEntry={logEntry} />
				))}
		</div>
	);
};

export default HistoryLogList;
