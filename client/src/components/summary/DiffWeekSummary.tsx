import { ReactNode } from "react";
import styles from "../../css/summary/DiffWeekSummary.module.scss";
import { formatDate, formatDateAsWeekDay } from "../../utils/utils_dates";
import { eachDayOfInterval, subDays, subWeeks } from "date-fns";

interface DiffDay {
	value: number;
	date: Date | string;
}

type Props = {
	data: {
		lastWeek: DiffDay[];
		thisWeek: DiffDay[];
	};
};

const dayMinsRange = {
	min: 0,
	max: 240, // max # of mins to workout a day
	// max: 1440, // # of mins in a day
	// max: 1080, // 18 hrs in mins
};

const getHeightFromValue = (valueInMins: number = 0) => {
	const percentage = valueInMins / dayMinsRange.max;
	const value = percentage * 600;
	return value > 100 ? 100 : value;
};

type WeekDayProps = {
	weekDays: string[];
};

const WeekDayLabels = ({ weekDays }: WeekDayProps) => {
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
	diffValue: number;
	value: number;
	color: string;
};

const WeekDayBar = ({ diffValue, value, color }: BarProps) => {
	const height: number = getHeightFromValue(value);
	const css = {
		height: height + "%",
		minHeight: height + "%",
		maxHeight: height + "%",
		backgroundColor: color,
	};

	if (value === 0) {
		const noHeight: number = getHeightFromValue(diffValue);
		const noDataCSS = {
			height: noHeight + "%",
			minHeight: noHeight + "%",
			maxHeight: noHeight + "%",
			backgroundColor: "var(--blueGrey900)",
			backgroundImage:
				"repeating-linear-gradient(45deg, var(--blueGrey600) 0, var(--blueGrey600) 8px, var(--blueGrey900) 8px, var(--blueGrey900) 16px)",
			opacity: ".1",
		};
		return (
			<div className={styles.NoWeekDayBar}>
				<div
					className={styles.NoWeekDayBar_value}
					style={value === 0 ? noDataCSS : css}
				></div>
			</div>
		);
	}

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

const createDummyData = () => {
	const thisWeekStart = subDays(new Date(), 6);
	const thisWeekEnd = new Date();

	const lastWeekStart = subWeeks(thisWeekStart, 1);
	const lastWeekEnd = subWeeks(thisWeekEnd, 1);

	const thisWeekDays = eachDayOfInterval({
		start: thisWeekStart,
		end: thisWeekEnd,
	});
	const lastWeekDays = eachDayOfInterval({
		start: lastWeekStart,
		end: lastWeekEnd,
	});

	const fakeThisWeek: DiffDay[] = thisWeekDays.map((day, idx) => ({
		date: day,
		value: idx < 3 ? idx + 17 : idx + 21,
	}));
	const fakeLastWeek: DiffDay[] = lastWeekDays.map((day, idx) => ({
		date: day,
		value: idx < 3 ? idx + 17 : idx + 21,
	}));

	return {
		thisWeek: fakeThisWeek,
		lastWeek: fakeLastWeek,
	};
};

const dummy = createDummyData();

interface DiffDay {
	value: number;
	date: Date | string;
}

const getDayLabels = (thisWeek: DiffDay[]) => {
	const dayLabels = thisWeek.map((day) => {
		const weekdate = formatDateAsWeekDay(day.date);
		return weekdate.slice(0, 1);
	});

	return dayLabels;
};

const DiffWeekSummary = ({ data = dummy }: Props) => {
	const { lastWeek, thisWeek } = data;
	const dayLabels = getDayLabels(thisWeek);

	return (
		<div className={styles.DiffWeekSummary}>
			<div className={styles.DiffWeekSummary_graph}>
				{lastWeek.map((lastDay, idx) => {
					const thisDay: DiffDay = thisWeek[idx];
					const dateKey = formatDate(thisDay.date, "db");

					return (
						<GroupedDays key={`GROUPED:${dateKey}-${idx}`}>
							<WeekDayBar
								key={`LAST-WEEK:${lastDay.value}--${idx}`}
								value={lastDay.value}
								diffValue={thisDay.value}
								color="var(--blueGrey700)"
							/>
							<WeekDayBar
								key={`THIS-WEEK:${thisDay.value}--${idx + 1}`}
								value={thisDay.value}
								diffValue={lastDay.value}
								color="var(--accent-green)"
							/>
						</GroupedDays>
					);
				})}
			</div>
			<div className={styles.DiffWeekSummary_labels}>
				<WeekDayLabels weekDays={dayLabels} />
			</div>
		</div>
	);
};

export default DiffWeekSummary;
