import styles from "../css/pages/DashboardSettings.module.scss";
import PageHeader from "../components/layout/PageHeader";
import { PageNav, PageNavButton } from "../components/layout/PageNav";
import { Outlet } from "react-router-dom";

const DashboardSettings = () => {
	return (
		<div className={styles.DashboardSettings}>
			<PageHeader title="Settings" />
			<div className={styles.DashboardSettings_nav}>
				<PageNav>
					<PageNavButton to="user">User</PageNavButton>
					<PageNavButton to="workouts">Workouts</PageNavButton>
					<PageNavButton to="types">Workout Types</PageNavButton>
				</PageNav>
			</div>
			<div className={styles.DashboardSettings_main}>
				<Outlet />
			</div>
		</div>
	);
};

export default DashboardSettings;
