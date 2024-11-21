import { useState } from "react";
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
	baseDate: Date | string;
};

const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

type WeekDayProps = {
	weekDate: Date;
	weekDay: string;
	isSelected: boolean;
	selectDate: () => void;
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
			<div className={styles.WeekDay_date} style={css}>
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

const WeeklyHeader = ({ baseDate = new Date() }: Props) => {
	const daysInWeek = getDaysInWeek(baseDate);
	const [selectedDate, setSelectedDate] = useState<Date | string>(baseDate);

	const selectDate = (date: Date | string) => {
		setSelectedDate(date);
	};

	console.log("dayInWeek", daysInWeek);
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
							selectDate={() => selectDate(day)}
						/>
					))}
			</div>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default WeeklyHeader;
