import { CalendarEvent } from "../features/events/types";
import { TRecord } from "../utils/utils_misc";
import styles from "../css/views/CalendarSplit.module.scss";
import EventsList from "../components/events/EventsList";
import MobileCalendar from "../components/calendar/MobileCalendar";

interface CalendarState {
	month: number;
	year: number;
}

type Props = {
	selectedDate: Date | null;
	eventItems: CalendarEvent[];
	eventsByDate: TRecord<CalendarEvent>;
	onDateSelect: (date: Date) => void;
	onEventSelect: (event: CalendarEvent) => void;
	onNextMonth: (state: CalendarState) => void;
	onPrevMonth: (state: CalendarState) => void;
	onToday: () => void;
};

const CalendarSplit = ({
	selectedDate,
	onDateSelect,
	onEventSelect,
	onNextMonth,
	onPrevMonth,
	onToday,
	eventItems,
	eventsByDate,
}: Props) => {
	// an array of event dates: ['11/03/2024', '11/15/2024', '11/19/2024']
	const eventDates: string[] = Object.keys(eventsByDate);

	return (
		<div className={styles.CalendarSplit}>
			<div className={styles.CalendarSplit_calendar}>
				<MobileCalendar
					selectedDate={selectedDate}
					onDateSelect={onDateSelect}
					onNext={onNextMonth}
					onPrev={onPrevMonth}
					onToday={onToday}
					eventsList={eventDates}
				/>
			</div>
			<div className={styles.CalendarSplit_list}>
				<EventsList calendarEvents={eventItems} onSelect={onEventSelect} />
			</div>
		</div>
	);
};

export default CalendarSplit;
