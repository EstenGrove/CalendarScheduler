import { useState } from "react";
import styles from "../css/pages/DashboardCalendarLayout.module.scss";
import { CurrentUser } from "../features/user/types";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/user/userSlice";
// components
import DashboardCalendar from "./DashboardCalendar";
import FloatingButton from "../components/dashboard/FloatingButton";
import CreateEventModal from "../components/events/CreateEventModal";

const DashboardCalendarLayout = () => {
	const currentUser: CurrentUser = useSelector(selectCurrentUser);

	const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

	const openCreateModal = () => {
		setShowCreateModal(true);
	};
	const closeCreateModal = () => {
		setShowCreateModal(false);
	};

	return (
		<div className={styles.DashboardCalendarLayout}>
			<div className={styles.DashboardCalendarLayout}>
				<DashboardCalendar />
			</div>

			<FloatingButton onClick={openCreateModal} icon="add" />

			{showCreateModal && (
				<CreateEventModal
					currentUser={currentUser}
					closeModal={closeCreateModal}
				/>
			)}
		</div>
	);
};

export default DashboardCalendarLayout;
