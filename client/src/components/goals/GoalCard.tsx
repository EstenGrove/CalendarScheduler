import React from "react";
import styles from "../../css/goals/GoalCard.module.scss";

type Props = { percentage: number };

// const arc = (
// 	<svg width={200} height={200} viewBox="200 200">
// 		<circle
// 			cx="50"
// 			cy="50"
// 			r={radius}
// 			fill="none"
// 			stroke="#e0e0e0"
// 			strokeWidth="10"
// 		/>
// 		<circle
// 			cx="50"
// 			cy="50"
// 			r={radius}
// 			fill="none"
// 			stroke="#007bff"
// 			strokeWidth="10"
// 			strokeDasharray={circumference}
// 			strokeDashoffset={strokeDashoffset}
// 		/>
// 	</svg>
// );

const GoalCard = ({ percentage = 42 }: Props) => {
	const radius = 50;
	const circumference = 2 * Math.PI * radius;
	const strokeDashoffset = circumference - (percentage / 100) * circumference;
	return (
		<div className={styles.GoalCard}>
			<div className={styles.GoalCard_wrapper}>
				<svg
					className={styles.GoalCard_wrapper_svg}
					viewBox="0 0 150 150"
					width={125}
					height={125}
				>
					<circle
						cx={75}
						cy={75}
						r={50}
						stroke="green"
						strokeWidth={6}
						fill="none"
						// pathLength={100}
						pathLength={50}
						transform="rotate(-60 75, 75)"
					/>
				</svg>
			</div>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default GoalCard;
