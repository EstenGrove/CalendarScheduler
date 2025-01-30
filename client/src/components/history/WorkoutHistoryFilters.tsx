import { ComponentPropsWithoutRef, ReactNode } from "react";
import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/history/WorkoutHistoryFilters.module.scss";
import { HistoryEntry } from "../../features/workoutHistory/types";
import { FilterSettings } from "../../utils/utils_filters";

type Props = {
	filters: string[];
	filterSettings: FilterSettings;
	workoutHistory: HistoryEntry[];
	filteredLogs: HistoryEntry[];
	toggleTodayFilter: () => void;
	openFiltersModal: () => void;
	clearFilters: () => void;
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

// Checks if we have any selected filters beyond the 'None' which is used as initial state
const checkForFilters = (
	filters: string[],
	filterSettings: FilterSettings
): boolean => {
	const hasToday = filters && filters.length > 0;
	const hasNonDefault = filterSettings.rangeType !== "None";

	return hasToday || hasNonDefault;
};

const WorkoutHistoryFilters = ({
	toggleTodayFilter,
	filters = [],
	filterSettings,
	clearFilters,
	workoutHistory,
	filteredLogs,
	openFiltersModal,
}: Props) => {
	const totalCount: number = workoutHistory?.length || 0;
	const logCount: number = filteredLogs?.length || 0;
	const hasFilters: boolean = checkForFilters(filters, filterSettings);

	return (
		<div className={styles.WorkoutHistoryFilters}>
			<div className={styles.WorkoutHistoryFilters_inner}>
				<div className={styles.WorkoutHistoryFilters_inner_count}>
					<b>{logCount}</b> / <b>{totalCount}</b> logs
				</div>
				{/* {filters && filters.length > 0 && ( */}
				{hasFilters && (
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
		</div>
	);
};

export default WorkoutHistoryFilters;
