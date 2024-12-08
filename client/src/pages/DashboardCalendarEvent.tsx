import { useEffect } from "react";
import sprite from "../assets/icons/calendar.svg";
import styles from "../css/pages/DashboardCalendarEvent.module.scss";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectSelectedEvent } from "../features/events/eventsSlice";
import { CalendarEvent } from "../features/events/types";
import { useAppDispatch } from "../store/store";
import {
	fetchEventDetails,
	fetchMonthlySummary,
} from "../features/events/operations";
import { selectCurrentUser } from "../features/user/userSlice";
import NoDataFound from "../components/layout/NoDataFound";
import CalendarEventView from "../views/CalendarEventView";
import { endOfMonth, startOfMonth } from "date-fns";
import { formatDate } from "../utils/utils_dates";

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

const getMonthAndYearFromDate = (date: Date | string) => {
	const monthStart: Date = startOfMonth(date);
	const monthEnd: Date = endOfMonth(date);

	return {
		startDate: monthStart,
		endDate: monthEnd,
	};
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
		// refresh monthly view
		refreshMonthlySummary();
	};

	const refreshMonthlySummary = () => {
		// fetch monthly summary again
		const eventDate = calendarEvent?.eventDate || new Date();
		const { userID } = currentUser;
		const { startDate: start, endDate: end } =
			getMonthAndYearFromDate(eventDate);
		const startDate: string = formatDate(start, "db");
		const endDate: string = formatDate(end, "db");
		const params = {
			userID,
			startDate,
			endDate,
		};
		dispatch(fetchMonthlySummary(params));
	};

	// fetch when query param changes (eg. selected event changes)
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		if (eventID) {
			const { userID } = currentUser;
			dispatch(
				fetchEventDetails({
					userID,
					eventID,
				})
			);
		}

		return () => {
			isMounted = false;
		};
	}, [currentUser, dispatch, eventID]);

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
