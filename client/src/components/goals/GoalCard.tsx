import { useState } from "react";
import styles from "../../css/goals/GoalCard.module.scss";
import sprite from "../../assets/icons/calendar.svg";
import ProgressCircle from "../ui/ProgressCircle";

type Props = {
	title: string;
	percentage: number;
	details?: string | null;
	size?: number;
	color?: "blue" | "green" | "purple" | "primary";
	trackColor?: string;
	showText?: boolean;
	iconName?: keyof typeof icons;
};

// 0% => 565px
// 20% => 452px
// 100% => 0px

const icons = {
	diff: "waterfall_chart",
	insights: "insights",
	time: "timer",
	week: "date_range",
	calendar: "event_note",
	weight: "fitness_center",
	steps: "directions_walk",
	miles: "directions_run",
} as const;

const GoalCard = ({
	title = "Stats",
	details = null,
	iconName = "calendar",
	percentage = 72,
	size = 150,
	color = "blue",
	trackColor = "var(--blueGrey800)",
	showText = true,
}: Props) => {
	const icon = icons[iconName as keyof object];
	const [collapsed, setCollapsed] = useState<boolean>(false);
	const iconCss = {
		transition: "all .3s linear",
		transform: collapsed ? "rotate(-90deg)" : "initial",
	};

	const toggleCollapse = () => {
		setCollapsed(!collapsed);
	};
	return (
		<div className={styles.GoalCard}>
			<div className={styles.GoalCard_top}>
				<h4 className={styles.GoalCard_top_title}>
					<svg className={styles.GoalCard_top_title_icon}>
						<use xlinkHref={`${sprite}#icon-${icon}`}></use>
					</svg>
					<span>{title}</span>
				</h4>
				<button
					type="button"
					onClick={toggleCollapse}
					className={styles.GoalCard_top_goTo}
				>
					<svg className={styles.GoalCard_top_goTo_icon} style={iconCss}>
						<use xlinkHref={`${sprite}#icon-keyboard_arrow_down`}></use>
					</svg>
				</button>
			</div>
			{!collapsed && (
				<div className={styles.GoalCard_wrapper}>
					<div className={styles.GoalCard_wrapper_main}>
						<ProgressCircle
							percentage={percentage}
							size={size}
							color={color}
							trackColor={trackColor}
							showText={showText}
						/>
					</div>
					<div className={styles.GoalCard_wrapper_details}>{details}</div>
				</div>
			)}
		</div>
	);
};

export default GoalCard;
