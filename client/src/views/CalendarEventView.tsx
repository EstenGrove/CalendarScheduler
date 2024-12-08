import styles from "../css/views/CalendarEvent.module.scss";
import sprite from "../assets/icons/calendar.svg";
import {
	CalendarEventSchedule,
	CalendarEvent as ICalendarEvent,
} from "../features/events/types";
import { formatDate } from "../utils/utils_dates";
import { useSelector } from "react-redux";
import { selectSelectedEvent } from "../features/events/eventsSlice";
import Button from "../components/shared/Button";
import ColorTag from "../components/ui/ColorTag";
import RecurringDesc from "../components/events/RecurringDesc";
import { useState } from "react";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import Checkbox from "../components/shared/Checkbox";

type Props = { calendarEvent: ICalendarEvent };

type DetailsProps = {
	calendarEvent: ICalendarEvent;
};

// CALENDAR EVENT DETAILS VIEW

const DateTimeDetails = ({ calendarEvent }: DetailsProps) => {
	const {
		startDate,
		endDate,
		startTime,
		endTime,
		eventDate: date,
	} = calendarEvent;
	const eventStart: string = formatDate(startDate, "long");
	const eventEnd: string = formatDate(endDate as string, "long");
	const eventDate: string = formatDate(date, "shortMonth");
	return (
		<div className={styles.DateTimeDetails}>
			<div className={styles.DateTimeDetails_date}>
				<svg className={styles.DateTimeDetails_icon}>
					<use xlinkHref={`${sprite}#icon-calendar_today`}></use>
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
					<use xlinkHref={`${sprite}#icon-event_available`}></use>
				</svg>
				Current Event: <span>{eventDate}</span>
			</div>
		</div>
	);
};

// Prolly need a custom modal that includes options for:
// - Delete this event only
// - Delete this event and ALL future events
// - Delete workout
// - Delete this workout and ALL future workouts for this event?
type DeleteProps = {
	deleteValues: {
		deleteEventOnly: boolean;
		deleteAllEvents: boolean;
		deleteWorkoutOnly: boolean;
		deleteAllWorkouts: boolean;
	};
	handleCheckbox: (name: string, value: boolean) => void;
};
const DeleteEventOptions = ({ deleteValues, handleCheckbox }: DeleteProps) => {
	return (
		<div className={styles.DeleteEventOptions}>
			<h1>Delete Event?</h1>
			<div className={styles.DeleteEventOptions_options}>
				<p>Events:</p>
				<Checkbox
					name="deleteEvent"
					id="deleteEvent"
					value={deleteValues.deleteEventOnly}
					onChange={handleCheckbox}
					label="Delete this Event Only"
				/>
				<Checkbox
					name="deleteAllEvents"
					id="deleteAllEvents"
					value={deleteValues.deleteAllEvents}
					onChange={handleCheckbox}
					label="Delete ALL Future Events"
				/>
				<br />
				<br />
				<p>Workouts for this event:</p>
				<Checkbox
					name="deleteWorkoutOnly"
					id="deleteWorkoutOnly"
					value={deleteValues.deleteWorkoutOnly}
					onChange={handleCheckbox}
					label="Delete this workout only"
				/>
				<Checkbox
					name="deleteAllWorkouts"
					id="deleteAllWorkouts"
					value={deleteValues.deleteAllWorkouts}
					onChange={handleCheckbox}
					label="Delete ALL Future workouts"
				/>
			</div>
		</div>
	);
};

interface DeleteEventOpts {
	deleteEventOnly: boolean;
	deleteAllEvents: boolean;
	deleteWorkoutOnly: boolean;
	deleteAllWorkouts: boolean;
}

const CalendarEventView = ({ calendarEvent }: Props) => {
	const selectedEvent = useSelector(selectSelectedEvent);
	const { schedule } = selectedEvent;
	const [showConfirm, setShowConfirm] = useState<boolean>(false);
	const tagColor: string = calendarEvent.tagColor || "var(--accent)";
	const [deleteEventOptions, setDeleteEventOptions] = useState<DeleteEventOpts>(
		{
			deleteEventOnly: false,
			deleteAllEvents: true,
			deleteWorkoutOnly: false,
			deleteAllWorkouts: false,
		}
	);

	const handleDeleteOpts = (name: string, value: boolean) => {
		setDeleteEventOptions({
			...deleteEventOptions,
			[name]: value,
		});
	};

	const initDeleteEvent = () => {
		setShowConfirm(true);
	};
	const closeDeleteDialog = () => {
		setShowConfirm(false);
	};

	const confirmDelete = () => {
		// do stuff
	};
	const cancelDelete = () => {
		closeDeleteDialog();
	};

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

			{showConfirm && (
				<ConfirmDialog
					closeDialog={closeDeleteDialog}
					onCancel={cancelDelete}
					onConfirm={confirmDelete}
				>
					<DeleteEventOptions
						deleteValues={deleteEventOptions}
						handleCheckbox={handleDeleteOpts}
					/>
				</ConfirmDialog>
			)}
		</div>
	);
};

export default CalendarEventView;
