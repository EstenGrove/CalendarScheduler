import { useSelector } from "react-redux";
import styles from "../../css/workouts/WorkoutsList.module.scss";
import { Workout } from "../../features/workouts/types";
import {
	selectIsLoadingWorkouts,
	selectWorkoutsStatus,
} from "../../features/workouts/workoutsSlice";
import { TStatus } from "../../features/types";
import NoData from "../ui/NoData";
import WorkoutEntry from "./WorkoutEntry";
import Loader from "../ui/Loader";
import UserWorkout from "./UserWorkout";

type Props = {
	workouts: Workout[];
	selectWorkout: (workout: Workout) => void;
};

const hasWorkouts = (workouts: Workout[]) => {
	return workouts && workouts.length > 0;
};

const WorkoutsList = ({ workouts, selectWorkout }: Props) => {
	const isLoading: boolean = useSelector(selectIsLoadingWorkouts);
	const status: TStatus = useSelector(selectWorkoutsStatus);
	const isEmpty: boolean = status === "FULFILLED" && !hasWorkouts(workouts);

	const markAsCompleted = (workout: Workout) => {
		// do stuff
		console.log("workout", workout);
	};

	return (
		<div className={styles.WorkoutsList}>
			<div className={styles.WorkoutsList_inner}>
				{isEmpty && <NoData>No workouts found.</NoData>}
				{isLoading && (
					<div>
						<Loader>Loading workouts for day...</Loader>
					</div>
				)}
				{hasWorkouts(workouts) &&
					workouts.map((workout, idx) => (
						<UserWorkout
							key={workout.workoutID + "-" + idx}
							workout={workout}
							selectWorkout={() => selectWorkout(workout)}
							markAsCompleted={() => markAsCompleted(workout)}
						/>
						// <WorkoutEntry
						// 	key={workout.workoutID + "-" + idx}
						// 	workout={workout}
						// 	selectWorkout={() => selectWorkout(workout)}
						// 	markAsCompleted={() => markAsCompleted(workout)}
						// />
					))}
			</div>
		</div>
	);
};

export default WorkoutsList;
