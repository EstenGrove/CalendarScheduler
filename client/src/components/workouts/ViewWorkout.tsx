import React from "react";
import styles from "../../css/workouts/ViewWorkout.module.scss";
import { HistoryEntry } from "../../features/workoutHistory/types";
import WorkoutEntryDetails from "./WorkoutEntryDetails";

type Props = { workout: HistoryEntry };

const ViewWorkout = ({ workout }: Props) => {
	return (
		<div className={styles.ViewWorkout}>
			<WorkoutEntryDetails workout={workout} />
		</div>
	);
};

export default ViewWorkout;
