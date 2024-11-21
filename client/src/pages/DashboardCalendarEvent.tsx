import { useEffect } from "react";
import sprite from "../assets/icons/calendar.svg";
import styles from "../css/pages/DashboardCalendarEvent.module.scss";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectSelectedEvent } from "../features/events/eventsSlice";
import { CalendarEvent } from "../features/events/types";
import { useAppDispatch } from "../store/store";
import { fetchEventDetails } from "../features/events/operations";
import { selectCurrentUser } from "../features/user/userSlice";
import NoDataFound from "../components/layout/NoDataFound";
import CalendarEventView from "../views/CalendarEventView";

type BackProps = {
	goBack: () => void;
};
const BackButton = ({ goBack }: BackProps) => {
	return (
		<button className={styles.BackButton} onClick={goBack}>
			<svg className={styles.BackButton_icon}>
				<use xlinkHref={`${sprite}#icon-arrow_back`}></use>
			</svg>
		</button>
	);
};

const DashboardCalendarEvent = () => {
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const eventID: number = Number(params.id);
	const currentUser = useSelector(selectCurrentUser);
	const selectedEvent = useSelector(selectSelectedEvent);
	const { event: calendarEvent } = selectedEvent;

	const goBack = () => {
		navigate("/dashboard/calendar");
	};

	// fetch when query param changes (eg. selected event changes)
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		if (eventID) {
			const { userID } = currentUser;
			dispatch(fetchEventDetails({ userID, eventID }));
		}

		return () => {
			isMounted = false;
		};
	}, [currentUser, dispatch, eventID]);

	console.log("[EVENT-ID] :", params.id);
	return (
		<div className={styles.DashboardCalendarEvent}>
			<div className={styles.DashboardCalendarEvent_nav}>
				<BackButton goBack={goBack} />
			</div>
			<div className={styles.DashboardCalendarEvent_main}>
				{!calendarEvent?.eventID && <NoDataFound />}
				{calendarEvent?.eventID && (
					<CalendarEventView calendarEvent={calendarEvent as CalendarEvent} />
				)}
			</div>
		</div>
	);
};

export default DashboardCalendarEvent;
