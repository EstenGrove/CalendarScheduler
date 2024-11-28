import { ComponentPropsWithoutRef, ReactNode } from "react";
import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/history/HistoryFilters.module.scss";
import { WorkoutLogEntry } from "../../features/workoutHistory/types";

type Props = {
	workoutLogs: WorkoutLogEntry[];
	filteredLogs: WorkoutLogEntry[];
	selectFilter: (filter: string) => void;
	toggleTodayFilter: () => void;
	filters: string[];
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
	toggleTodayFilter,
	filters = [],
	clearFilters,
	workoutLogs,
	filteredLogs,
	openFiltersModal,
}: Props) => {
	const totalCount = workoutLogs?.length || 0;
	const logCount = filteredLogs?.length || 0;
	return (
		<div className={styles.HistoryFilters}>
			<div className={styles.HistoryFilters_inner}>
				<div className={styles.HistoryFilters_inner_count}>
					<b>{logCount}</b> / <b>{totalCount}</b> logs
				</div>
				{filters && filters.length > 0 && (
					<FilterOption
						onClick={clearFilters}
						style={{
							marginLeft: "auto",
							backgroundColor: "var(--accent-red2)",
						}}
					>
						Clear All
					</FilterOption>
				)}
				<FilterOption onClick={toggleTodayFilter}>Today</FilterOption>
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
