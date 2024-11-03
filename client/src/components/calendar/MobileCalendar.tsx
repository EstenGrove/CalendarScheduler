import { useState } from "react";
import styles from "../../css/calendar/MobileCalendar.module.scss";
import {
	CalendarWeek,
	generateWeeksAndDates,
} from "../../utils/utils_calendar";
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
	selectedDate: Date | null;
	onDateSelect: (date: Date) => void;
	onPrev: (state: CalendarState) => void;
	onNext: (state: CalendarState) => void;
	onToday: () => void;
	eventsList: string[]; // an array of formatted date strings: ['11/21/2024', '11/28/2024']
};

// checks if a formatted date: '11/22/2024' exists in array of ['11/21/2024', '11/28/2024']
const hasEvent = (dayDate: Date, eventDates: string[]): boolean => {
	return eventDates.includes(formatDate(dayDate, "long"));
};

const isSelected = (dayDate: Date, selectedDate: Date | null): boolean => {
	if (!selectedDate) return false;

	const day = formatDate(dayDate, "long");
	const selected = formatDate(selectedDate, "long");

	return day === selected;
};

const MobileCalendar = ({
	onDateSelect,
	onPrev,
	onNext,
	onToday,
	eventsList,
	selectedDate,
}: Props) => {
	const [calendarState, setCalendarState] = useState<CalendarState>({
		month: new Date().getMonth(),
		year: new Date().getFullYear(),
	});
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

		setCalendarState({
			month,
			year,
		});
		return onToday && onToday();
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
									hasEvent={hasEvent(day, eventsList)}
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
