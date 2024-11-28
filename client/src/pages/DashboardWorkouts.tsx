import styles from "../css/pages/DashboardWorkouts.module.scss";
import { useState } from "react";
import { Location, Outlet, useLocation } from "react-router-dom";
import { PageNav, PageNavButton } from "../components/layout/PageNav";
import { CreatePlanValues } from "../utils/utils_workoutPlans";
// components
import Modal from "../components/shared/Modal";
import PageHeader from "../components/layout/PageHeader";
import FloatingButton from "../components/dashboard/FloatingButton";
import CreateWorkoutPlan from "../components/workouts/CreateWorkoutPlan";

// TABS:
// - "This Week"
// - "Workouts/Plans"
// - "History"

const getPageTitle = (location: Location) => {
	const { pathname } = location;
	const pathMap = {
		"/dashboard/workouts/week": "Workouts (this week)",
		"/dashboard/workouts/plans": "Workout Plans",
		"/dashboard/workouts/history": "Workout History",
	};

	if (pathname in pathMap) {
		const title = pathMap?.[pathname as keyof object];
		return title;
	} else {
		return "Workouts";
	}
};

const DashboardWorkouts = () => {
	const location = useLocation();
	const title = getPageTitle(location);
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
			<PageHeader title={title} />
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
