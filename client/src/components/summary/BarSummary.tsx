import styles from "../../css/summary/BarSummary.module.scss";
import { WEEK_DAYS } from "../../utils/utils_dates";

type Props = {
	data: Array<number>;
};

// ['S', 'M', 'T', 'W, 'T', 'F', 'S']
const weekDays: string[] = [...WEEK_DAYS].map((day) => day.slice(0, 1));

const dayMinsRange = {
	min: 0,
	max: 180, // max # of mins to workout a day
	// max: 1440, // # of mins in a day
	// max: 1080, // 18 hrs in mins
};

const getHeightFromValue = (valueInMins: number = 0) => {
	const percentage = valueInMins / dayMinsRange.max;

	return percentage * 600;
	// return percentage * 7000;
};

const WeekDayLabels = () => {
	return (
		<div className={styles.WeekDayLabels}>
			{weekDays.map((day, idx) => (
				<div key={day + idx} className={styles.WeekDayLabels_day}>
					{day}
				</div>
			))}
		</div>
	);
};

type BarProps = {
	value: number;
};

const WeekDayBar = ({ value }: BarProps) => {
	const height: number = getHeightFromValue(value);
	const css = {
		height: height + "%",
		minHeight: height + "%",
		maxHeight: height + "%",
	};
	return (
		<div className={styles.WeekDayBar}>
			<div className={styles.WeekDayBar_value} style={css}></div>
		</div>
	);
};

const BarSummary = ({ data }: Props) => {
	return (
		<div className={styles.BarSummary}>
			<div className={styles.BarSummary_graph}>
				{data.map((dayData, idx) => (
					<WeekDayBar key={`${dayData}-${idx}`} value={dayData} />
				))}
			</div>
			<div className={styles.BarSummary_labels}>
				<WeekDayLabels />
			</div>
		</div>
	);
};

export default BarSummary;
