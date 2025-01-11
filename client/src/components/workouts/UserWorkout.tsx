import { RefObject, TouchEvent, useRef, useState } from "react";
import { WorkoutStatus, type UserWorkout } from "../../features/workouts/types";
import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/workouts/UserWorkout.module.scss";
import { getActivityTypeFromWorkoutTypeID } from "../../utils/utils_workoutPlans";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { isSwipeLeft, isSwipeRight } from "../../utils/utils_gestures";
import StatusBadge from "./StatusBadge";

type Props = {
	workout: UserWorkout;
	viewWorkout: (workout: UserWorkout) => void;
	editWorkout: (workout: UserWorkout) => void;
	deleteWorkout: (workout: UserWorkout) => void;
	cancelWorkout: (workout: UserWorkout) => void;
	markAsCompleted: (workout: UserWorkout) => void;
};
type MenuProps = {
	closeMenu: () => void;
	selectMenuOption: (option: "EDIT" | "VIEW" | "DELETE" | "CANCEL") => void;
};
type ActivityProps = {
	workout: UserWorkout;
};
type WeightProps = {
	weight: number;
};
type MinsProps = {
	mins: number;
};
type SwipeProps = {
	elRef: RefObject<HTMLDivElement>;
	status: WorkoutStatus;
	onAction: (action: "COMPLETE" | "CANCEL") => void;
};

const fake = {
	1: "var(--accent-green)",
	2: "var(--accent-purple)",
	7: "var(--accent-yellow)",
	8: "var(--accent-red)",
};

const iconTypes = {
	walk: "directions_walk",
	run: "directions_run",
	distance: "follow_the_signs",
	weight: "fitness_center",
	sport: "sports_tennis",
	timed: "timer",
};

const getCssFromColor = (color: string) => {
	return {
		borderLeftColor: color,
		fill: color,
	};
};
const getCardPosition = (cardRef: RefObject<HTMLDivElement>) => {
	if (cardRef.current) {
		const position = cardRef.current.getBoundingClientRect();
		return position;
	} else {
		return null;
	}
};
const getIconType = (val: string) => {
	const key = val || "weight";
	return iconTypes[key as keyof object];
};
const getTypeFromID = (id: number) => {
	const type = getActivityTypeFromWorkoutTypeID(id);

	return type;
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
const SwipeActions = ({ elRef, status, onAction }: SwipeProps) => {
	const isDone: boolean = status === "COMPLETE";
	const isCancelled: boolean = status === "CANCELLED";
	return (
		<div ref={elRef} className={styles.SwipeActions}>
			<div
				onClick={() => onAction("COMPLETE")}
				className={styles.SwipeActions_markDone}
				style={{ opacity: isDone ? ".4" : "1.0" }}
			>
				<svg className={styles.SwipeActions_markDone_icon}>
					<use xlinkHref={`${sprite}#icon-check_circle`}></use>
				</svg>
			</div>
			<div
				onClick={() => onAction("CANCEL")}
				className={styles.SwipeActions_edit}
				style={{ opacity: isCancelled ? ".4" : "1.0" }}
			>
				<svg className={styles.SwipeActions_edit_icon}>
					<use xlinkHref={`${sprite}#icon-event_busy`}></use>
				</svg>
			</div>
		</div>
	);
};

let startX = 0;
let moveX = 0;
let endX = 0;

const MenuOptions = ({ closeMenu, selectMenuOption }: MenuProps) => {
	const menuRef = useRef<HTMLDivElement>(null);
	useOutsideClick(menuRef, closeMenu);
	return (
		<div ref={menuRef} className={styles.MenuOptions}>
			<ul className={styles.MenuOptions_list}>
				<li
					onClick={() => selectMenuOption("VIEW")}
					className={styles.MenuOptions_list_item}
				>
					View
				</li>
				<li
					onClick={() => selectMenuOption("EDIT")}
					className={styles.MenuOptions_list_item}
				>
					Edit
				</li>
				<li
					onClick={() => selectMenuOption("DELETE")}
					className={styles.MenuOptions_list_item}
				>
					Delete
				</li>
			</ul>
		</div>
	);
};

const UserWorkout = ({
	workout,
	viewWorkout,
	editWorkout,
	deleteWorkout,
	cancelWorkout,
	markAsCompleted,
}: Props) => {
	const cardRef = useRef<HTMLDivElement>(null);
	const swipeRef = useRef<HTMLDivElement>(null);
	const {
		workoutID,
		name,
		startTime: start = null,
		endTime: end = null,
		workoutStatus,
	} = workout;
	const border = { borderLeftColor: fake[workoutID as keyof object] };

	const [showMenu, setShowMenu] = useState(false);
	useOutsideClick(cardRef, () => {
		resetSwipe();
	});

	const resetSwipe = () => {
		if (cardRef.current) {
			cardRef.current.style.transform = `translateX(0px)`;
		}
	};

	const onTouchStart = (e: TouchEvent) => {
		const { screenX } = e.changedTouches[0];
		startX = screenX;
	};
	const onTouchMove = (e: TouchEvent) => {
		const { screenX } = e.changedTouches[0];
		moveX = screenX;
		const deltaX = moveX - startX;

		if (isSwipeRight(startX, screenX)) {
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

				cardRef.current.style.transition = "none";
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
	};

	const selectMenuOption = (option: "EDIT" | "VIEW" | "DELETE" | "CANCEL") => {
		// do stuff
		switch (option) {
			case "EDIT": {
				editWorkout(workout);
				break;
			}
			case "VIEW": {
				viewWorkout(workout);
				break;
			}
			case "DELETE": {
				deleteWorkout(workout);
				break;
			}
			case "CANCEL": {
				cancelWorkout(workout);
				break;
			}

			default:
				break;
		}
	};

	const selectSwipeAction = (action: "COMPLETE" | "CANCEL") => {
		switch (action) {
			case "COMPLETE": {
				markAsCompleted(workout);
				break;
			}
			case "CANCEL": {
				cancelWorkout(workout);
				break;
			}

			default:
				break;
		}
	};

	const openMenu = () => {
		setShowMenu(true);
	};
	const closeMenu = () => {
		setShowMenu(false);
	};

	return (
		<div
			ref={cardRef}
			className={styles.UserWorkoutWrapper}
			style={border}
			onTouchStart={onTouchStart}
			onTouchMove={onTouchMove}
			onTouchEnd={onTouchEnd}
		>
			<SwipeActions
				elRef={swipeRef}
				status={workoutStatus}
				onAction={selectSwipeAction}
			/>
			<div className={styles.UserWorkout}>
				<div className={styles.UserWorkout_type}>
					<ActivityType workout={workout} />
				</div>
				<div className={styles.UserWorkout_info}>
					<div className={styles.UserWorkout_info_main}>
						<div className={styles.UserWorkout_info_main_title}>{name}</div>
						<div className={styles.UserWorkout_info_main_desc}>
							{start ? `${start} to ` : "All-Day"}
							{end ? end : ""}
						</div>
					</div>
					<div className={styles.UserWorkout_info_options}>
						<div
							onClick={openMenu}
							className={styles.UserWorkout_info_options_wrapper}
						>
							<svg className={styles.UserWorkout_info_options_wrapper_icon}>
								<use xlinkHref={`${sprite}#icon-keyboard_control`}></use>
							</svg>

							{showMenu && (
								<MenuOptions
									closeMenu={closeMenu}
									selectMenuOption={selectMenuOption}
								/>
							)}
						</div>
					</div>
				</div>
				<div className={styles.UserWorkout_bottom}>
					<WeightBadge weight={workout.weight} />
					<MinutesBadge mins={workout.mins} />
					<div className={styles.UserWorkout_bottom_status}>
						<StatusBadge status={workoutStatus} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserWorkout;
