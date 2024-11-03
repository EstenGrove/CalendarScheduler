import { Outlet } from "react-router-dom";
import styles from "../css/pages/Dashboard.module.scss";

const Dashboard = () => {
	return (
		<div className={styles.Dashboard}>
			<main className={styles.Dashboard_main}>
				<Outlet />
			</main>
		</div>
	);
};

export default Dashboard;
