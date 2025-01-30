import { useState, useEffect } from "react";
import styles from "../css/pages/DashboardCalendar.module.scss";
import CalendarSplit from "../views/CalendarSplit";
import { CalendarEvent, CalendarState } from "../features/events/types";
import { Outlet, Params, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
	selectMonthlySummary,
	selectSelectedDateEvents,
	setSelectedEvent,
} from "../features/events/eventsSlice";
import { getMonthStartAndEnd } from "../utils/utils_calendar";
import { useAppDispatch } from "../store/store";
import {
	fetchEventsByDate,
	fetchMonthlySummary,
} from "../features/events/operations";
import { selectCurrentUser } from "../features/user/userSlice";
import { formatDate, parseDate } from "../utils/utils_dates";
import {
	getAllQueryParams,
	TParams,
	useQueryParams,
} from "../hooks/useQueryParams";
import PageHeader from "../components/layout/PageHeader";

const hideCalendarOnMobile = (params: Readonly<Params<string>>) => {
	const hasSelected = !!params?.id;
	const isMobile = window.innerWidth <= 850;

	return isMobile && hasSelected;
};

const getInitialState = () => {
	const params = getAllQueryParams();
	const month = params?.month || new Date().getMonth();
	const year = params?.year || new Date().getFullYear();

	return {
		month: Number(month),
		year: Number(year),
	};
};

const getInitialDate = () => {
	const params = getAllQueryParams();
	const date = params?.selectedDate || null;

	if (!date) return null;
	const parsed = parseDate(date);
	return formatDate(parsed, "long");
};

const DashboardCalendar = () => {
	const params = useParams();
	const queryParams = useQueryParams();
	const dispatch = useAppDispatch();
	const currentUser = useSelector(selectCurrentUser);
	const eventsSummary = useSelector(selectMonthlySummary);
	const selectedDateEvents = useSelector(selectSelectedDateEvents);
	// local state
	const [selectedDate, setSelectedDate] = useState<Date | string | null>(
		getInitialDate
	);

	const [calendarState, setCalendarState] =
		useState<CalendarState>(getInitialState);

	// select date from upper calendar nav (eg. <MobileCalendar/>)
	const selectDate = (date: Date) => {
		setSelectedDate(date);
		getEventsForDate(date);

		queryParams.setParams({ selectedDate: formatDate(date, "db") });
	};

	// select event from bottom list (eg. <EventsList/>)
	const selectEvent = (eventItem: CalendarEvent) => {
		dispatch(setSelectedEvent(eventItem));
	};

	const changeMonth = (state: CalendarState) => {
		setCalendarState(state);
		getEventSummary(state);
		console.log("state", state);
		queryParams.setParams(state as unknown as TParams);
	};

	const getEventsForDate = (date: Date) => {
		const { userID } = currentUser;
		const targetDate: string = formatDate(date, "db");
		dispatch(fetchEventsByDate({ userID, targetDate }));
	};

	// get monthly summary w/ new state as basis
	const getEventSummary = (state: CalendarState) => {
		const { year, month } = state;
		const { userID } = currentUser;

		const { startDate, endDate } = getMonthStartAndEnd(month, year);
		// fire off request for monthly summary
		dispatch(fetchMonthlySummary({ userID, startDate, endDate }));
	};

	const goToToday = (state: CalendarState) => {
		// fetch summary & change state
		setCalendarState(state);
		getEventSummary(state);
		queryParams.setParams(state as unknown as TParams);
	};

	// fetch event summary for current month (onMount)
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		getEventSummary(calendarState);

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.DashboardCalendar}>
			<PageHeader title="Calendar" />
			<div className={styles.DashboardCalendar_main}>
				<section className={styles.DashboardCalendar_left}>
					{/* HIDE THIS ON "/calendar/:id" ROUTE */}
					{!hideCalendarOnMobile(params) && (
						<CalendarSplit
							calendarState={calendarState}
							selectedDate={selectedDate}
							eventItems={selectedDateEvents}
							eventsSummary={eventsSummary}
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
		</div>
	);
};

export default DashboardCalendar;
