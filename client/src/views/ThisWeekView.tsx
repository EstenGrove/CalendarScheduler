import styles from "../css/views/ThisWeekView.module.scss";
import { useState } from "react";
import { useAppDispatch } from "../store/store";
import { CurrentUser } from "../features/user/types";
import { UserWorkout } from "../features/workouts/types";
import {
	cancelWorkoutByDate,
	markWorkoutAsDone,
} from "../features/workouts/operations";
import { prepareValuesForMarkAsDone } from "../utils/utils_workouts";
import WorkoutsList from "../components/workouts/WorkoutsList";
import { formatDate, parseDateTime } from "../utils/utils_dates";
import Button from "../components/shared/Button";

type Props = {
	currentUser: CurrentUser;
	workouts: UserWorkout[];
	selectedDate: Date | string;
};

const getSelectedDate = (selectedDate: Date | string) => {
	return new Date(selectedDate).toISOString();
};

const ThisWeekView = ({ currentUser, workouts, selectedDate }: Props) => {
	const dispatch = useAppDispatch();
	const [selectedWorkout, setSelectedWorkout] = useState<UserWorkout | null>(
		null
	);

	// toggles 'completed' state
	const markAsCompleted = (workout: UserWorkout) => {
		const isAlreadyDone = workout.workoutStatus === "COMPLETE";
		const { userID } = currentUser;

		if (isAlreadyDone) {
			const status = "NOT-COMPLETE";
			const selected = getSelectedDate(selectedDate);
			const values = prepareValuesForMarkAsDone(selected, {
				...workout,
				workoutStatus: status,
			});
			console.log("values(NOT-COMPLETE)", values);
			dispatch(markWorkoutAsDone({ ...values, userID }));
		} else {
			const status = "COMPLETE";
			const selected = getSelectedDate(selectedDate);
			const values = prepareValuesForMarkAsDone(selected, {
				...workout,
				workoutStatus: status,
			});
			console.log("values(COMPLETE)", values);
			dispatch(markWorkoutAsDone({ ...values, userID }));
		}
	};

	const viewWorkoutItem = (workout: UserWorkout) => {
		setSelectedWorkout(workout);
	};
	const editWorkoutItem = (workout: UserWorkout) => {
		setSelectedWorkout(workout);
	};
	const deleteWorkoutItem = (workout: UserWorkout) => {
		setSelectedWorkout(workout);
	};
	const cancelWorkoutItem = (workout: UserWorkout) => {
		console.log("workout", workout);
		const enableCancel = false;

		if (enableCancel) {
			dispatch(
				cancelWorkoutByDate({
					userID: currentUser.userID,
					workoutID: workout.workoutID,
					workoutDate: formatDate(selectedDate, "long"),
					cancelReason: "Not available",
				})
			);
		}

		alert("Fake Cancellation!");
	};

	return (
		<div className={styles.ThisWeekView}>
			<WorkoutsList
				workouts={workouts}
				viewWorkout={viewWorkoutItem}
				editWorkout={editWorkoutItem}
				deleteWorkout={deleteWorkoutItem}
				cancelWorkout={cancelWorkoutItem}
				markAsCompleted={markAsCompleted}
			/>

			{/* EDIT MODAL */}
			{/* VIEW MODAL */}
			{/* CONFIRM DELETE MODAL */}
			{/* CONFIRM CANCEL MODAL */}
		</div>
	);
};

export default ThisWeekView;
