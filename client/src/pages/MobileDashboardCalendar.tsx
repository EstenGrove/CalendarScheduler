import React, { useState } from "react";
import styles from "../css/pages/MobileDashboardCalendar.module.scss";
import { Outlet, useLocation, useParams } from "react-router-dom";
import CalendarSplit from "../views/CalendarSplit";

type Props = {};

const MobileDashboardCalendar = ({}: Props) => {
	const params = useParams();
	const location = useLocation();
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [selectedMonthAndYear, setSelectedMonthAndYear] = useState({
		year: new Date().getFullYear(),
		month: new Date().getMonth(),
	});

	const selectDate = (date: Date) => {
		console.log("date", date);
		setSelectedDate(date);
	};

	const selectEvent = (eventItem: CalendarEvent) => {
		// do stuff
	};

	const changeMonth = (state: CalendarState) => {
		console.log("state", state);
	};

	const goToToday = () => {};
	return (
		<div className={styles.MobileDashboardCalendar}>
			<CalendarSplit
				onDateSelect={selectDate}
				onEventSelect={selectEvent}
				onNextMonth={changeMonth}
				onPrevMonth={changeMonth}
				onToday={goToToday}
			/>
			{/*  */}
			{/*  */}
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default MobileDashboardCalendar;
