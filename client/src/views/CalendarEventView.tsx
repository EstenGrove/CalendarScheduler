import styles from "../css/views/CalendarEvent.module.scss";
import sprite from "../assets/icons/calendar.svg";
import {
	CalendarEventSchedule,
	CalendarEvent as ICalendarEvent,
} from "../features/events/types";
import { formatDate } from "../utils/utils_dates";
import { useSelector } from "react-redux";
import { selectSelectedEvent } from "../features/events/eventsSlice";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../store/store";
import { CurrentUser } from "../features/user/types";
import { UserWorkout } from "../features/workouts/types";
import { deleteEvent } from "../features/events/operations";
import { sleep } from "../utils/utils_misc";
import { useNavigate } from "react-router-dom";
// components
import Modal from "../components/shared/Modal";
import Button from "../components/shared/Button";
import ColorTag from "../components/ui/ColorTag";
import DeletedEventView from "./DeletedEventView";
import Checkbox from "../components/shared/Checkbox";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import RecurringDesc from "../components/events/RecurringDesc";
import WorkoutEntry from "../components/workouts/WorkoutEntry";
import EditCalendarEvent from "../components/events/EditCalendarEvent";

type Props = { calendarEvent: ICalendarEvent; currentUser: CurrentUser };

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

const customCSS = {
	edit: {
		backgroundColor: "var(--blueGrey900)",
		color: "#fff",
		marginRight: ".5rem",
	},
	markAsDone: {
		color: "var(--accent-green)",
	},
};

type WorkoutRowProps = {
	workout: UserWorkout;
	markAsDone: (isDone: boolean) => void;
};

const IsDone = () => {
	return (
		<div className={styles.IsDone}>
			<div className={styles.IsDone_done}>Done</div>
		</div>
	);
};
const IsNotDone = () => {
	return (
		<div className={styles.IsNotDone}>
			<div className={styles.IsNotDone_notDone}>Tap/Click</div>
		</div>
	);
};

const doneBorder = "var(--accent-green)";
const notDoneBorder = "var(--accent-bright-red)";
const mainBorder = "var(--blueGrey800)";

const getBorder = (isDone: boolean = false, wasClicked: boolean = false) => {
	if (!wasClicked) return mainBorder;

	if (isDone) {
		return doneBorder;
	} else {
		return notDoneBorder;
	}
};

const WorkoutRow = ({ workout, markAsDone }: WorkoutRowProps) => {
	const [isDone, setIsDone] = useState(workout?.isCompleted);
	const [wasClicked, setWasClicked] = useState(false);
	const tempBorder = getBorder(isDone, wasClicked);

	const toggleComplete = () => {
		const asCompleted = !isDone;
		setIsDone(!isDone);
		setWasClicked(true);
		markAsDone(asCompleted);
	};

	// Shows a brief flash of the action color (eg. green for done, red for not-done)
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		let timer: ReturnType<typeof setTimeout>;

		if (wasClicked) {
			timer = setTimeout(() => {
				setWasClicked(false);
			}, 300);
		}

		return () => {
			isMounted = false;
			clearTimeout(timer);
		};
	}, [wasClicked]);

	return (
		<div
			className={styles.WorkoutRow}
			style={{ borderColor: wasClicked ? tempBorder : mainBorder }}
		>
			<div className={styles.WorkoutRow_select} onClick={toggleComplete}>
				{isDone ? <IsDone /> : <IsNotDone />}
			</div>
			<WorkoutEntry
				key={workout.workoutID}
				workout={workout}
				markAsCompleted={markAsDone}
			/>
		</div>
	);
};

const CalendarEventView = ({ currentUser, calendarEvent }: Props) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const selectedEvent = useSelector(selectSelectedEvent);
	const eventWorkouts: UserWorkout[] = selectedEvent?.workouts;
	const { schedule } = selectedEvent;
	const [showConfirm, setShowConfirm] = useState<boolean>(false);
	const [showEditModal, setShowEditModal] = useState<boolean>(false);
	const [isSaving, setIsSaving] = useState<boolean>(false);
	const [wasDeleted, setWasDeleted] = useState<boolean>(false);
	const tagColor: string = calendarEvent.tagColor || "var(--accent)";

	const [editValues, setEditValues] = useState({
		title: selectedEvent.event.title,
		desc: selectedEvent.event.desc,
	});
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

	const markAsDone = (workout: UserWorkout) => {
		// dispatch(markWorkoutAsCompleted())
		console.log("workout", workout);
	};

	const startEditing = () => {
		setShowEditModal(true);
	};
	const stopEditing = () => {
		setShowEditModal(false);
	};

	const initDeleteEvent = () => {
		setShowConfirm(true);
	};
	const closeDeleteDialog = () => {
		setShowConfirm(false);
	};

	const confirmDelete = async () => {
		const { userID } = currentUser;
		const { eventID, eventDate } = selectedEvent.event;
		const { deleteAllEvents } = deleteEventOptions;
		await dispatch(
			deleteEvent({
				userID: userID,
				eventID: eventID,
				dateToDelete: eventDate,
				deleteSeries: deleteAllEvents,
			})
		);
		await sleep(800);

		setIsSaving(false);
		setWasDeleted(true);
	};

	const cancelDelete = () => {
		closeDeleteDialog();
	};

	const goBack = () => {
		navigate("/dashboard/calendar");
	};

	if (wasDeleted) {
		return (
			<DeletedEventView>
				<Button onClick={goBack}>Back to calendar</Button>
			</DeletedEventView>
		);
	}
	return (
		<div className={styles.CalendarEventView}>
			<div className={styles.CalendarEventView_actions}>
				<Button onClick={startEditing} style={customCSS.edit}>
					Edit
				</Button>
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
			<div className={styles.CalendarEventView_record}>
				<Button onClick={() => {}} style={customCSS.markAsDone}>
					Mark All as Done
				</Button>
			</div>
			<div className={styles.CalendarEventView_section}>
				<h2>Workouts for this event</h2>
			</div>
			<div className={styles.CalendarEventView_workouts}>
				{eventWorkouts &&
					[...eventWorkouts, ...eventWorkouts].map((workout, idx) => {
						return (
							<WorkoutRow
								key={idx + "" + workout.workoutID}
								workout={workout}
								markAsDone={() => markAsDone(workout)}
							/>
						);
					})}
			</div>

			{showConfirm && (
				<ConfirmDialog
					closeDialog={closeDeleteDialog}
					onCancel={cancelDelete}
					onConfirm={() => {
						setIsSaving(true);
						confirmDelete();
					}}
					isConfirming={isSaving}
				>
					<DeleteEventOptions
						deleteValues={deleteEventOptions}
						handleCheckbox={handleDeleteOpts}
					/>
				</ConfirmDialog>
			)}

			{showEditModal && (
				<Modal title="Edit Event" closeModal={stopEditing}>
					<EditCalendarEvent values={editValues} />
				</Modal>
			)}
		</div>
	);
};

export default CalendarEventView;
