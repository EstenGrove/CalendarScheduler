import React, { ReactNode, useRef, useState } from "react";
import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/dashboard/ActionsBar.module.scss";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useLocation } from "react-router-dom";

// GLOBAL ACTIONS TO SUPPORT:
// - Recording a workout log (eg. log a workout)
// - Start a pomodoro timer session
// - Create a workout
// - Create a workout plan??

type Props = {
	onAction: (action: string) => void;
};

type MainActionProps = {
	onClick: () => void;
};

const MainAction = ({ onClick }: MainActionProps) => {
	return (
		<button type="button" onClick={onClick} className={styles.MainAction}>
			<svg className={styles.MainAction_icon}>
				<use xlinkHref={`${sprite}#icon-auto_awesome`}></use>
			</svg>
		</button>
	);
};

type MenuProps = {
	close: () => void;
	children?: ReactNode;
};
const Menu = ({ close, children }: MenuProps) => {
	const menuRef = useRef<HTMLDivElement>(null);
	useOutsideClick(menuRef, close);
	return (
		<div ref={menuRef} className={styles.Menu}>
			<div className={styles.Menu_inner}>{children}</div>
		</div>
	);
};

const icons = {
	// timer: "timelapse",
	timer: "timer",
	logWorkout: "fact_check",
	workout: "fitness_center",
	workoutPlan: "run_circle",
	task: "add_task",
};

type ActionButtonProps = {
	title: string;
	onAction: () => void;
	icon: string;
	color?: string;
};

const ActionButton = ({ title, onAction, icon, color }: ActionButtonProps) => {
	const css = { backgroundColor: color || "var(--foreground)" };

	return (
		<button
			type="button"
			onClick={onAction}
			className={styles.ActionButton}
			style={css}
		>
			<svg className={styles.ActionButton_icon}>
				<use xlinkHref={`${sprite}#icon-${icons[icon as keyof object]}`}></use>
			</svg>
			<div className={styles.ActionButton_tooltip}>{title}</div>
		</button>
	);
};
const ActionsBar = ({ onAction }: Props) => {
	const location = useLocation();
	const { pathname } = location;
	const [showActions, setShowActions] = useState<boolean>(false);

	const openActions = () => {
		setShowActions(true);
	};
	const closeActions = () => {
		setShowActions(false);
	};

	const toggleMenu = () => {
		if (showActions) {
			return closeActions();
		} else {
			return openActions();
		}
	};

	const selectAction = (action: string) => {
		return onAction && onAction(action);
	};

	// hide on child/nested routes (for now!)
	if (pathname !== "/dashboard") {
		return null;
	}
	return (
		<div className={styles.ActionsBar}>
			{showActions && (
				<Menu close={closeActions}>
					<ActionButton
						title="Start a timer"
						icon="timer"
						color="var(--bg-foreground)"
						onAction={() => selectAction("Timer")}
					/>
					<ActionButton
						title="Add a task"
						icon="task"
						color="var(--bg-foreground)"
						onAction={() => selectAction("Task")}
					/>
					<ActionButton
						title="Log a workout"
						icon="logWorkout"
						color="var(--bg-foreground)"
						onAction={() => selectAction("LogWorkout")}
					/>
					<ActionButton
						title="Create a workout"
						icon="workout"
						color="var(--bg-foreground)"
						onAction={() => selectAction("Workout")}
					/>
				</Menu>
			)}
			<MainAction onClick={toggleMenu} />
		</div>
	);
};

export default ActionsBar;
