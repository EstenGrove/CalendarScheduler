import { useState } from "react";
import { CurrentUser } from "../../features/user/types";
import styles from "../../css/dashboard/QuickActions.module.scss";
import ActionsBar from "./ActionsBar";
import LogWorkoutModal from "../history/LogWorkoutModal";

type Props = {
	currentUser: CurrentUser;
};

type ActionType = "Timer" | "Task" | "LogWorkout" | "CreateWorkout";

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

			{actionType === "LogWorkout" && (
				<LogWorkoutModal
					currentUser={currentUser}
					closeModal={closeActionModal}
				/>
			)}
		</div>
	);
};

export default QuickActions;
