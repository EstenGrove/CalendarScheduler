import WeeklyHeader from "../components/workouts/WeeklyHeader";
import WorkoutEntry from "../components/workouts/WorkoutEntry";
import styles from "../css/pages/DashboardWorkouts.module.scss";

type Props = {};

const DashboardWorkouts = ({}: Props) => {
	return (
		<div className={styles.DashboardWorkouts}>
			<div className={styles.DashboardWorkouts_header}>
				<h1 className={styles.DashboardWorkouts_header_title}>Workouts</h1>
			</div>
			<div className={styles.DashboardWorkouts_thisWeek}>
				<WeeklyHeader />
			</div>
			<div className={styles.DashboardWorkouts_list}>
				<WorkoutEntry />
			</div>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default DashboardWorkouts;
