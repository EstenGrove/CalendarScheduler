import styles from "../../css/history/HistoryLogList.module.scss";
import { WorkoutLogEntry } from "../../features/workoutHistory/types";
import HistoryLogEntry from "./HistoryLogEntry";

type Props = {
	workoutLogs: WorkoutLogEntry[];
};

const HistoryLogList = ({ workoutLogs }: Props) => {
	return (
		<div className={styles.HistoryLogList}>
			{workoutLogs &&
				workoutLogs.length &&
				workoutLogs.map((logEntry, idx) => (
					<HistoryLogEntry key={idx} logEntry={logEntry} />
				))}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default HistoryLogList;
