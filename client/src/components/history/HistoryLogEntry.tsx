import styles from "../../css/history/HistoryLogEntry.module.scss";
import sprite from "../../assets/icons/calendar.svg";
import { WorkoutLogEntry } from "../../features/workoutHistory/types";
import { getDate, getYear } from "date-fns";
import { getMonthlySuffix } from "../../utils/utils_recurring";
import { formatDate, getDistanceToNow } from "../../utils/utils_dates";

// THIS IS USED FOR BOTH AD-HOC LOG ENTRIES AND WORKOUT PLAN ENTRIES

type Props = { logEntry: WorkoutLogEntry };

const parseWorkoutDate = (date: string) => {
	const day: number = getWorkoutDate(date);
	const suffix: string = getSuffix(day);
	const month: string = formatDate(date, "month");
	const year: number = getYear(date);
	const dist = getDistanceToNow(date);

	return {
		day,
		suffix,
		month,
		year,
		distance: dist,
	};
};

const getWorkoutDate = (date: string) => {
	const parsed = date;
	return getDate(parsed);
};
const getSuffix = (dayOfMonth: number) => {
	const suffix = getMonthlySuffix(dayOfMonth);

	return suffix;
};

const HistoryLogEntry = ({ logEntry }: Props) => {
	const { date, workoutType, reps, sets, weight, mins } = logEntry;
	const dateParts = parseWorkoutDate(date);
	const formatted = formatDate(date, "long");

	return (
		<div className={styles.HistoryLogEntry}>
			<div className={styles.HistoryLogEntry_top}>
				<div className={styles.HistoryLogEntry_top_title}>
					<h3>{workoutType}</h3>
					<div className={styles.HistoryLogEntry_top_title_when}>
						{/* {dateParts.distance} ago */}
						{formatted}
					</div>
				</div>
				<div className={styles.HistoryLogEntry_top_options}>
					<svg className={styles.HistoryLogEntry_top_options_icon}>
						<use xlinkHref={`${sprite}#icon-keyboard_control`}></use>
					</svg>
				</div>
			</div>
			{/*  */}
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default HistoryLogEntry;
