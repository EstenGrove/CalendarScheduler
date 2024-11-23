import styles from "../css/pages/Dashboard.module.scss";
import { Outlet } from "react-router-dom";
import { useWindowSize } from "../hooks/useWindowSize";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/user/userSlice";
import { CurrentUser } from "../features/user/types";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const Dashboard = () => {
	const windowSize = useWindowSize();
	const currentUser: CurrentUser = useSelector(selectCurrentUser);

	return (
		<div className={styles.Dashboard}>
			{windowSize.width < 800 && <Navbar currentUser={currentUser} />}
			<main className={styles.Dashboard_main}>
				{windowSize.width > 800 && <Sidebar />}

				{/* DASHBOARD ROUTES */}
				<Outlet />
			</main>
		</div>
	);
};

export default Dashboard;
