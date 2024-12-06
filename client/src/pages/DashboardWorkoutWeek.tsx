import { useState } from "react";
import styles from "../css/pages/DashboardWorkoutWeek.module.scss";
import WeeklyHeader from "../components/workouts/WeeklyHeader";
import LoggedSummary from "../components/summary/LoggedSummary";

const DashboardWorkoutWeek = () => {
	const [selectedDate, setSelectedDate] = useState<Date | string>(new Date());

	const selectDate = (date: Date | string) => {
		setSelectedDate(date);
	};

	return (
		<div className={styles.DashboardWorkoutWeek}>
			<WeeklyHeader
				baseDate={new Date()}
				onSelect={selectDate}
				selectedDate={selectedDate}
			/>
			<div className={styles.DashboardWorkoutWeek_summary}>
				<div className={styles.DashboardWorkoutWeek_title}>Recent Activity</div>
				<LoggedSummary />
			</div>
			{/*  */}
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default DashboardWorkoutWeek;
