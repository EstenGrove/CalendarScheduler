import React from "react";
import sprite from "../../assets/icons/calendar2.svg";
import styles from "../../css/workouts/ActiveWorkoutIsland.module.scss";
import FloatingIsland from "../ui/FloatingIsland";
import type { ActivityType } from "../../utils/utils_activity";

type Props = {};

type IslandBtnProps = {
	onClick: () => void;
	icon: string;
	type: ActivityType;
};

const icons = {
	play: "controller-play",
	stop: "controller-stop",
	pause: "pause1",
	// activity types
	lift: "fitness_center",
	walk: "directions_walk",
	run: "directions_run",
	stretch: "accessibility",
	cardio: "grass",
	more: "dots-three-horizontal",
};

interface ActivityDetails {
	icon: string;
	backgroundColor: string;
}

type ActivityTypesMap = {
	[key in ActivityType]: ActivityDetails;
};

const activityTypes: ActivityTypesMap = {
	Lift: {
		icon: icons.lift,
		backgroundColor: "var(--accent-blue)",
	},
	Walk: {
		icon: icons.walk,
		backgroundColor: "var(--accent-green)",
	},
	Run: {
		icon: icons.run,
		backgroundColor: "var(--blueGrey800)",
	},
	Stretch: {
		icon: icons.stretch,
		backgroundColor: "var(--accent-red)",
	},
	Cardio: {
		icon: icons.cardio,
		backgroundColor: "var(--accent-purple)",
	},
	More: {
		icon: icons.more,
		backgroundColor: "var(--blueGrey900s)",
	},
} as const;

const IslandButton = ({ onClick, icon = "pause" }: IslandBtnProps) => {
	const iconName = icons[icon as keyof object];

	return (
		<button type="button" onClick={onClick} className={styles.IslandButton}>
			<svg className={styles.IslandButton_icon}>
				<use xlinkHref={`${sprite}#icon-${iconName}`}></use>
			</svg>
		</button>
	);
};

const MainAction = ({ onClick, icon = "pause" }: IslandBtnProps) => {
	const iconName = icons[icon as keyof object];

	return (
		<button type="button" onClick={onClick} className={styles.MainAction}>
			<svg className={styles.MainAction_icon}>
				<use xlinkHref={`${sprite}#icon-${iconName}`}></use>
			</svg>
		</button>
	);
};
const ActivityIcon = ({ onClick, type = "Lift" }: IslandBtnProps) => {
	const activity: ActivityDetails = activityTypes[type];
	return (
		<button type="button" onClick={onClick} className={styles.ActivityIcon}>
			<svg className={styles.ActivityIcon_icon} fill={activity.backgroundColor}>
				<use xlinkHref={`${sprite}#icon-${activity.icon}`}></use>
			</svg>
		</button>
	);
};

const Display = ({ timer, workoutName = "Weights" }) => {
	return (
		<div className={styles.Display}>
			<div className={styles.Display_type}>{workoutName}</div>
			<div className={styles.Display_time}>{timer}</div>
		</div>
	);
};

const ActiveWorkoutIsland = ({}: Props) => {
	const timer = "7m 49s";
	return (
		<FloatingIsland isCollapsed={false}>
			<div className={styles.ActiveWorkoutIsland}>
				<div className={styles.ActiveWorkoutIsland_main}>
					<ActivityIcon type="Stretch" />
					<Display timer={timer} workoutName="Weights" />
				</div>
				<div className={styles.ActiveWorkoutIsland_mainAction}>
					<MainAction />
				</div>
			</div>
		</FloatingIsland>
	);
};

export default ActiveWorkoutIsland;
