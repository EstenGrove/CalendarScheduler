import React from "react";
import styles from "../css/views/SummaryDayView.module.scss";
import GoalCard from "../components/goals/GoalCard";

type Props = {};

const SummaryDayView = ({}: Props) => {
	return (
		<div className={styles.SummaryDayView}>
			<GoalCard percentage={43} />
			{/*  */}
			{/*  */}
		</div>
	);
};

export default SummaryDayView;
