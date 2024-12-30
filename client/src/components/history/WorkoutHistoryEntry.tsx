import React from "react";
import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/history/WorkoutHistoryEntry.module.scss";
import { getActivityTypeFromWorkoutTypeID } from "../../utils/utils_workoutPlans";

type Props = {};

const NotComplete = () => {
	return (
		<div className={styles.NotComplete}>
			<div className={styles.NotComplete_dot}></div>
			<div className={styles.NotComplete_label}>Not-Done</div>
		</div>
	);
};
const InProgress = () => {
	return (
		<div className={styles.InProgress}>
			<div className={styles.InProgress_dot}></div>
			<div className={styles.InProgress_label}>In-Progress</div>
		</div>
	);
};
const Completed = () => {
	return (
		<div className={styles.Completed}>
			<div className={styles.Completed_dot}></div>
			<div className={styles.Completed_label}>Done</div>
		</div>
	);
};
const PastDue = () => {
	return (
		<div className={styles.PastDue}>
			<div className={styles.PastDue_dot}></div>
			<div className={styles.PastDue_label}>Past-Due</div>
		</div>
	);
};

const Status = () => {
	return (
		<div className={styles.Status}>
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};
const EntryHeader = ({ historyEntry }) => {
	const { name, desc } = historyEntry.workout;
	const { startTime, endTime } = historyEntry.entry;

	return (
		<div className={styles.EntryHeader}>
			<div className={styles.EntryHeader_details}>
				<div className={styles.EntryHeader_details_name}>
					{name || "Planked Pull-Ups"}
				</div>
				<div className={styles.EntryHeader_details_desc}>
					{startTime || "9:15 AM"} to {endTime || "9:45 AM"}
				</div>
			</div>
		</div>
	);
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
	// workout: UserWorkout;
};

const ActivityType = ({ workout }: ActivityProps) => {
	const cssColor = {};
	const icon = "timer";
	return (
		<div className={styles.ActivityType}>
			<svg className={styles.ActivityType_icon} style={cssColor}>
				<use xlinkHref={`${sprite}#icon-${icon}`}></use>
			</svg>
		</div>
	);
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

const WorkoutHistoryEntry = ({ history }: Props) => {
	const { entry, workout } = history;

	console.log("entry", entry);
	return (
		<div className={styles.WorkoutHistoryEntry}>
			{/* LEFT */}
			<div className={styles.WorkoutHistoryEntry_type}>
				<ActivityType />
			</div>
			{/* MAIN BODY */}
			<div className={styles.WorkoutHistoryEntry_main}>
				<div className={styles.WorkoutHistoryEntry_main_header}>
					<EntryHeader historyEntry={history} />
				</div>
				<div className={styles.WorkoutHistoryEntry_main_badges}>
					<MinutesBadge mins={workout.mins || 30} />
					<WeightBadge weight={workout.weight || 20} />
				</div>
			</div>
			{/* RIGHT */}
			<div className={styles.WorkoutHistoryEntry_more}>
				<div className={styles.WorkoutHistoryEntry_more_options}>
					<div className={styles.WorkoutHistoryEntry_more_options_wrapper}>
						<svg
							className={styles.WorkoutHistoryEntry_more_options_wrapper_icon}
						>
							<use xlinkHref={`${sprite}#icon-keyboard_control`}></use>
						</svg>
					</div>
				</div>
				<div className={styles.WorkoutHistoryEntry_more_status}>
					<Completed />
				</div>
			</div>
		</div>
	);
};

export default WorkoutHistoryEntry;
