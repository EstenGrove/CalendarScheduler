import styles from "../../css/workouts/StatusBadge.module.scss";
import { StatusKey } from "../../utils/utils_status";

type Props = {
	status: StatusKey;
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
const Cancelled = () => {
	return (
		<div className={styles.Cancelled}>
			<div className={styles.Cancelled_dot}></div>
			<div className={styles.Cancelled_label}>Cancelled</div>
		</div>
	);
};

const StatusBadge = ({ status }: Props) => {
	return (
		<>
			{status === "COMPLETE" && <Completed />}
			{status === "NOT-COMPLETE" && <NotComplete />}
			{status === "IN-PROGRESS" && <InProgress />}
			{status === "PAST-DUE" && <PastDue />}
			{status === "CANCELLED" && <Cancelled />}
		</>
	);
};

export default StatusBadge;
