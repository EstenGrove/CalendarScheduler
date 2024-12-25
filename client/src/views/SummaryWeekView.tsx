import { ReactNode, useState } from "react";
import sprite from "../assets/icons/calendar.svg";
import styles from "../css/views/SummaryWeekView.module.scss";
import DiffSummary from "../components/summary/DiffSummary";
import MainSummaryCard from "../components/summary/MainSummaryCard";
import { subDays } from "date-fns";
import SummaryCard from "../components/summary/SummaryCard";
import BarSummary from "../components/summary/BarSummary";

type CardProps = {
	children?: ReactNode;
};
const Card = ({ children }: CardProps) => {
	return <div className={styles.Card}>{children}</div>;
};

const summaryData = {
	currentWeekTotals: {
		mins: 46,
		reps: 118,
		steps: 2802,
		miles: 6.03,
		dayTotals: [],
	},
	prevWeekTotals: {
		mins: 15,
		reps: 97,
		steps: 4811,
		miles: 4.03,
		dayTotals: [],
	},
};

const dummy1 = (
	<div className={styles.SummaryWeekView_group}>
		<DiffSummary
			title="Mins."
			label="mins."
			iconName="time"
			prevValue={17}
			curValue={24}
			// date={subDays(new Date(), 3)}
		/>
		<DiffSummary
			title="Reps"
			label="reps"
			iconName="weight"
			prevValue={32}
			curValue={18}
			// date={subDays(new Date(), 1)}
		/>
		<DiffSummary
			title="Steps"
			label="steps"
			iconName="steps"
			prevValue={32}
			curValue={33}
			date={subDays(new Date(), 1)}
		/>
		<DiffSummary
			title="Miles"
			label="miles"
			iconName="miles"
			prevValue={32}
			curValue={46}
			date={subDays(new Date(), 1)}
		/>
	</div>
);

type LgCardProps = {
	title: string;
	children?: ReactNode;
};

const LargeCard = ({ title, children }: LgCardProps) => {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const iconCss = {
		transition: "all .3s linear",
		transform: isCollapsed ? "rotate(-90deg)" : "initial",
	};

	const toggleCollapse = () => {
		setIsCollapsed(!isCollapsed);
	};

	return (
		<div className={styles.LargeCard}>
			<div className={styles.LargeCard_top}>
				<h4 className={styles.LargeCard_top_title}>{title}</h4>
				<button
					type="button"
					onClick={toggleCollapse}
					className={styles.LargeCard_top_goTo}
				>
					<svg className={styles.LargeCard_top_goTo_icon} style={iconCss}>
						<use xlinkHref={`${sprite}#icon-keyboard_arrow_down`}></use>
					</svg>
				</button>
			</div>
			{!isCollapsed && (
				<div
					className={styles.LargeCard_main}
					data-card-collapsed={isCollapsed}
				>
					{children}
				</div>
			)}
		</div>
	);
};

type CardLGProps = {
	title: string;
	children?: ReactNode;
};
const CardLG = ({ title, children }: CardLGProps) => {
	return (
		<div className={styles.CardLG}>
			<div className={styles.CardLG_title}>{title}</div>
			<div className={styles.CardLG_inner}>{children}</div>
		</div>
	);
};

const SummaryWeekView = () => {
	return (
		<div className={styles.SummaryWeekView}>
			<div className={styles.SummaryWeekView_row}>
				<CardLG title="Week">{dummy1}</CardLG>
				<CardLG title="Progress">{dummy1}</CardLG>
			</div>
		</div>
	);
};

export default SummaryWeekView;
