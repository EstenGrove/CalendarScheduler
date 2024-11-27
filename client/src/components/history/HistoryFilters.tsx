import { ComponentPropsWithoutRef, ReactNode } from "react";
import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/history/HistoryFilters.module.scss";

type Props = {
	selectFilter: (filter: string) => void;
	selectedFilters: string[];
	clearFilters: () => void;
	openFiltersModal: () => void;
};

type FilterBtnProps = {
	onClick: () => void;
};
const FilterButton = ({ onClick }: FilterBtnProps) => {
	return (
		<div onClick={onClick} className={styles.FilterButton}>
			<svg className={styles.FilterButton_icon}>
				<use xlinkHref={`${sprite}#icon-filter_alt`}></use>
			</svg>
			<span>Filter</span>
		</div>
	);
};

type FilterOptProps = {
	children?: ReactNode;
	onClick: () => void;
};

// @ts-expect-error: this is fine
interface FilterProps
	extends FilterOptProps,
		ComponentPropsWithoutRef<"button"> {}

const FilterOption = ({ children, onClick, ...rest }: FilterProps) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className={styles.FilterButton}
			{...rest}
		>
			{children}
		</button>
	);
};

const HistoryFilters = ({
	selectFilter,
	selectedFilters = [],
	clearFilters,
	openFiltersModal,
}: Props) => {
	return (
		<div className={styles.HistoryFilters}>
			<div className={styles.HistoryFilters_inner}>
				{selectedFilters && selectedFilters.length > 0 && (
					<FilterOption
						onClick={clearFilters}
						style={{
							marginRight: "auto",
							backgroundColor: "var(--accent-red2)",
						}}
					>
						Clear All
					</FilterOption>
				)}
				<FilterOption onClick={() => selectFilter("Today")}>Today</FilterOption>
				<FilterButton onClick={openFiltersModal} />
			</div>
			{/*  */}
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default HistoryFilters;
