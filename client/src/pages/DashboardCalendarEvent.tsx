import sprite from "../assets/icons/calendar.svg";
import styles from "../css/pages/DashboardCalendarEvent.module.scss";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectEventByID } from "../features/events/eventsSlice";
import { CalendarEvent } from "../features/events/types";
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
	const calendarEvent = useSelector(selectEventByID(Number(params.id)));

	const goBack = () => {
		navigate("/dashboard/calendar");
	};

	console.log("[EVENT-ID] :", params.id);
	return (
		<div className={styles.DashboardCalendarEvent}>
			<div className={styles.DashboardCalendarEvent_nav}>
				<BackButton goBack={goBack} />
			</div>
			<div className={styles.DashboardCalendarEvent_main}>
				{!calendarEvent?.eventID && <NoDataFound />}
				<CalendarEventView calendarEvent={calendarEvent as CalendarEvent} />
			</div>
		</div>
	);
};

export default DashboardCalendarEvent;
