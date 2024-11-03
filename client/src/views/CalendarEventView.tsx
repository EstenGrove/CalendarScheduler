import styles from "../css/views/CalendarEvent.module.scss";
import { CalendarEvent as ICalendarEvent } from "../features/events/types";

type Props = { calendarEvent: ICalendarEvent };

// CALENDAR EVENT DETAILS VIEW

const CalendarEventView = ({ calendarEvent }: Props) => {
	return (
		<div className={styles.CalendarEventView}>
			<div className={styles.CalendarEventView_header}>
				<h2 className={styles.CalendarEventView_header_title}>
					{calendarEvent?.title}
				</h2>
				<p className={styles.CalendarEventView_header_desc}>
					{calendarEvent?.desc}
				</p>
			</div>

			{/*  */}
			{/*  */}
		</div>
	);
};

export default CalendarEventView;
