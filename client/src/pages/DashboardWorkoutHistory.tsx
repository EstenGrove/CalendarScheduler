import { useState, useEffect, ChangeEvent } from "react";
import sprite from "../assets/icons/calendar.svg";
import styles from "../css/pages/DashboardWorkoutHistory.module.scss";

import { useSelector } from "react-redux";
import { useAppDispatch } from "../store/store";
import { CurrentUser } from "../features/user/types";
import { selectCurrentUser } from "../features/user/userSlice";

const DashboardWorkoutHistory = () => {
	const dispatch = useAppDispatch();
	const currentUser: CurrentUser = useSelector(selectCurrentUser);

	return (
		<div className={styles.DashboardWorkoutHistory}>
			<div className={styles.DashboardWorkoutHistory_filters}>
				{/*  */}
				{/*  */}
				{/*  */}
			</div>
		</div>
	);
};

export default DashboardWorkoutHistory;
