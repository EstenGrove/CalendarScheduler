import styles from "../css/pages/DashboardLayout.module.scss";
import sprite from "../assets/icons/calendar.svg";
import { selectCurrentUser } from "../features/user/userSlice";
import { useSelector } from "react-redux";
import { subDays } from "date-fns";
import { CustomDateRange } from "../features/summary/types";
import { formatDate } from "../utils/utils_dates";
// components
import PageHeader from "../components/layout/PageHeader";
import DynamicSummaryView from "../views/DynamicSummaryView";
import { useState } from "react";
import SummaryFilters from "../components/filters/SummaryFilters";

const getLast7DaysRange = (): CustomDateRange => {
	const today = new Date();
	const sevenDaysAgo = subDays(today, 6);

	return {
		startDate: formatDate(sevenDaysAgo, "db"),
		endDate: formatDate(today, "db"),
	};
};

type FilterButton = {
	onClick: () => void;
};
const TodayButton = ({ onClick }: FilterButton) => {
	return (
		<button onClick={onClick} type="button" className={styles.TodayButton}>
			<svg className={styles.TodayButton_icon}>
				<use xlinkHref={`${sprite}#icon-today`}></use>
			</svg>
			<span>Today</span>
		</button>
	);
};
const FiltersButton = ({ onClick }: FilterButton) => {
	return (
		<button onClick={onClick} type="button" className={styles.FiltersButton}>
			<svg className={styles.FiltersButton_icon}>
				<use xlinkHref={`${sprite}#icon-filter_alt`}></use>
			</svg>
			<span>Filter</span>
		</button>
	);
};

const DashboardLayout = () => {
	const last7Days = getLast7DaysRange();
	const currentUser = useSelector(selectCurrentUser);
	const [showSummaryFilters, setShowSummaryFilters] = useState<boolean>(false);

	const toggleTodayFilter = () => {
		// do stuff
	};

	const openFiltersModal = () => {
		setShowSummaryFilters(true);
	};
	const closeFiltersModal = () => {
		setShowSummaryFilters(false);
	};

	console.log("last7Days", last7Days);

	return (
		<div className={styles.DashboardLayout}>
			<PageHeader title="Dashboard" />
			<div className={styles.DashboardLayout_summaries}>
				<div className={styles.DashboardLayout_summaries_filters}>
					<TodayButton onClick={toggleTodayFilter} />
					<FiltersButton onClick={openFiltersModal} />
				</div>
				<DynamicSummaryView currentUser={currentUser} dateRange={last7Days} />
			</div>

			{showSummaryFilters && <SummaryFilters close={closeFiltersModal} />}
		</div>
	);
};

export default DashboardLayout;
