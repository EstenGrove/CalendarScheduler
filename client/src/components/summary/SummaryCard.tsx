import { ComponentPropsWithoutRef, ReactNode, useState } from "react";
import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/summary/SummaryCard.module.scss";

type CardProps = {
	title: string;
	goTo?: () => void;
	children?: ReactNode;
};

// @ts-expect-error: this is fine
interface Props extends CardProps, ComponentPropsWithoutRef<"div"> {}

const SummaryCard = ({ goTo, title, children, ...rest }: Props) => {
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
		<div className={styles.SummaryCard} {...rest}>
			<div className={styles.SummaryCard_top}>
				<h4 onClick={handleGoTo} className={styles.SummaryCard_top_title}>
					{title}
				</h4>
				<button
					type="button"
					onClick={toggleCollapse}
					className={styles.SummaryCard_top_goTo}
				>
					<svg className={styles.SummaryCard_top_goTo_icon} style={iconCss}>
						<use xlinkHref={`${sprite}#icon-keyboard_arrow_down`}></use>
					</svg>
				</button>
			</div>
			<div className={styles.SummaryCard_main} data-collapsed={collapsed}>
				{!collapsed ? children : null}
			</div>
		</div>
	);
};

export default SummaryCard;
