import styles from "../css/pages/Dashboard.module.scss";
import { Outlet } from "react-router-dom";
import { useWindowSize } from "../hooks/useWindowSize";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/user/userSlice";
import { CurrentUser } from "../features/user/types";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import QuickActions from "../components/dashboard/QuickActions";

const Dashboard = () => {
	const windowSize = useWindowSize();
	const currentUser: CurrentUser = useSelector(selectCurrentUser);

	return (
		<div className={styles.Dashboard}>
			{windowSize.width < 800 && <Navbar currentUser={currentUser} />}
			<main className={styles.Dashboard_main}>
				{windowSize.width > 800 && <Sidebar />}

				{/* FLOATING ACTIONS BAR */}
				<QuickActions currentUser={currentUser} />

				{/* DASHBOARD ROUTES */}
				<div className={styles.Dashboard_main_overflow}>
					<Outlet />
				</div>
			</main>
		</div>
	);
};

export default Dashboard;
