import { useSelector } from "react-redux";
import styles from "../../css/workouts/WorkoutsList.module.scss";
import {
	selectIsLoadingWorkouts,
	selectWorkoutsStatus,
} from "../../features/workouts/workoutsSlice";
import { TStatus } from "../../features/types";
import { type UserWorkout } from "../../features/workouts/types";
import NoData from "../ui/NoData";
import Loader from "../ui/Loader";
import UserWorkoutItem from "./UserWorkout";

type Props = {
	workouts: UserWorkout[];
	viewWorkout: (workout: UserWorkout) => void;
	editWorkout: (workout: UserWorkout) => void;
	deleteWorkout: (workout: UserWorkout) => void;
	cancelWorkout: (workout: UserWorkout) => void;
	markAsCompleted: (workout: UserWorkout) => void;
};

const hasWorkouts = (workouts: UserWorkout[]) => {
	return workouts && workouts.length > 0;
};

const WorkoutsList = ({
	workouts,
	viewWorkout,
	editWorkout,
	deleteWorkout,
	cancelWorkout,
	markAsCompleted,
}: Props) => {
	const isLoading: boolean = useSelector(selectIsLoadingWorkouts);
	const status: TStatus = useSelector(selectWorkoutsStatus);
	const isEmpty: boolean = status !== "PENDING" && !hasWorkouts(workouts);

	return (
		<div className={styles.WorkoutsList}>
			<div className={styles.WorkoutsList_inner}>
				{isEmpty && <NoData>No scheduled workouts for this day.</NoData>}
				{isLoading && <Loader>Loading workouts for day...</Loader>}

				{hasWorkouts(workouts) &&
					workouts.map((workout, idx) => (
						<UserWorkoutItem
							key={workout.workoutID + "-" + idx}
							workout={workout}
							viewWorkout={() => viewWorkout(workout)}
							editWorkout={() => editWorkout(workout)}
							deleteWorkout={() => deleteWorkout(workout)}
							cancelWorkout={() => cancelWorkout(workout)}
							markAsCompleted={() => markAsCompleted(workout)}
						/>
					))}
			</div>
		</div>
	);
};

export default WorkoutsList;
