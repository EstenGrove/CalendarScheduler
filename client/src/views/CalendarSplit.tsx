import { CalendarEvent, MonthlySummary } from "../features/events/types";
import styles from "../css/views/CalendarSplit.module.scss";
import EventsList from "../components/events/EventsList";
import MobileCalendar from "../components/calendar/MobileCalendar";

interface CalendarState {
	month: number;
	year: number;
}

type Props = {
	calendarState: CalendarState;
	selectedDate: Date | null;
	eventsSummary: MonthlySummary;
	eventItems: CalendarEvent[];
	onDateSelect: (date: Date) => void;
	onEventSelect: (event: CalendarEvent) => void;
	onNextMonth: (state: CalendarState) => void;
	onPrevMonth: (state: CalendarState) => void;
	onToday: (state: CalendarState) => void;
};

const CalendarSplit = ({
	calendarState,
	selectedDate,
	onDateSelect,
	onEventSelect,
	onNextMonth,
	onPrevMonth,
	onToday,
	eventsSummary,
	eventItems,
}: Props) => {
	return (
		<div className={styles.CalendarSplit}>
			<div className={styles.CalendarSplit_calendar}>
				<MobileCalendar
					initialState={calendarState}
					selectedDate={selectedDate}
					onDateSelect={onDateSelect}
					onNext={onNextMonth}
					onPrev={onPrevMonth}
					onToday={onToday}
					eventsSummary={eventsSummary}
				/>
			</div>
			<div className={styles.CalendarSplit_list}>
				<EventsList calendarEvents={eventItems} onSelect={onEventSelect} />
			</div>
		</div>
	);
};

export default CalendarSplit;
