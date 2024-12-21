import styles from "../../css/workouts/WorkoutPlan.module.scss";
import type { WorkoutPlan } from "../../features/workouts/types";

type Props = { workoutPlan: WorkoutPlan };

const WorkoutPlan = ({ workoutPlan }: Props) => {
	console.log("workoutPlan", workoutPlan);
	return (
		<div className={styles.WorkoutPlan}>
			{/*  */}
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default WorkoutPlan;
