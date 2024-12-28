import { ReactNode } from "react";
import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/filters/SummaryViewFilters.module.scss";

type Props = {
	children?: ReactNode;
};

type FilterBtnProps = {
	onClick: () => void;
	children?: ReactNode;
};
const QuickFilterButton = ({ onClick, children }: FilterBtnProps) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className={styles.QuickFilterButton}
		>
			<svg className={styles.QuickFilterButton_icon}>
				<use xlinkHref={`${sprite}#icon-today`}></use>
			</svg>
			{children}
		</button>
	);
};
const FiltersButton = ({ onClick, children }: FilterBtnProps) => {
	return (
		<button type="button" onClick={onClick} className={styles.FiltersButton}>
			<svg className={styles.FiltersButton_icon}>
				<use xlinkHref={`${sprite}#icon-filter_alt`}></use>
			</svg>
			{children}
		</button>
	);
};

const SummaryViewFilters = ({ children }: Props) => {
	return (
		<div className={styles.SummaryViewFilters}>
			<div className={styles.SummaryViewFilters_inner}>{children}</div>
		</div>
	);
};

export { SummaryViewFilters, QuickFilterButton, FiltersButton };
