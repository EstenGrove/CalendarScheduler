import styles from "../../css/history/HistoryFilterOptions.module.scss";
import {
	FilterSettings,
	RangePresetType,
	RangeType,
} from "../../utils/utils_filters";
import DatePicker from "../shared/DatePicker";
import MonthPicker from "../shared/MonthPicker";
import QuarterPicker from "../shared/QuarterPicker";
import YearPicker from "../shared/YearPicker";

type Props = {
	values: FilterSettings;
	handleFilter: (name: string, value: string | number) => void;
	handleQuickFilter: (name: string, value: string | number) => void;
	handleMonth: (name: string, value: Date) => void;
	handleDate: (name: string, value: Date) => void;
	handleQuarter: (name: string, value: Date) => void;
	closeModal: () => void;
};
type RangeProps = {
	values: FilterSettings;
	handleFilter: (name: string, value: string | number) => void;
	handleMonth: (name: string, value: Date) => void;
	handleDate: (name: string, value: Date) => void;
	handleQuarter: (name: string, value: Date) => void;
	handleYear: (name: string, value: number) => void;
	closeModal: () => void;
};
type QuickAccessProps = {
	values: FilterSettings;
	handleFilter: (name: string, value: string | number) => void;
	closeModal: () => void;
};

const RangeOptions = ({
	values,
	handleDate,
	handleMonth,
	handleQuarter,
	handleYear,
}: RangeProps) => {
	const { rangeType } = values;

	return (
		<div className={styles.RangeOptions}>
			{rangeType === "Day" && (
				<div className={styles.RangeOptions}>
					<label htmlFor="rangeDate">Choose a date</label>
					<DatePicker
						id="rangeDate"
						name="rangeDate"
						value={values.rangeDate}
						onSelect={handleDate}
					/>
				</div>
			)}
			{rangeType === "Week" && (
				<div className={styles.RangeOptions}>
					<label htmlFor="rangeWeek">Choose a Week</label>
				</div>
			)}
			{rangeType === "Month" && (
				<div className={styles.RangeOptions}>
					<label htmlFor="rangeMonth">Choose a Month</label>
					<MonthPicker
						id="rangeMonth"
						name="rangeMonth"
						value={values.rangeMonth}
						onSelect={handleMonth}
					/>
				</div>
			)}
			{rangeType === "Quarter" && (
				<div className={styles.RangeOptions}>
					<label htmlFor="rangeQuarter">Choose a Quarter</label>
					<QuarterPicker
						id="rangeQuarter"
						name="rangeQuarter"
						value={values.rangeQuarter}
						onSelect={handleQuarter}
					/>
				</div>
			)}
			{rangeType === "Year" && (
				<div className={styles.RangeOptions}>
					<label htmlFor="rangeYear">Choose a Year</label>
					<YearPicker
						id="rangeYear"
						name="rangeYear"
						value={values.rangeYear}
						onSelect={handleYear}
					/>
				</div>
			)}
			{rangeType === "Custom" && (
				<div className={styles.RangeOptions}>
					<label htmlFor="rangeCustom">Choose a range</label>
				</div>
			)}
		</div>
	);
};
const RangeTypes = ({ values, handleFilter }: RangeProps) => {
	const types: RangeType[] = [
		"Day",
		"Week",
		"Month",
		"Year",
		"Quarter",
		"Custom",
	];
	const selected = values.rangeType;
	return (
		<div className={styles.RangeTypes}>
			<div className={styles.RangeTypes_label}>View data by:</div>
			<div className={styles.RangeTypes_options}>
				{types &&
					types.map((type, idx) => (
						<button
							type="button"
							key={type + idx}
							className={styles.RangeTypes_options_type}
							data-selected-filter={selected === type}
							onClick={() => handleFilter("rangeType", type)}
						>
							{type}
						</button>
					))}
			</div>
		</div>
	);
};
const QuickAccessRanges = ({
	values,
	handleFilter,
	closeModal,
}: QuickAccessProps) => {
	const types: RangePresetType[] = [
		"Today",
		"Yesterday",
		"This Week",
		"Last Week",
		"This Month",
		"Last Month",
		"This Year",
	];
	const selection = values.rangeType;

	const handleSelect = (option: RangePresetType) => {
		handleFilter("rangeType", option);
		closeModal();
	};

	return (
		<div className={styles.QuickAccessRanges}>
			<div className={styles.QuickAccessRanges_label}>Quick Access:</div>
			<div className={styles.QuickAccessRanges_options}>
				{types &&
					types.map((type, idx) => (
						<button
							type="button"
							key={type + idx}
							className={styles.QuickAccessRanges_options_type}
							data-selected-filter={selection === type}
							onClick={() => handleSelect(type)}
						>
							{type}
						</button>
					))}
			</div>
		</div>
	);
};

const HistoryFilterOptions = ({
	values,
	handleFilter,
	handleDate,
	handleMonth,
	handleQuarter,
	handleQuickFilter,
	closeModal,
}: Props) => {
	return (
		<div className={styles.HistoryFilterOptions}>
			<div className={styles.HistoryFilterOptions_quickAccess}>
				<QuickAccessRanges
					values={values}
					handleFilter={handleQuickFilter}
					closeModal={closeModal}
				/>
			</div>
			<div className={styles.splitter}>OR</div>
			<div className={styles.HistoryFilterOptions_types}>
				<RangeTypes
					values={values}
					handleFilter={handleFilter}
					handleDate={handleDate}
					handleMonth={handleMonth}
					handleYear={handleFilter}
					handleQuarter={handleQuarter}
					closeModal={closeModal}
				/>
			</div>
			<div className={styles.HistoryFilterOptions_rangeOptions}>
				<RangeOptions
					values={values}
					handleFilter={handleFilter}
					handleDate={handleDate}
					handleMonth={handleMonth}
					handleQuarter={handleQuarter}
					handleYear={handleFilter}
					closeModal={closeModal}
				/>
			</div>
		</div>
	);
};

export default HistoryFilterOptions;
