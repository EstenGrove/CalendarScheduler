import { ReactNode, useState } from "react";
import styles from "../../css/summary/DiffSummary.module.scss";
import sprite from "../../assets/icons/calendar.svg";
import { formatDate } from "../../utils/utils_dates";

type Props = {
	title: string;
	goTo?: () => void;
	iconName?: keyof typeof icons;
	children?: ReactNode;
	prevValue: number;
	curValue: number;
	label: string | number;
	scoreColor?: string;
	date?: Date | string;
};

type BadgeProps = {
	percent: string | number;
};

// ↓  ↑

const IncreaseBadge = ({ percent }: BadgeProps) => {
	const diff = percent.toString().replace("+", "");
	return (
		<div className={styles.IncreaseBadge}>
			<span className={styles.IncreaseBadge_arrow}>↑</span>
			<span>+{diff}%</span>
		</div>
	);
};
const DecreaseBadge = ({ percent }: BadgeProps) => {
	const diff = percent.toString().replace("-", "");
	return (
		<div className={styles.DecreaseBadge}>
			<span>↓</span>
			<span>-{diff}%</span>
		</div>
	);
};

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

type CardProps = {
	title: string;
	icon: keyof typeof icons;
	handleGoTo: () => void;
	children?: ReactNode;
};

const CardContainer = ({ handleGoTo, icon, title, children }: CardProps) => {
	const [collapsed, setCollapsed] = useState<boolean>(false);
	const iconCss = {
		transition: "all .3s linear",
		transform: collapsed ? "rotate(-90deg)" : "initial",
	};

	const toggleCollapse = () => {
		setCollapsed(!collapsed);
	};

	return (
		<div className={styles.CardContainer}>
			<div className={styles.CardContainer_top}>
				<h4 onClick={handleGoTo} className={styles.CardContainer_top_title}>
					<svg
						onClick={handleGoTo}
						className={styles.CardContainer_top_title_icon}
					>
						<use xlinkHref={`${sprite}#icon-${icon}`}></use>
					</svg>
					<span>{title}</span>
				</h4>
				<button
					type="button"
					onClick={toggleCollapse}
					className={styles.CardContainer_top_goTo}
				>
					<svg className={styles.CardContainer_top_goTo_icon} style={iconCss}>
						<use xlinkHref={`${sprite}#icon-keyboard_arrow_down`}></use>
					</svg>
				</button>
			</div>
			<div
				className={styles.CardContainer_main}
				data-summary-collapsed={collapsed}
			>
				{children}
			</div>
		</div>
	);
};

interface DiffData {
	type: "DECREASED" | "INCREASED";
	diff: number;
}
const getChangesDiff = (prevValue: number, curValue: number): DiffData => {
	if (curValue < prevValue) {
		const decrease = ((prevValue - curValue) / prevValue) * 100;
		const diff = parseFloat(decrease.toFixed(2));
		return {
			type: "DECREASED",
			diff: diff,
		};
	} else {
		const increase = ((curValue - prevValue) / prevValue) * 100;
		const diff = parseFloat(increase.toFixed(2));
		return {
			type: "INCREASED",
			diff: diff,
		};
	}
};

type DiffDisplayProps = {
	prevValue: number;
	curValue: number;
	label: string | number;
	date: string | Date | null;
};

const DiffDisplay = ({
	prevValue,
	curValue,
	label,
	date = null,
}: DiffDisplayProps) => {
	const { type, diff } = getChangesDiff(prevValue, curValue);
	const newDate = date ? formatDate(date, "shortMonth") : "";
	return (
		<div className={styles.DiffDisplay}>
			<div className={styles.DiffDisplay_current}>
				<div className={styles.DiffDisplay_current_value}>{curValue}</div>
				<div className={styles.DiffDisplay_current_label}>{label}</div>
			</div>
			<div className={styles.DiffDisplay_changed}>
				<div className={styles.DiffDisplay_changed_date}>{newDate}</div>
				{type === "INCREASED" && <IncreaseBadge percent={diff} />}
				{type === "DECREASED" && <DecreaseBadge percent={diff} />}
			</div>
		</div>
	);
};

const DiffSummary = ({
	title,
	label = "mins.",
	prevValue = 20,
	curValue = 40,
	date,
	goTo,
	iconName = "time",
}: // scoreColor,
Props) => {
	const icon = icons[iconName as keyof object];

	const handleGoTo = () => {
		return goTo && goTo();
	};

	return (
		<CardContainer title={title} icon={icon} handleGoTo={handleGoTo}>
			<DiffDisplay
				date={date}
				prevValue={prevValue}
				curValue={curValue}
				label={label}
			/>
		</CardContainer>
	);
};

export default DiffSummary;
