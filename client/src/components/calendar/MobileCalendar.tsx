import { useState } from "react";
import styles from "../../css/calendar/MobileCalendar.module.scss";
import {
	CalendarWeek,
	generateWeeksAndDates,
} from "../../utils/utils_calendar";
import { MonthlySummary } from "../../features/events/types";
import { formatDate } from "../../utils/utils_dates";
import MobileCalendarDay from "./MobileCalendarDay";
import MobileCalendarBody from "./MobileCalendarBody";
import MobileCalendarWeek from "./MobileCalendarWeek";
import MobileCalendarHeader from "./MobileCalendarHeader";
import MobileCalendarWeekHeader from "./MobileCalendarWeekHeader";

interface CalendarState {
	month: number;
	year: number;
}

type Props = {
	initialState?: CalendarState;
	selectedDate: Date | null;
	onDateSelect: (date: Date) => void;
	onPrev: (state: CalendarState) => void;
	onNext: (state: CalendarState) => void;
	onToday: (state: CalendarState) => void;
	eventsSummary: MonthlySummary;
};

// checks if a formatted date: '2024-11-17' as a key exists in the summary, then if it has an event scheduled
const hasEvent = (dayDate: Date, eventsSummary: MonthlySummary): boolean => {
	const targetDate: string = formatDate(dayDate, "db");

	if (targetDate in eventsSummary) {
		return eventsSummary?.[targetDate];
	} else {
		return false;
	}
};

const isSelected = (dayDate: Date, selectedDate: Date | null): boolean => {
	if (!selectedDate) return false;

	const day = formatDate(dayDate, "long");
	const selected = formatDate(selectedDate, "long");

	return day === selected;
};

const defaultState = {
	month: new Date().getMonth(),
	year: new Date().getFullYear(),
};

const MobileCalendar = ({
	initialState = defaultState,
	onDateSelect,
	onPrev,
	onNext,
	onToday,
	eventsSummary,
	selectedDate,
}: Props) => {
	const [calendarState, setCalendarState] =
		useState<CalendarState>(initialState);
	const { month: currentMonth, year: currentYear } = calendarState;
	const calendarWeeks: CalendarWeek[] = generateWeeksAndDates(
		currentMonth,
		currentYear
	);

	const goToNextMonth = () => {
		const nextMonth = currentMonth + 1;
		if (nextMonth > 11) {
			const newMonth = 0;
			const newYear = currentYear + 1;
			const newState = { month: newMonth, year: newYear };
			setCalendarState(newState);
			return onNext && onNext(newState);
		} else {
			const newState = { month: nextMonth, year: currentYear };
			setCalendarState(newState);
			return onNext && onNext(newState);
		}
	};
	const goToPrevMonth = () => {
		const prevMonth = currentMonth - 1;
		if (prevMonth < 0) {
			const newMonth = 11;
			const newYear = currentYear - 1;
			const newState = { month: newMonth, year: newYear };
			setCalendarState(newState);
			return onPrev && onPrev(newState);
		} else {
			const newState = { month: prevMonth, year: currentYear };
			setCalendarState(newState);
			return onPrev && onPrev(newState);
		}
	};

	const goToToday = () => {
		const today = new Date();
		const month = today.getMonth();
		const year = today.getFullYear();
		const newState = { month, year };

		setCalendarState(newState);
		return onToday && onToday(newState);
	};

	return (
		<div className={styles.MobileCalendar}>
			<MobileCalendarHeader
				month={calendarState.month}
				year={calendarState.year}
				onPrev={goToPrevMonth}
				onNext={goToNextMonth}
				onToday={goToToday}
			/>
			<MobileCalendarWeekHeader />
			<MobileCalendarBody>
				{calendarWeeks.map((week: CalendarWeek, idx: number) => (
					<MobileCalendarWeek key={`Week-${idx}`} weekIdx={idx}>
						{week.dates &&
							week.dates.map((day: Date, dayIdx: number) => (
								<MobileCalendarDay
									key={`${day.toDateString()}-${dayIdx}`}
									day={day}
									month={currentMonth}
									onSelect={() => onDateSelect(day)}
									hasEvent={hasEvent(day, eventsSummary)}
									isSelected={isSelected(day, selectedDate)}
								/>
							))}
					</MobileCalendarWeek>
				))}
			</MobileCalendarBody>
		</div>
	);
};

export default MobileCalendar;
