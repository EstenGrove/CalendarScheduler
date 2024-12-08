import { useEffect, useState } from "react";
import styles from "../css/pages/DashboardWorkoutWeek.module.scss";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store/store";
import { selectCurrentUser } from "../features/user/userSlice";
import {
	fetchWorkoutPlans,
	fetchWorkouts,
	fetchWorkoutsByDate,
} from "../features/workouts/operations";
import { formatDate } from "../utils/utils_dates";
import { selectWorkouts } from "../features/workouts/workoutsSlice";
import { Workout } from "../features/workouts/types";
import WeeklyHeader from "../components/workouts/WeeklyHeader";
import WorkoutsList from "../components/workouts/WorkoutsList";

const DashboardWorkoutWeek = () => {
	const dispatch = useAppDispatch();
	const currentUser = useSelector(selectCurrentUser);
	const workouts = useSelector(selectWorkouts);
	const [selectedDate, setSelectedDate] = useState<Date | string>(new Date());
	const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
	console.log("workouts", workouts);

	const selectDate = (date: Date | string) => {
		setSelectedDate(date);
		fetchWorkoutsForDay(date);
	};

	const selectWorkout = (selection: Workout) => {
		if (selectedWorkout && selectedWorkout.workoutID) {
			const selectedID = selectedWorkout.workoutID;
			const newID = selection.workoutID;
			const alreadySelected = selectedID === newID;

			setSelectedWorkout(alreadySelected ? null : selection);
		} else {
			setSelectedWorkout(selection);
		}
	};

	const fetchWorkoutsForDay = (targetDate: Date | string) => {
		const { userID } = currentUser;
		const startDate = formatDate(targetDate, "db");
		const endDate = formatDate(targetDate, "db");

		dispatch(
			fetchWorkoutsByDate({
				userID,
				startDate,
				endDate,
			})
		);
	};

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		const getWorkoutData = () => {
			const { userID } = currentUser;
			const startDate = formatDate(selectedDate, "db");
			const endDate = formatDate(selectedDate, "db");

			Promise.all([
				dispatch(
					fetchWorkouts({
						userID,
						startDate,
						endDate,
					})
				),
				dispatch(
					fetchWorkoutPlans({
						userID,
						startDate,
						endDate,
					})
				),
			]);
		};

		getWorkoutData();

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.DashboardWorkoutWeek}>
			<WeeklyHeader
				baseDate={new Date()}
				onSelect={selectDate}
				selectedDate={selectedDate}
			/>
			<div className={styles.DashboardWorkoutWeek_summary}>
				{/*  */}
				{/*  */}
			</div>
			<div className={styles.DashboardWorkoutWeek_list}>
				<WorkoutsList workouts={workouts} selectWorkout={selectWorkout} />
			</div>
		</div>
	);
};

export default DashboardWorkoutWeek;
