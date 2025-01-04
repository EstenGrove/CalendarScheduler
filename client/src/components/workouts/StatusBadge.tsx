import styles from "../../css/workouts/StatusBadge.module.scss";
import { StatusKey } from "../../utils/utils_status";

type Props = {
	statusKey: StatusKey;
};

const Completed = () => {
	return (
		<div className={styles.Completed}>
			<div className={styles.Completed_dot}></div>
			<div className={styles.Completed_label}>Done</div>
		</div>
	);
};
const NotComplete = () => {
	return (
		<div className={styles.NotComplete}>
			<div className={styles.NotComplete_dot}></div>
			<div className={styles.NotComplete_label}>Not-Done</div>
		</div>
	);
};
const InProgress = () => {
	return (
		<div className={styles.InProgress}>
			<div className={styles.InProgress_dot}></div>
			<div className={styles.InProgress_label}>In-Progress</div>
		</div>
	);
};
const PastDue = () => {
	return (
		<div className={styles.PastDue}>
			<div className={styles.PastDue_dot}></div>
			<div className={styles.PastDue_label}>Past-Due</div>
		</div>
	);
};

const StatusBadge = ({ statusKey }: Props) => {
	return (
		<>
			{statusKey === "COMPLETE" && <Completed />}
			{statusKey === "NOT-COMPLETE" && <NotComplete />}
			{statusKey === "IN-PROGRESS" && <InProgress />}
			{statusKey === "PAST-DUE" && <PastDue />}
		</>
	);
};

export default StatusBadge;
