import { useState } from "react";
import styles from "../css/pages/DashboardCalendar.module.scss";
import CalendarSplit from "../views/CalendarSplit";
import { CalendarEvent, CalendarState } from "../features/events/types";
import { Outlet, Params, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
	selectEvents,
	selectEventsByDate,
	selectEventsForDate,
	selectSelectedDateEvents,
	setSelectedDateEvents,
} from "../features/events/eventsSlice";
import { groupEventsByDate } from "../utils/utils_calendar";
import { useAppDispatch } from "../store/store";

const hideCalendarOnMobile = (params: Readonly<Params<string>>) => {
	const hasSelected = !!params?.id;
	const isMobile = window.innerWidth <= 850;

	return isMobile && hasSelected;
};

const DashboardCalendar = () => {
	const params = useParams();
	const dispatch = useAppDispatch();
	const eventsByDate = useSelector(selectEventsByDate);
	const selectedDateEvents = useSelector(selectSelectedDateEvents);
	// local state
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [calendarState, setCalendarState] = useState<CalendarState>({
		year: new Date().getFullYear(),
		month: new Date().getMonth(),
	});

	const selectDate = (date: Date) => {
		console.log("date", date);
		setSelectedDate(date);
		dispatch(setSelectedDateEvents(date.toString()));
	};

	const selectEvent = (eventItem: CalendarEvent) => {
		// do stuff
	};

	const changeMonth = (state: CalendarState) => {
		console.log("state", state);
		setCalendarState(state);
	};

	const goToToday = () => {};

	return (
		<div className={styles.DashboardCalendar}>
			<section className={styles.DashboardCalendar_left}>
				{/* HIDE THIS ON "/calendar/:id" ROUTE */}
				{!hideCalendarOnMobile(params) && (
					<CalendarSplit
						selectedDate={selectedDate}
						eventItems={selectedDateEvents}
						eventsByDate={eventsByDate}
						onDateSelect={selectDate}
						onEventSelect={selectEvent}
						onNextMonth={changeMonth}
						onPrevMonth={changeMonth}
						onToday={goToToday}
					/>
				)}
			</section>
			<section className={styles.DashboardCalendar_right}>
				{/* ON DESKTOP: SHOW THE SELECTED CALENDAR EVENT, IF APPLICABLE */}
				<Outlet />
			</section>
		</div>
	);
};

export default DashboardCalendar;
