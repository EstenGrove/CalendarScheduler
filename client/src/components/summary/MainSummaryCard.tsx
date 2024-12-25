import { ReactNode, useState } from "react";
import styles from "../../css/summary/MainSummaryCard.module.scss";
import sprite from "../../assets/icons/calendar.svg";
import BarSummary from "./BarSummary";
import DiffSummary from "./DiffSummary";

interface MainSummaryData {}

type Props = {
	iconName: keyof typeof icons;
	title: string;
};

const icons = {
	diff: "waterfall_chart",
	insights: "insights",
	time: "timer",
	week: "date_range",
	calendar: "event_note",
	weight: "fitness_center",
};

type MainContainerProps = {
	title: string;
	icon: keyof typeof icons;
	handleGoTo?: () => void;
	children?: ReactNode;
};

const MainContainer = ({
	handleGoTo,
	icon,
	title,
	children,
}: MainContainerProps) => {
	const [collapsed, setCollapsed] = useState<boolean>(false);
	const iconCss = {
		transition: "all .3s linear",
		transform: collapsed ? "rotate(-90deg)" : "initial",
	};

	const toggleCollapse = () => {
		setCollapsed(!collapsed);
	};

	return (
		<div className={styles.MainContainer}>
			<div className={styles.MainContainer_top}>
				<h4 onClick={handleGoTo} className={styles.MainContainer_top_title}>
					<svg
						onClick={handleGoTo}
						className={styles.MainContainer_top_title_icon}
					>
						<use xlinkHref={`${sprite}#icon-${icon}`}></use>
					</svg>
					<span>{title}</span>
				</h4>
				<button
					type="button"
					onClick={toggleCollapse}
					className={styles.MainContainer_top_goTo}
				>
					<svg className={styles.MainContainer_top_goTo_icon} style={iconCss}>
						<use xlinkHref={`${sprite}#icon-keyboard_arrow_down`}></use>
					</svg>
				</button>
			</div>
			<div
				className={styles.MainContainer_main}
				data-summary-collapsed={collapsed}
			>
				{children}
			</div>
		</div>
	);
};

const MainDisplay = () => {
	return (
		<div className={styles.MainDisplay}>
			<BarSummary data={[12, 22, 17, 28, 38, 14, 16]} />
		</div>
	);
};

const MainSummaryCard = ({ iconName = "week" }: Props) => {
	const icon = icons[iconName as keyof object];
	return (
		<MainContainer title="This Week" icon={icon}>
			<div className={styles.MainSummaryCard}>
				<div className={styles.MainSummaryCard_left}>
					<MainDisplay />
				</div>
				<div className={styles.MainSummaryCard_right}>
					<DiffSummary
						title="Workout Mins."
						label="mins."
						iconName="time"
						prevValue={17}
						curValue={24}
					/>
					<DiffSummary
						title="Reps"
						label="reps"
						iconName="weight"
						prevValue={32}
						curValue={24}
					/>
				</div>
			</div>
		</MainContainer>
	);
};

export default MainSummaryCard;
