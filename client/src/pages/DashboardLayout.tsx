import styles from "../css/pages/DashboardLayout.module.scss";
import { selectCurrentUser } from "../features/user/userSlice";
import { useSelector } from "react-redux";
import { subDays } from "date-fns";
// components
import PageHeader from "../components/layout/PageHeader";
import WeekSummary from "../components/summary/WeekSummary";
import DynamicSummaryView from "../views/DynamicSummaryView";

const getLast7DaysRange = () => {
	const today = new Date();
	const sevenDaysAgo = subDays(today, 7);

	return {
		startDate: sevenDaysAgo,
		endDate: today,
	};
};

const DashboardLayout = () => {
	const last7Days = getLast7DaysRange();
	const currentUser = useSelector(selectCurrentUser);

	return (
		<div className={styles.DashboardLayout}>
			<PageHeader title="Dashboard" />
			<div className={styles.DashboardLayout_summaries}>
				<WeekSummary currentUser={currentUser} />
				{/* <DynamicSummaryView currentUser={currentUser}  /> */}
			</div>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default DashboardLayout;
