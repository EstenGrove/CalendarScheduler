import styles from "../../css/workouts/WorkoutEntry.module.scss";
import type { UserWorkout } from "../../features/workouts/types";
import sprite from "../../assets/icons/calendar.svg";
import { ReactNode, useRef, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { addEllipsis } from "../../utils/utils_misc";

type Props = {
	workout: UserWorkout;
	markAsCompleted: () => void;
};

// REQUIREMENTS:
// - Play Button to start workout
// - Checkbox to mark as done/completed
// - Should look similar to the Calendar List item's but with some added details.

type MoreOptionsProps = {
	onClick: () => void;
	children?: ReactNode;
};

const MoreOptions = ({ onClick, children }: MoreOptionsProps) => {
	return (
		<div onClick={onClick} className={styles.MoreOptions}>
			<svg className={styles.MoreOptions_icon}>
				<use xlinkHref={`${sprite}#icon-keyboard_control`}></use>
			</svg>
			{children}
		</div>
	);
};

type MoreOptionsMenuProps = {
	closeMenu: () => void;
	onMarkAsDone: () => void;
	onView: () => void;
	onEdit: () => void;
	onDelete: () => void;
};
const MoreOptionsMenu = ({
	closeMenu,
	onMarkAsDone,
	onView,
	onEdit,
	onDelete,
}: MoreOptionsMenuProps) => {
	const menuRef = useRef<HTMLDivElement>(null);
	useOutsideClick(menuRef, closeMenu);
	return (
		<div ref={menuRef} className={styles.MoreOptionsMenu}>
			<ul className={styles.MoreOptionsMenu_list}>
				<li
					onClick={onView}
					className={styles.MoreOptionsMenu_list_item}
					data-marker="view"
				>
					View
				</li>
				<li
					onClick={onEdit}
					className={styles.MoreOptionsMenu_list_item}
					data-marker="edit"
				>
					Edit
				</li>
				<li
					onClick={onMarkAsDone}
					className={styles.MoreOptionsMenu_list_item}
					data-marker="complete"
				>
					Mark as Done
				</li>
				<li
					onClick={onDelete}
					className={styles.MoreOptionsMenu_list_item}
					data-marker="delete"
				>
					Delete
				</li>
			</ul>
		</div>
	);
};

type InfoProps = {
	name: string;
	desc: string;
	// mins: number; // target length in minutes
	// plans: WorkoutPlan[];
};
const WorkoutInfo = ({ name, desc }: InfoProps) => {
	const newDesc = addEllipsis(desc, 30);
	return (
		<div className={styles.WorkoutInfo}>
			<div className={styles.WorkoutInfo_name}>{name}</div>
			<div className={styles.WorkoutInfo_desc}>{newDesc}</div>
		</div>
	);
};

type DetailsProps = {
	mins: number;
};
const Details = ({ mins }: DetailsProps) => {
	return (
		<div className={styles.Details}>
			<div className={styles.Details_mins}>
				<svg className={styles.Details_mins_icon}>
					<use xlinkHref={`${sprite}#icon-stopwatch`}></use>
				</svg>
				<span>{mins}m</span>
			</div>
		</div>
	);
};

type StartWorkoutProps = {
	startWorkout: () => void;
	stopWorkout: () => void;
	workoutStatus: "IDLE" | "IN-PROGRESS" | "STOPPED";
};
const StartWorkout = ({
	startWorkout,
	stopWorkout,
	workoutStatus = "IDLE",
}: StartWorkoutProps) => {
	const isActiveWorkout: boolean = workoutStatus === "IN-PROGRESS";
	const isStoppedWorkout: boolean = workoutStatus === "STOPPED";
	const canStart: boolean = workoutStatus === "IDLE" || isStoppedWorkout;
	const canStop: boolean = isActiveWorkout;

	const startButton = (
		<button type="button" onClick={startWorkout} className={styles.startButton}>
			<svg className={styles.startButton_icon}>
				<use xlinkHref={`${sprite}#icon-controller-play`}></use>
			</svg>
		</button>
	);
	const stopButton = (
		<button type="button" onClick={stopWorkout} className={styles.stopButton}>
			<svg className={styles.stopButton_icon}>
				<use xlinkHref={`${sprite}#icon-controller-play`}></use>
			</svg>
		</button>
	);

	return (
		<div className={styles.StartWorkout}>
			{canStart && startButton}
			{canStop && stopButton}
		</div>
	);
};

const WorkoutEntry = ({ workout, markAsCompleted }: Props) => {
	console.log("workout", workout);
	const wasCompleted: boolean = workout?.isCompleted || false;
	const name = workout.name;
	const desc = workout?.desc;
	const [showMore, setShowMore] = useState<boolean>(false);

	const startWorkout = () => {
		// do stuff
	};
	const stopWorkout = () => {
		// do stuff
	};

	const openMoreOptions = () => {
		setShowMore(true);
	};
	const closeMoreOptions = () => {
		setShowMore(false);
	};
	const markAsDone = () => {
		return markAsCompleted && markAsCompleted();
	};
	const viewDetails = () => {
		// do stuff
	};
	const editEntry = () => {
		//
	};
	const deleteEntry = () => {
		// do stuff
	};

	return (
		<div className={styles.WorkoutEntry}>
			<div className={styles.WorkoutEntry_top}>
				<WorkoutInfo name={name} desc={desc} />
				<MoreOptions onClick={openMoreOptions}>
					{showMore && (
						<MoreOptionsMenu
							onEdit={editEntry}
							onView={viewDetails}
							onDelete={deleteEntry}
							onMarkAsDone={markAsDone}
							closeMenu={closeMoreOptions}
						/>
					)}
				</MoreOptions>
			</div>
			{/* Main Section  */}
			<div className={styles.WorkoutEntry_main}>
				{/* BOTTOM section */}
				<div className={styles.WorkoutEntry_main_bottom}>
					<Details mins={36} />
					{!wasCompleted && (
						<StartWorkout
							startWorkout={startWorkout}
							stopWorkout={stopWorkout}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default WorkoutEntry;
