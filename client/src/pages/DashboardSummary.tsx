import styles from "../css/pages/DashboardSummary.module.scss";
import { Outlet, useLocation } from "react-router-dom";
import { PageNav, PageNavButton } from "../components/layout/PageNav";
import PageHeader from "../components/layout/PageHeader";

const getTitle = (newPath: string) => {
	// const url = new URL()
	const pathName = newPath;
	const lastSlash = pathName.lastIndexOf("/");
	const path = pathName.slice(lastSlash + 1);
	const withUpper = path.slice(0, 1).toUpperCase() + path.slice(1);

	return `Summary (${withUpper})`;
};

const DashboardSummary = () => {
	const location = useLocation();
	const title = getTitle(location.pathname);

	return (
		<div className={styles.DashboardSummary}>
			<PageHeader title={title} />
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
