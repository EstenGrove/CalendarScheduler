import styles from "../../css/workouts/WeeklyHeader.module.scss";
import {
	eachDayOfInterval,
	endOfWeek,
	getDate,
	getDay,
	startOfWeek,
} from "date-fns";
import { formatDate } from "../../utils/utils_dates";

type Props = {
	baseDate?: Date | string;
	selectedDate: Date | string;
	onSelect: (date: Date | string) => void;
};

const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

type WeekDayProps = {
	weekDate: Date;
	weekDay: string;
	isSelected: boolean;
	selectDate: () => void;
};

const getDateCss = (isSelected: boolean) => {
	return {
		color: isSelected ? "var(--accent)" : "",
		borderBottom: isSelected ? "1px solid var(--accent)" : "none",
	};
};

const WeekDay = ({
	weekDay,
	weekDate,
	isSelected,
	selectDate,
}: WeekDayProps) => {
	const date = getDate(weekDate);
	const css = {
		color: isSelected ? "var(--accent)" : "",
	};
	return (
		<div
			className={styles.WeekDay}
			onClick={selectDate}
			data-selected-date={isSelected}
		>
			<div className={styles.WeekDay_day} style={css}>
				{weekDay}
			</div>
			<div className={styles.WeekDay_date} style={getDateCss(isSelected)}>
				{date}
			</div>
		</div>
	);
};

const getDaysInWeek = (date: Date | string): Date[] => {
	const daysInWeek: Date[] = eachDayOfInterval({
		start: startOfWeek(date),
		end: endOfWeek(date),
	});

	return daysInWeek;
};

const isSelectedDate = (
	selectedDate: Date | string,
	weekDate: Date | string
): boolean => {
	const selected = formatDate(selectedDate, "db");
	const day = formatDate(weekDate, "db");

	return selected === day;
};

const WeeklyHeader = ({
	baseDate = new Date(),
	selectedDate,
	onSelect,
}: Props) => {
	const daysInWeek = getDaysInWeek(baseDate);

	return (
		<div className={styles.WeeklyHeader}>
			<div className={styles.WeeklyHeader_week}>
				{daysInWeek &&
					daysInWeek.map((day, idx) => (
						<WeekDay
							key={getDay(day)}
							weekDate={day}
							weekDay={weekDays[idx]}
							isSelected={isSelectedDate(selectedDate, day)}
							selectDate={() => onSelect(day)}
						/>
					))}
			</div>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default WeeklyHeader;
