import styles from "../css/pages/DashboardLayout.module.scss";
import { selectCurrentUser } from "../features/user/userSlice";
import { useSelector } from "react-redux";

// components
import PageHeader from "../components/layout/PageHeader";
import WeekSummary from "../components/summary/WeekSummary";

const DashboardLayout = () => {
	const currentUser = useSelector(selectCurrentUser);

	return (
		<div className={styles.DashboardLayout}>
			<PageHeader title="Dashboard" />
			<div className={styles.DashboardLayout_summaries}>
				<WeekSummary currentUser={currentUser} />
			</div>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default DashboardLayout;
