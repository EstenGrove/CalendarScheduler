import React from "react";
import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/workouts/UserWorkout.module.scss";
import { Workout } from "../../features/workouts/types";

type Props = {
	workout: Workout;
};

const iconTypes = {
	walk: "directions_walk",
	run: "directions_run",
	distance: "follow_the_signs",
	weight: "fitness_center",
	sport: "sports_tennis",
	timed: "timer",
};

const getIconType = (val: string) => {
	const key = val || "walk";
	return iconTypes[key as keyof object];
};

const fake = {
	1: "var(--accent-green)",
	2: "var(--accent-purple)",
	7: "var(--accent-yellow)",
	8: "var(--accent-red)",
};

const fakeIcon = {
	1: "distance",
	2: "walk",
	7: "timed",
	8: "weight",
};

const ActivityType = ({ workout, color }) => {
	const id = workout.workoutID;
	const name = fakeIcon[id];
	const icon = getIconType(name);
	return (
		<div className={styles.ActivityType}>
			<svg className={styles.ActivityType_icon} style={color}>
				<use xlinkHref={`${sprite}#icon-${icon}`}></use>
			</svg>
		</div>
	);
};

const getCssFromColor = (color: string) => {
	return {
		borderLeftColor: color,
		fill: color,
	};
};

const UserWorkout = ({ workout }: Props) => {
	const workoutID: number = workout.workoutID || workout.id;
	const name = workout?.workoutName || workout?.name;
	const desc = workout?.workoutName || workout?.desc;
	const css = getCssFromColor(fake[workoutID]);
	return (
		<div className={styles.UserWorkout} style={css}>
			<div className={styles.UserWorkout_type}>
				<ActivityType workout={workout} color={css} />
			</div>
			<div className={styles.UserWorkout_info}>
				<div className={styles.UserWorkout_info_title}>{name}</div>
				<div className={styles.UserWorkout_info_desc}>{desc}</div>
			</div>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default UserWorkout;
