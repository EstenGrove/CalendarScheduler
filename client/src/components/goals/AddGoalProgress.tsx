import { useState } from "react";
import styles from "../../css/goals/AddGoalProgress.module.scss";
import { CurrentUser } from "../../features/user/types";

type Props = {
	currentUser: CurrentUser;
};

type GoalMetric = "minutes" | "steps" | "reps";

interface GoalProgress {
	metric: GoalMetric;
	value: number;
}

const AddGoalProgress = ({ currentUser }: Props) => {
	const [goalValues, setGoalValues] = useState<GoalProgress>({
		metric: "minutes",
		value: 0,
	});
	return (
		<div className={styles.AddGoalProgress}>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default AddGoalProgress;
