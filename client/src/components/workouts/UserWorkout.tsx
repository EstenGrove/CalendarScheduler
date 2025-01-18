import { CSSProperties, RefObject, TouchEvent, useRef, useState } from "react";
import { WorkoutStatus, type UserWorkout } from "../../features/workouts/types";
import sprite from "../../assets/icons/calendar2.svg";
import sprite2 from "../../assets/icons/workouts2.svg";
import styles from "../../css/workouts/UserWorkout.module.scss";
import { getActivityTypeFromWorkoutTypeID } from "../../utils/utils_workoutPlans";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { isSwipeLeft, isSwipeRight } from "../../utils/utils_gestures";
import StatusBadge from "./StatusBadge";
import type { ActivityType as WorkoutActivityType } from "../../utils/utils_activity";

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
type WorkoutBadgeProps = {
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
interface ActivityInfo {
	iconSet: string;
	label: string;
	icon: string;
	badge: string;
}
type ActivityIcons = {
	[type in WorkoutActivityType]: ActivityInfo;
};
type IconBadgeProps = {
	type: keyof typeof badgeByActivity;
	value: string | number;
};

const badgeByActivity: ActivityIcons = {
	Lift: {
		iconSet: sprite,
		label: "lbs.",
		icon: "fitness_center", // sprite1
		badge: "fitness_center",
	},
	Cardio: {
		iconSet: sprite2,
		label: " reps",
		icon: "skipping-rope", // sprite2
		badge: "effort",
	},
	Walk: {
		iconSet: sprite,
		label: " steps",
		icon: "directions_walk",
		badge: "directions_walk",
	},
	Run: {
		iconSet: sprite,
		label: "mi",
		icon: "directions_run",
		badge: "directions_run",
	},
	Stretch: {
		iconSet: sprite2,
		label: "",
		icon: "stretching", // sprite2
		badge: "stretching", // sprite2
	},
	Strength: {
		iconSet: sprite2,
		label: " reps",
		// icon: "sit-ups", // sprite2
		icon: "pushups-2", // sprite2
		badge: "flex-biceps", // sprite2
		// iconSet: sprite,
		// icon: "settings_backup_restore", // sprite2
	},
	Stairs: {
		iconSet: sprite,
		label: " steps",
		icon: "effort",
		badge: "effort",
	},
	Swim: {
		iconSet: sprite,
		label: " laps",
		icon: "effort",
		badge: "effort",
	},
	Timed: {
		iconSet: sprite,
		label: "m",
		icon: "timer",
		badge: "timer",
	},
	More: {
		iconSet: sprite,
		label: "",
		icon: "effort",
		badge: "effort",
	},
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

const ActivityType = ({ workout }: ActivityProps) => {
	const color = workout.tagColor || "var(--accent-purple)";
	const cssColor: CSSProperties = getCssFromColor(color);
	const type: WorkoutActivityType = workout.activityType;
	const info: ActivityInfo = badgeByActivity[type];
	return (
		<div className={styles.ActivityType}>
			<svg className={styles.ActivityType_icon} style={cssColor}>
				<use xlinkHref={`${info.iconSet}#icon-${info.badge}`}></use>
			</svg>
		</div>
	);
};
const IconBadge = ({ type, value }: IconBadgeProps) => {
	const info = badgeByActivity[type];

	return (
		<div className={styles.IconBadge}>
			<svg className={styles.IconBadge_icon}>
				<use xlinkHref={`${info.iconSet}#icon-${info.icon}`}></use>
			</svg>
			<span>
				{value}
				{info.label}
			</span>
		</div>
	);
};
const WorkoutBadge = ({ workout }: WorkoutBadgeProps) => {
	const type = workout.activityType as keyof typeof badgeByActivity;
	const { weight, reps = 0, sets, steps, miles } = workout;
	console.log("type", type);

	return (
		<div className={styles.WorkoutBadge}>
			{type === "Lift" && <WeightBadge weight={weight} />}
			{type === "Cardio" && <IconBadge value={reps} type={type} />}
			{(type === "Walk" || type === "Run") && (
				<IconBadge type={type} value={type === "Walk" ? steps : miles} />
			)}
			{type === "Strength" && <IconBadge type="Strength" value={reps} />}
			{type === "Stretch" && <IconBadge type="Stretch" value={sets} />}
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
		name,
		startTime: start = null,
		endTime: end = null,
		workoutStatus,
		tagColor = "var(--blueGrey700)",
	} = workout;
	const border = {
		borderLeftColor: tagColor as string,
	};

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
			onTouchStart={onTouchStart}
			onTouchMove={onTouchMove}
			onTouchEnd={onTouchEnd}
		>
			<SwipeActions
				elRef={swipeRef}
				status={workoutStatus}
				onAction={selectSwipeAction}
			/>
			<div className={styles.UserWorkout} style={border}>
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
					<WorkoutBadge workout={workout} />
					{/* <WeightBadge weight={workout.weight} /> */}
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
