import { Ref, RefObject, TouchEvent, useRef, useState } from "react";
import { type UserWorkout } from "../../features/workouts/types";
import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/workouts/UserWorkout.module.scss";
import { getActivityTypeFromWorkoutTypeID } from "../../utils/utils_workoutPlans";
import StatusBadge from "./StatusBadge";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { isSwipeLeft, isSwipeRight } from "../../utils/utils_gestures";

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

type SwipeProps = {
	elRef: RefObject<HTMLDivElement>;
};

const SwipeActions = ({ elRef }: SwipeProps) => {
	return (
		<div ref={elRef} className={styles.SwipeActions}>
			<div className={styles.SwipeActions_markDone}>
				<div className={styles.SwipeActions_markDone_label}>MARK DONE</div>
			</div>
			<div className={styles.SwipeActions_edit}>
				<div className={styles.SwipeActions_edit_label}>EDIT</div>
			</div>
		</div>
	);
};

const getCardPosition = (cardRef: RefObject<HTMLDivElement>) => {
	if (cardRef.current) {
		const position = cardRef.current.getBoundingClientRect();
		return position;
	} else {
		return null;
	}
};

const UserWorkout = ({ workout }: Props) => {
	const cardRef = useRef<HTMLDivElement>(null);
	const swipeRef = useRef<HTMLDivElement>(null);
	const workoutID: number = workout.workoutID;
	const name = workout?.name;
	const border = { borderLeftColor: fake[workoutID as keyof object] };
	const start = workout.startTime;
	const end = workout.endTime;
	useOutsideClick(cardRef, () => {
		resetSwipe();
	});

	const dueTime = (
		<div className={styles.UserWorkout_info_main_desc}>
			{start || "10:15 AM"} to {end || "10:35 AM"}
		</div>
	);

	const resetSwipe = () => {
		if (cardRef.current) {
			cardRef.current.style.transform = `translateX(0px)`;
		}
	};

	const onTouchStart = (e: TouchEvent) => {
		const { screenX } = e.changedTouches[0];
		console.log("start(touch)", screenX);
		startX = screenX;
		// moveX = 0;
		// endX = 0;
	};
	const onTouchMove = (e: TouchEvent) => {
		const { screenX } = e.changedTouches[0];
		moveX = screenX;
		const deltaX = moveX - startX;

		if (isSwipeRight(startX, screenX)) {
			// console.log("RIGHT");
			if (cardRef.current) {
				const cardLeft = getCardPosition(cardRef)?.left;
				if (Number(cardLeft) > 158) return;
				cardRef.current.style.transition = "none";
				cardRef.current.style.transform = `translateX(${deltaX}px)`;
			}
			return;
		}

		if (isSwipeLeft(startX, endX)) {
			console.log("[LEFT]");
			if (cardRef.current) {
				const cardLeft = Number(getCardPosition(cardRef)?.left);
				// if (cardLeft <= 20) return;
				if (deltaX && cardLeft < 158) {
					cardRef.current.style.transform = `translateX(0px)`;
					cardRef.current.style.left = `0px`;

					return;
				}
				cardRef.current.style.transform = `translateX(0px)`;
			}
			return;
		}

		if (screenX < startX) {
			console.log("OFF");
			if (cardRef.current) {
				const cardLeft = getCardPosition(cardRef)?.left;
				if (Number(cardLeft) <= 75) return;
				const newDelta = deltaX - startX;

				cardRef.current.style.transition = "none";
				// cardRef.current.style.transform = `translateX(${newDelta}px)`;
				cardRef.current.style.transform = `translateX(${deltaX}px)`;
			}
		}
	};

	const onTouchEnd = (e: TouchEvent) => {
		const { screenX } = e.changedTouches[0];

		endX = screenX;
		if (cardRef.current) {
			const cardLeft = getCardPosition(cardRef)?.left;

			if (Number(cardLeft) < 75) {
				cardRef.current.style.transform = `translateX(0px)`;
				cardRef.current.style.transition = ".3s ease-out";
			} else {
				cardRef.current.style.transform = `translateX(158px)`;
				cardRef.current.style.transition = ".3s ease-out";
			}
		}
		// startX = 0;
		// moveX = 0;
		// endX = 0;
	};

	return (
		<div
			ref={cardRef}
			// className={styles.UserWorkout}
			className={styles.UserWorkoutWrapper}
			style={border}
			onTouchStart={onTouchStart}
			onTouchMove={onTouchMove}
			onTouchEnd={onTouchEnd}
		>
			<SwipeActions elRef={swipeRef} />
			<div className={styles.UserWorkout}>
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
					<div className={styles.UserWorkout_bottom_status}>
						<StatusBadge statusKey="PAST-DUE" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserWorkout;
