import styles from "../css/pages/DashboardSummary.module.scss";
import PageHeader from "../components/layout/PageHeader";
import { PageNav, PageNavButton } from "../components/layout/PageNav";
import { Outlet } from "react-router-dom";

const DashboardSummary = () => {
	return (
		<div className={styles.DashboardSummary}>
			<PageHeader title="Summary" />
			<div className={styles.DashboardSummary_nav}>
				<PageNav>
					<PageNavButton to="day">Day</PageNavButton>
					<PageNavButton to="week">Week</PageNavButton>
					<PageNavButton to="month">Month</PageNavButton>
					<PageNavButton to="year">Year</PageNavButton>
				</PageNav>
			</div>
			<div className={styles.DashboardSummary_main}>
				<Outlet />
			</div>
		</div>
	);
};

export default DashboardSummary;
