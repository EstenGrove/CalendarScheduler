import { useEffect, useState } from "react";
import styles from "../css/pages/DashboardWorkoutWeek.module.scss";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store/store";
import { selectCurrentUser } from "../features/user/userSlice";
import {
	fetchWorkoutPlans,
	fetchWorkoutsByDate,
} from "../features/workouts/operations";
import { formatDate, formatTime } from "../utils/utils_dates";
import { selectWorkouts } from "../features/workouts/workoutsSlice";
import Modal from "../components/shared/Modal";
import Button from "../components/shared/Button";
import ThisWeekView from "../views/ThisWeekView";
import WeeklyHeader from "../components/workouts/WeeklyHeader";
import CreateQuickWorkout from "../components/workouts/CreateQuickWorkout";
import ModalFooter from "../components/shared/ModalFooter";
import { QuickWorkoutValues } from "../utils/types";

type FooterProps = {
	onCancel: () => void;
	onSave: () => void;
};

const AddNewFooter = ({ onCancel, onSave }: FooterProps) => {
	return (
		<ModalFooter>
			<div className={styles.AddNewFooter}>
				<Button onClick={onCancel} className={styles.cancelBtn}>
					Cancel
				</Button>
				<Button onClick={onSave} className={styles.saveBtn}>
					Save
				</Button>
			</div>
		</ModalFooter>
	);
};

const initialState: QuickWorkoutValues = {
	name: "Untitled",
	desc: "",
	time: formatTime(new Date(), "long"),
	tagColor: "var(--accent-yellow)",
	activityType: "",
	weight: 20,
	reps: 1,
	sets: 1,
	mins: 10,
	steps: 0,
	miles: 0,
};

const DashboardWorkoutWeek = () => {
	const dispatch = useAppDispatch();
	const currentUser = useSelector(selectCurrentUser);
	const workouts = useSelector(selectWorkouts);
	const [showAddNewModal, setShowAddNewModal] = useState<boolean>(false);
	const [selectedDate, setSelectedDate] = useState<Date | string>(new Date());
	// new workout values
	const [newWorkout, setNewWorkout] =
		useState<QuickWorkoutValues>(initialState);

	const selectDate = (date: Date | string) => {
		setSelectedDate(date);
		fetchWorkoutsForDay(date);
	};

	const selectTag = (tag: string) => {
		console.log("tag", tag);
		if (newWorkout.tagColor === tag) {
			setNewWorkout({
				...newWorkout,
				tagColor: "",
			});
		} else {
			setNewWorkout({
				...newWorkout,
				tagColor: tag,
			});
		}
	};

	const handleChange = (name: string, value: string | number) => {
		setNewWorkout({
			...newWorkout,
			[name]: value,
		});
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

	const saveNewQuickWorkout = () => {
		//
		//
	};
	const cancelAddNewWorkout = () => {
		setNewWorkout(initialState);
		closeAddNewWorkoutModal();
	};

	const openAddNewWorkoutModal = () => {
		setShowAddNewModal(true);
	};
	const closeAddNewWorkoutModal = () => {
		setShowAddNewModal(false);
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
					fetchWorkoutsByDate({
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
				<Button onClick={openAddNewWorkoutModal}>+ Add New</Button>
			</div>
			<div className={styles.DashboardWorkoutWeek_list}>
				<ThisWeekView
					currentUser={currentUser}
					workouts={workouts}
					selectedDate={selectedDate}
				/>
			</div>

			{showAddNewModal && (
				<Modal title="" closeModal={closeAddNewWorkoutModal}>
					<CreateQuickWorkout
						values={newWorkout}
						selectTag={selectTag}
						handleChange={handleChange}
					/>
					<AddNewFooter
						onCancel={cancelAddNewWorkout}
						onSave={saveNewQuickWorkout}
					/>
				</Modal>
			)}
		</div>
	);
};

export default DashboardWorkoutWeek;
