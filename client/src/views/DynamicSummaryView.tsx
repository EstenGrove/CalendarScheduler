import styles from "../css/views/DynamicSummaryView.module.scss";
import { useAppDispatch } from "../store/store";
import { useSelector } from "react-redux";
import {
	selectIsLoadingRangeSummary,
	selectRangeSummary,
} from "../features/summary/summarySlice";
import DynamicSummary from "../components/summary/DynamicSummary";
import { CurrentUser } from "../features/user/types";
import { CustomDateRange } from "../features/summary/types";

type Props = {
	currentUser: CurrentUser;
	dateRange: CustomDateRange;
};

const DynamicSummaryView = ({ currentUser, dateRange }: Props) => {
	const { startDate, endDate } = dateRange;
	const dispatch = useAppDispatch();
	const isLoading = useSelector(selectIsLoadingRangeSummary);
	const rangeSummary = useSelector(selectRangeSummary);

	return (
		<div className={styles.DynamicSummaryView}>
			<div className={styles.DynamicSummaryView_options}>
				{/* CUSTOM DATE PICKER AND OR SELECT PICKER */}
				{/* CUSTOM DATE PICKER AND OR SELECT PICKER */}
			</div>
			<DynamicSummary
				isLoading={isLoading}
				dateRange={dateRange}
				rangeSummary={rangeSummary}
			/>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default DynamicSummaryView;
