import styles from "../../css/history/HistoryFilterOptions.module.scss";
import { FilterSettings, RangeType } from "../../utils/utils_filters";
import DateInput from "../shared/DateInput";

type Props = {
	values: FilterSettings;
	handleFilter: (name: string, value: string | number) => void;
};
type RangeProps = {
	values: FilterSettings;
	handleFilter: (name: string, value: string | number) => void;
};

const RangeOptions = ({ values, handleFilter }: RangeProps) => {
	return (
		<div className={styles.RangeOptions}>
			<div className={styles.RangeOptions_group}>
				<label htmlFor="startDate">From:</label>
				<DateInput
					name="startDate"
					id="startDate"
					value={values.startDate}
					onChange={handleFilter}
				/>
			</div>
			<div className={styles.RangeOptions_group}>
				<label htmlFor="endDate">To:</label>
				<DateInput
					name="startDate"
					id="startDate"
					value={values.startDate}
					onChange={handleFilter}
				/>
			</div>
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
						>
							{type}
						</button>
					))}
			</div>
		</div>
	);
};

const HistoryFilterOptions = ({ values, handleFilter }: Props) => {
	return (
		<div className={styles.HistoryFilterOptions}>
			<div className={styles.HistoryFilterOptions_types}>
				<RangeTypes values={values} handleFilter={handleFilter} />
			</div>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default HistoryFilterOptions;
