import { useCallback, useEffect } from "react";
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
import { fetchRangeSummary } from "../features/summary/operations";

type Props = {
	currentUser: CurrentUser;
	dateRange: CustomDateRange;
};

const DynamicSummaryView = ({ currentUser, dateRange }: Props) => {
	const dispatch = useAppDispatch();
	const isLoading = useSelector(selectIsLoadingRangeSummary);
	const rangeSummary = useSelector(selectRangeSummary);

	const getSummaryData = useCallback(() => {
		if (currentUser?.userID && dateRange) {
			const { userID } = currentUser;
			const { startDate, endDate } = dateRange;
			dispatch(
				fetchRangeSummary({
					userID,
					startDate,
					endDate,
				})
			);
		}
	}, [currentUser, dateRange, dispatch]);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		getSummaryData();

		return () => {
			isMounted = false;
		};
	}, [getSummaryData]);

	return (
		<div className={styles.DynamicSummaryView}>
			<DynamicSummary
				isLoading={isLoading}
				dateRange={dateRange}
				rangeSummary={rangeSummary}
			/>
		</div>
	);
};

export default DynamicSummaryView;
