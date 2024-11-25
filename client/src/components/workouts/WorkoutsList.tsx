import React from "react";
import styles from "../../css/workouts/WorkoutsList.module.scss";
import { Workout } from "../../features/workouts/types";

type Props = {
	workouts: Workout[];
	selectWorkout: (workout: Workout) => void;
};

const WorkoutsList = ({ workouts, selectWorkout }: Props) => {
	return (
		<div className={styles.WorkoutsList}>
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default WorkoutsList;
