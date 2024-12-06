import { ComponentPropsWithoutRef, ReactNode, useState } from "react";
import styles from "../../css/summary/ScoreCard.module.scss";
import sprite from "../../assets/icons/calendar.svg";

type CardProps = {
	title: string;
	goTo?: () => void;
	children?: ReactNode;
	value: string | number;
	label: string | number;
	scoreColor?: string;
};

// @ts-expect-error: this is fine
interface Props extends CardProps, ComponentPropsWithoutRef<"div"> {}

const ScoreCard = ({ goTo, title, value, label, scoreColor }: Props) => {
	const [collapsed, setCollapsed] = useState<boolean>(false);
	const iconCss = {
		transition: "all .3s linear",
		transform: collapsed ? "rotate(-90deg)" : "initial",
	};

	const handleGoTo = () => {
		return goTo && goTo();
	};

	const toggleCollapse = () => {
		setCollapsed(!collapsed);
	};
	return (
		<div className={styles.ScoreCard}>
			<div className={styles.ScoreCard_top}>
				<h4 onClick={handleGoTo} className={styles.ScoreCard_top_title}>
					{title}
				</h4>
				<button
					type="button"
					onClick={toggleCollapse}
					className={styles.ScoreCard_top_goTo}
				>
					<svg className={styles.ScoreCard_top_goTo_icon} style={iconCss}>
						<use xlinkHref={`${sprite}#icon-keyboard_arrow_down`}></use>
					</svg>
				</button>
			</div>
			<div className={styles.ScoreCard_main} data-collapsed={collapsed}>
				<div
					className={styles.ScoreCard_main_score}
					style={{ color: scoreColor }}
				>
					{value}
				</div>
				<div className={styles.ScoreCard_main_label}>{label}</div>
			</div>
		</div>
	);
};

export default ScoreCard;
