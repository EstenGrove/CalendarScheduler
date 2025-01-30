import styles from "../css/pages/DashboardGoals.module.scss";
import PageHeader from "../components/layout/PageHeader";
import { PageNav, PageNavButton } from "../components/layout/PageNav";
import { Outlet } from "react-router-dom";

const DashboardGoals = () => {
	return (
		<div className={styles.DashboardGoals}>
			<PageHeader title="Goals" />
			<div className={styles.DashboardGoals_nav}>
				<PageNav>
					<PageNavButton to="current">Goals</PageNavButton>
					<PageNavButton to="progress">Progress</PageNavButton>
				</PageNav>
			</div>
			<div className={styles.DashboardGoals_main}>
				<Outlet />
			</div>
		</div>
	);
};

export default DashboardGoals;
