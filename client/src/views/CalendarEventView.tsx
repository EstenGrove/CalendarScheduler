import ColorTag from "../components/ui/ColorTag";
import styles from "../css/views/CalendarEvent.module.scss";
import sprite from "../assets/icons/calendar.svg";
import {
	CalendarEventSchedule,
	CalendarEvent as ICalendarEvent,
} from "../features/events/types";
import { formatDate } from "../utils/utils_dates";
import Button from "../components/shared/Button";
import { useSelector } from "react-redux";
import { selectSelectedEvent } from "../features/events/eventsSlice";
import {
	getRepeatByFreq,
	getRepeatDescription,
} from "../utils/utils_recurring";
import RecurringDesc from "../components/events/RecurringDesc";

type Props = { calendarEvent: ICalendarEvent };

type DetailsProps = {
	calendarEvent: ICalendarEvent;
};

// CALENDAR EVENT DETAILS VIEW

const DateTimeDetails = ({ calendarEvent }: DetailsProps) => {
	const { startDate, endDate, startTime, endTime, eventDate } = calendarEvent;
	const eventStart: string = formatDate(startDate, "shortMonth");
	const eventEnd: string = formatDate(endDate as string, "shortMonth");
	return (
		<div className={styles.DateTimeDetails}>
			<div className={styles.DateTimeDetails_date}>
				<svg className={styles.DateTimeDetails_icon}>
					<use xlinkHref={`${sprite}#icon-event_note`}></use>
				</svg>
				Started on <span>{eventStart}</span>
			</div>
			{!endDate ? (
				<div>No end date.</div>
			) : (
				<div className={styles.DateTimeDetails_date}>
					<svg className={styles.DateTimeDetails_icon}>
						<use xlinkHref={`${sprite}#icon-event_note`}></use>
					</svg>
					Ends on <span>{eventEnd}</span>
				</div>
			)}
			<div className={styles.DateTimeDetails_time}>
				<svg className={styles.DateTimeDetails_icon}>
					<use xlinkHref={`${sprite}#icon-access_time`}></use>
				</svg>
				Occurs at <span>{startTime}</span> - <span>{endTime}</span>
			</div>
			<div className={styles.DateTimeDetails_time}>
				<svg className={styles.DateTimeDetails_icon}>
					<use xlinkHref={`${sprite}#icon-access_time`}></use>
				</svg>
				Current Event: <span>{eventDate}</span>
			</div>
		</div>
	);
};

const CalendarEventView = ({ calendarEvent }: Props) => {
	const selectedEvent = useSelector(selectSelectedEvent);
	const { upcoming, schedule } = selectedEvent;
	const tagColor: string = calendarEvent.tagColor || "var(--accent)";

	const initDeleteEvent = () => {
		// do stuff
	};

	console.log("selectedEvent", selectedEvent);

	return (
		<div className={styles.CalendarEventView}>
			<div className={styles.CalendarEventView_actions}>
				<Button onClick={initDeleteEvent}>Delete Event</Button>
			</div>
			<div className={styles.CalendarEventView_header}>
				<h2 className={styles.CalendarEventView_header_title}>
					{calendarEvent?.title}{" "}
				</h2>
				<p className={styles.CalendarEventView_header_desc}>
					{calendarEvent?.desc}
				</p>
				{schedule && (
					<div className={styles.CalendarEventView_tags}>
						<ColorTag color={tagColor} tagName={"Events"} />
						<RecurringDesc eventSchedule={schedule as CalendarEventSchedule} />
					</div>
				)}
			</div>
			<div className={styles.CalendarEventView_scheduled}>
				<DateTimeDetails calendarEvent={calendarEvent} />
			</div>
		</div>
	);
};

export default CalendarEventView;
