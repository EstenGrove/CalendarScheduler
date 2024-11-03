import { getDate, isToday } from "date-fns";
import styles from "../../css/calendar/MobileCalendarDay.module.scss";
import { isInMonth } from "../../utils/utils_calendar";
import { CSSProperties } from "react";

type Props = {
	day: Date;
	month: number; // zero-based month index
	onSelect: () => void;
	hasEvent: boolean;
	isSelected: boolean;
};

type TodayProps = {
	day: number;
};

const getDayStyles = (day: Date, currentMonth: number) => {
	const inMonth = isInMonth(currentMonth, day);

	if (!inMonth) {
		return {
			color: "grey",
			opacity: ".4",
		};
	} else {
		return {
			opacity: "1",
		};
	}
};

const EventBadge = () => {
	return <div className={styles.EventBadge}></div>;
};

const Today = ({ day }: TodayProps) => {
	return (
		<div className={styles.Today}>
			<div className={styles.Today_date}>{day}</div>
		</div>
	);
};
type SelectedDateProps = {
	day: number;
};
const SelectedDate = ({ day }: SelectedDateProps) => {
	return (
		<div className={styles.SelectedDate}>
			<div className={styles.SelectedDate_date}>{day}</div>
		</div>
	);
};

const getDateDisplay = (
	date: number,
	isSelected: boolean,
	isToday: boolean
) => {
	switch (true) {
		case isSelected: {
			return <SelectedDate day={date} />;
		}
		case isToday: {
			return <Today day={date} />;
		}

		default:
			return <div>{date}</div>;
	}
};

const MobileCalendarDay = ({
	day,
	month,
	onSelect,
	hasEvent = false,
	isSelected = false,
}: Props) => {
	const date: number = getDate(day);
	const today: boolean = isToday(day);
	const css: CSSProperties = getDayStyles(day, month);

	return (
		<div
			className={styles.MobileCalendarDay}
			data-day-idx={date}
			data-day-month={month}
			style={css}
			onClick={onSelect}
		>
			<div className={styles.MobileCalendarDay_inner}>
				{getDateDisplay(date, isSelected, today)}
				{hasEvent && <EventBadge />}
			</div>
		</div>
	);
};

export default MobileCalendarDay;
