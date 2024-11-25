import { useState } from "react";
import FloatingButton from "../components/dashboard/FloatingButton";
import WeeklyHeader from "../components/workouts/WeeklyHeader";
import WorkoutEntry from "../components/workouts/WorkoutEntry";
import styles from "../css/pages/DashboardWorkouts.module.scss";
import Modal from "../components/shared/Modal";
import PageHeader from "../components/layout/PageHeader";
import { NavLink, Outlet } from "react-router-dom";
import { PageNav, PageNavButton } from "../components/layout/PageNav";
import CreateWorkoutPlan from "../components/workouts/CreateWorkoutPlan";
import { CreatePlanValues } from "../utils/utils_workoutPlans";

// TABS:
// - "This Week"
// - "Workouts/Plans"
// - "History"

const DashboardWorkouts = () => {
	const [newWorkoutPlan, setNewWorkoutPlan] = useState<CreatePlanValues>({
		workoutType: "",
		workoutPlanName: "Untitled Workout Plan",
		workoutPlanDesc: "",
		workoutPlanLength: 15, // in mins
		workoutPlanSets: 0,
		workoutPlanReps: 0,
		workoutPlanWeight: 15,
	});
	const [showCreateWorkoutModal, setShowCreateWorkoutModal] =
		useState<boolean>(false);

	const openWorkoutModal = () => {
		setShowCreateWorkoutModal(true);
	};
	const closeWorkoutModal = () => {
		setShowCreateWorkoutModal(false);
	};

	const handleChange = (name: string, value: string | number) => {
		setNewWorkoutPlan({
			...newWorkoutPlan,
			[name]: value,
		});
	};

	const createWorkoutPlan = () => {
		//
	};

	return (
		<div className={styles.DashboardWorkouts}>
			<PageHeader title="Workouts (this week)" />
			<div className={styles.DashboardWorkouts_tabs}>
				<PageNav>
					<PageNavButton to="week">This Week</PageNavButton>
					<PageNavButton to="plans">Plans</PageNavButton>
					<PageNavButton to="history">History</PageNavButton>
				</PageNav>
			</div>
			<Outlet />
			<FloatingButton icon="workout" onClick={openWorkoutModal} />

			{showCreateWorkoutModal && (
				<Modal title="Create Workout Plan" closeModal={closeWorkoutModal}>
					<CreateWorkoutPlan
						values={newWorkoutPlan}
						handleChange={handleChange}
					/>
				</Modal>
			)}
		</div>
	);
};

export default DashboardWorkouts;
