import { useState } from "react";
import { CurrentUser } from "../../features/user/types";
import styles from "../../css/dashboard/QuickActions.module.scss";
import ActionsBar from "./ActionsBar";
import LogWorkoutModal from "../history/LogWorkoutModal";
import Modal from "../shared/Modal";
import CreateWorkout from "../workouts/CreateWorkout";
import PomodoroModal from "../pomodoro/PomodoroModal";
import CreateEventModal from "../events/CreateEventModal";
import StartWorkout from "../workouts/StartWorkout";
import ActiveWorkoutIsland from "../workouts/ActiveWorkoutIsland";

type Props = {
	currentUser: CurrentUser;
};

type ActionType =
	| "Timer"
	| "StartWorkout"
	| "LogWorkout"
	| "CreateWorkout"
	| "CreateEvent";

const showIsland = false;

const QuickActions = ({ currentUser }: Props) => {
	const [actionType, setActionType] = useState<ActionType | null>(null);

	const selectAction = (action: string) => {
		setActionType(action as ActionType);
	};

	const closeActionModal = () => {
		setActionType(null);
	};

	return (
		<div className={styles.QuickActions}>
			<ActionsBar onAction={selectAction} />

			{/* Start a Timer/Pomodoro Session */}
			{actionType === "Timer" && (
				<PomodoroModal
					currentUser={currentUser}
					closeModal={closeActionModal}
				/>
			)}

			{actionType === "StartWorkout" && (
				<StartWorkout currentUser={currentUser} closeModal={closeActionModal} />
			)}

			{/* Calendar Event ONLY */}
			{actionType === "CreateEvent" && (
				<CreateEventModal
					currentUser={currentUser}
					closeModal={closeActionModal}
				/>
			)}

			{/* Create Workout w/ Plan */}
			{actionType === "CreateWorkout" && (
				<Modal title="Create Workout" closeModal={closeActionModal}>
					<CreateWorkout
						currentUser={currentUser}
						closeModal={closeActionModal}
					/>
				</Modal>
			)}

			{/* Log Workout without Plan */}
			{actionType === "LogWorkout" && (
				<LogWorkoutModal
					currentUser={currentUser}
					closeModal={closeActionModal}
				/>
			)}

			{showIsland && <ActiveWorkoutIsland />}
		</div>
	);
};

export default QuickActions;
