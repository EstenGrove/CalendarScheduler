import { useState, useEffect, ChangeEvent } from "react";
import sprite from "../assets/icons/calendar.svg";
import styles from "../css/pages/DashboardWorkoutHistory.module.scss";

import { useSelector } from "react-redux";
import { useAppDispatch } from "../store/store";
import { CurrentUser } from "../features/user/types";
import { selectCurrentUser } from "../features/user/userSlice";
import WorkoutHistoryEntry from "../components/history/WorkoutHistoryEntry";
import { WorkoutTypeName } from "../utils/utils_workoutPlans";

const fake1 = {
	workout: {
		workoutID: 1,
		name: "Curls (3x a week)",
		desc: "Curls performed 3x a week",
	},
	entry: {
		historyID: 1,
		userID: "XXXX-XXXX-XXXXXX",
		date: "2024-12-23",
		startTime: "9:30 AM",
		endTime: "9:45 AM",
		mins: 15,
		reps: 0,
		sets: 0,
		steps: 0,
		miles: 0,
		isCompleted: true,
	},
};

interface HistoryEntry {
	workoutID: number;
	planID: number;
	workoutTypeID: number;
	workoutType: WorkoutTypeName;
	name: string;
	desc: string;
	historyID: number;
	date: Date | string;
	startTime: Date | string;
	endTime: Date | string;
	// target
	targetMins: number;
	targetReps: number;
	targetSets: number;
	targetMiles: number;
	targetSteps: number;
	targetWeight: number;
	// actual
	recordedMins: number;
	recordedReps: number;
	recordedSets: number;
	recordedMiles: number;
	recordedSteps: number;
	recordedWeight: number;
}

const historyEntries = [fake1, fake1, fake1, fake1, fake1, fake1];

const HistoryItem = () => {
	return (
		<div className={styles.HistoryItem}>
			{/*  */}
			{/*  */}
		</div>
	);
};

const DashboardWorkoutHistory = () => {
	const dispatch = useAppDispatch();
	const currentUser: CurrentUser = useSelector(selectCurrentUser);

	return (
		<div className={styles.DashboardWorkoutHistory}>
			<div className={styles.DashboardWorkoutHistory_filters}>
				{/*  */}
				{/*  */}
			</div>
			<div className={styles.DashboardWorkoutHistory_list}>
				<div className={styles.DashboardWorkoutHistory_list_items}>
					{historyEntries.map((history, idx) => (
						<WorkoutHistoryEntry
							key={history.entry.historyID + idx}
							history={history}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default DashboardWorkoutHistory;
