import { eachDayOfInterval } from "date-fns";
import styles from "../../css/summary/DynamicBarSummary.module.scss";
import { formatDateAsWeekDay, parseDate } from "../../utils/utils_dates";
import { CustomDateRange } from "../../features/summary/types";

type Props = {
	data: Array<number>;
	dateRange: CustomDateRange;
};

// ['S', 'M', 'T', 'W, 'T', 'F', 'S']

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

const getWeekdayLabels = (startDate: Date | string, endDate: Date | string) => {
	const parsedStart = parseDate(startDate.toString(), "input");
	const parsedEnd = parseDate(endDate.toString(), "input");
	const dates = eachDayOfInterval({
		start: parsedStart,
		end: parsedEnd,
	});
	const weekdays = dates.map((date) => {
		const weekday = formatDateAsWeekDay(date);
		return weekday.slice(0, 1);
	});

	return weekdays;
};

type WeekDayProps = {
	startDate: Date | string;
	endDate: Date | string;
};
const WeekDayLabels = ({ startDate, endDate }: WeekDayProps) => {
	const weekDays = getWeekdayLabels(startDate, endDate);
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

const DynamicBarSummary = ({ data, dateRange }: Props) => {
	return (
		<div className={styles.DynamicBarSummary}>
			<div className={styles.DynamicBarSummary_graph}>
				{data.map((dayData, idx) => (
					<WeekDayBar key={`${dayData}-${idx}`} value={dayData} />
				))}
			</div>
			<div className={styles.DynamicBarSummary_labels}>
				<WeekDayLabels
					startDate={dateRange.startDate}
					endDate={dateRange.endDate}
				/>
			</div>
		</div>
	);
};

export default DynamicBarSummary;
