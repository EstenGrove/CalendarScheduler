import styles from "../css/views/SummaryDayView.module.scss";
import GoalCard from "../components/goals/GoalCard";
import { formatDate } from "../utils/utils_dates";

const SummaryDayView = () => {
	return (
		<div className={styles.SummaryDayView}>
			<GoalCard
				title="Minutes Goal"
				iconName="time"
				percentage={78}
				details={formatDate(new Date(), "shortMonth")}
			/>
		</div>
	);
};

export default SummaryDayView;
