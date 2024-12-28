import { ReactNode } from "react";
import styles from "../../css/summary/DiffWeekSummary.module.scss";
import { WEEK_DAYS } from "../../utils/utils_dates";

type Props = {
	data: {
		lastWeek: number[];
		thisWeek: number[];
	};
};

// ['S', 'M', 'T', 'W, 'T', 'F', 'S']
const weekDays: string[] = [...WEEK_DAYS].map((day) => day.slice(0, 1));

const dayMinsRange = {
	min: 0,
	// max: 180, // max # of mins to workout a day
	max: 240, // max # of mins to workout a day
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
	color: string;
};

const WeekDayBar = ({ value, color }: BarProps) => {
	const height: number = getHeightFromValue(value);
	const css = {
		height: height + "%",
		minHeight: height + "%",
		maxHeight: height + "%",
		backgroundColor: color,
	};
	return (
		<div className={styles.WeekDayBar}>
			<div className={styles.WeekDayBar_value} style={css}></div>
		</div>
	);
};

// Groups last week's 'X' day with this week's 'X' day
type GroupedDaysProps = {
	children?: ReactNode;
};
const GroupedDays = ({ children }: GroupedDaysProps) => {
	return (
		<div className={styles.GroupedDays}>
			<div className={styles.GroupedDays_inner}>{children}</div>
		</div>
	);
};

const dummy = {
	lastWeek: [31, 25, 36, 5, 18, 27, 33],
	thisWeek: [42, 26, 19, 18, 18, 22, 38],
};

const DiffWeekSummary = ({ data = dummy }: Props) => {
	const { lastWeek, thisWeek } = data;

	return (
		<div className={styles.DiffWeekSummary}>
			<div className={styles.DiffWeekSummary_graph}>
				{lastWeek.map((lastDay, idx) => {
					const thisDay: number = thisWeek[idx];
					return (
						<GroupedDays key={`GROUPED:${lastDay}`}>
							<WeekDayBar
								key={`LAST-WEEK:${lastDay}--${idx}`}
								value={lastDay}
								color="var(--blueGrey700)"
							/>
							<WeekDayBar
								key={`THIS-WEEK:${thisDay}--${idx + 1}`}
								value={thisDay}
								color="var(--accent-green)"
							/>
						</GroupedDays>
					);
				})}
			</div>
			<div className={styles.DiffWeekSummary_labels}>
				<WeekDayLabels />
			</div>
		</div>
	);
};

export default DiffWeekSummary;
