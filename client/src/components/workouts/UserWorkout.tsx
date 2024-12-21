import { TouchEvent, useRef } from "react";
import { type UserWorkout } from "../../features/workouts/types";
import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/workouts/UserWorkout.module.scss";
import { getActivityTypeFromWorkoutTypeID } from "../../utils/utils_workoutPlans";

type Props = {
	workout: UserWorkout;
	selectWorkout: (workout: UserWorkout) => void;
	markAsCompleted: (workout: UserWorkout) => void;
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
	const key = val || "weight";
	return iconTypes[key as keyof object];
};

const fake = {
	1: "var(--accent-green)",
	2: "var(--accent-purple)",
	7: "var(--accent-yellow)",
	8: "var(--accent-red)",
};

const getTypeFromID = (id: number) => {
	const type = getActivityTypeFromWorkoutTypeID(id);

	return type;
};

type ActivityProps = {
	workout: UserWorkout;
};

const ActivityType = ({ workout }: ActivityProps) => {
	const color = "var(--accent-purple)";
	const cssColor = getCssFromColor(color);
	const id = workout.workoutTypeID;
	const type = getTypeFromID(id);
	const icon = getIconType(type);
	return (
		<div className={styles.ActivityType}>
			<svg className={styles.ActivityType_icon} style={cssColor}>
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

type WeightProps = {
	weight: number;
};
const WeightBadge = ({ weight }: WeightProps) => {
	return (
		<div className={styles.WeightBadge}>
			<svg className={styles.WeightBadge_icon}>
				<use xlinkHref={`${sprite}#icon-fitness_center`}></use>
			</svg>
			<span>{weight}lbs.</span>
		</div>
	);
};
type MinsProps = {
	mins: number;
};
const MinutesBadge = ({ mins }: MinsProps) => {
	return (
		<div className={styles.MinutesBadge}>
			<svg className={styles.MinutesBadge_icon}>
				<use xlinkHref={`${sprite}#icon-timer`}></use>
			</svg>
			<span>{mins}m</span>
		</div>
	);
};

let startX = 0;
let moveX = 0;
let endX = 0;

const UserWorkout = ({ workout }: Props) => {
	const cardRef = useRef<HTMLDivElement>(null);
	const workoutID: number = workout.workoutID;
	const name = workout?.name;
	const border = { borderLeftColor: fake[workoutID as keyof object] };
	const start = workout.startTime;
	const end = workout.endTime;

	const dueTime = (
		<div className={styles.UserWorkout_info_main_desc}>
			{start || "10:15 AM"} to {end || "10:35 AM"}
		</div>
	);

	const onTouchStart = (e: TouchEvent) => {
		const { screenX } = e.changedTouches[0];
		console.log("(START)", e);
		console.log("screenX", screenX);
		startX = screenX;

		if (cardRef.current) {
			// cardRef.current.translate = tran
		}
	};
	const onTouchMove = (e: TouchEvent) => {
		const { screenX } = e.changedTouches[0];
		console.log("MOVE");
		moveX = screenX;
		const deltaX = moveX - startX;
		console.log(screenX);
		if (cardRef.current) {
			cardRef.current.style.transform = `translateX(${deltaX}px)`;
		}
	};

	const onTouchEnd = (e: TouchEvent) => {
		const { screenX } = e.changedTouches[0];
		console.log("(END)", e);
		console.log("screenX", screenX);
		endX = screenX;
		if (cardRef.current) {
			cardRef.current.style.transform = `translateX(0px)`;
		}
	};

	return (
		<div
			ref={cardRef}
			className={styles.UserWorkout}
			style={border}
			onTouchStart={onTouchStart}
			onTouchMove={onTouchMove}
			onTouchEnd={onTouchEnd}
		>
			<div className={styles.UserWorkout_type}>
				<ActivityType workout={workout} />
			</div>
			<div className={styles.UserWorkout_info}>
				<div className={styles.UserWorkout_info_main}>
					<div className={styles.UserWorkout_info_main_title}>{name}</div>
					<div className={styles.UserWorkout_info_main_desc}>{dueTime}</div>
				</div>
				<div className={styles.UserWorkout_info_options}>
					<div className={styles.UserWorkout_info_options_wrapper}>
						<svg className={styles.UserWorkout_info_options_wrapper_icon}>
							<use xlinkHref={`${sprite}#icon-keyboard_control`}></use>
						</svg>
					</div>
				</div>
			</div>
			<div className={styles.UserWorkout_bottom}>
				<WeightBadge weight={workout.weight} />
				<MinutesBadge mins={workout.mins} />
			</div>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default UserWorkout;
