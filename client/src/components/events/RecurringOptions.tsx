import styles from "../../css/events/RecurringOptions.module.scss";
import { MONTHS } from "../../utils/utils_dates";
import {
	EventFrequency,
	WeekDayToken,
	RecurringVals,
	FREQ_OPTIONS as freqOptions,
} from "../../utils/utils_options";
import { getMonthlySuffix } from "../../utils/utils_recurring";
import NumberInput from "../shared/NumberInput";
import Select from "../shared/Select";

type Props = {
	values: RecurringVals;
	handleFrequency: (name: string, value: string) => void;
	handleDays: (day: WeekDayToken) => void;
	handleChange: (name: string, value: string | number) => void;
	handleMonth: (name: string, value: number | string) => void;
	handleCheckbox: (name: string, value: boolean) => void;
};

type FreqAndIntervalProps = {
	values: RecurringVals;
	handleFrequency: (name: string, value: string) => void;
	handleChange: (name: string, value: string | number) => void;
};

type WeekDayProps = {
	values: RecurringVals;
	selectDay: (day: WeekDayToken) => void;
};

const WeekDays = ({ values, selectDay }: WeekDayProps) => {
	const { byDay } = values;

	return (
		<div className={styles.WeekDays}>
			<button
				type="button"
				onClick={() => selectDay("Su")}
				className={styles.WeekDays_day}
				data-selected={byDay.includes("Su")}
			>
				Su
			</button>
			<button
				type="button"
				onClick={() => selectDay("Mo")}
				className={styles.WeekDays_day}
				data-selected={byDay.includes("Mo")}
			>
				Mo
			</button>
			<button
				type="button"
				onClick={() => selectDay("Tu")}
				className={styles.WeekDays_day}
				data-selected={byDay.includes("Tu")}
			>
				Tu
			</button>
			<button
				type="button"
				onClick={() => selectDay("We")}
				className={styles.WeekDays_day}
				data-selected={byDay.includes("We")}
			>
				We
			</button>
			<button
				type="button"
				onClick={() => selectDay("Th")}
				className={styles.WeekDays_day}
				data-selected={byDay.includes("Th")}
			>
				Th
			</button>
			<button
				type="button"
				onClick={() => selectDay("Fr")}
				className={styles.WeekDays_day}
				data-selected={byDay.includes("Fr")}
			>
				Fr
			</button>
			<button
				type="button"
				onClick={() => selectDay("Sa")}
				className={styles.WeekDays_day}
				data-selected={byDay.includes("Sa")}
			>
				Sa
			</button>
		</div>
	);
};

const getFrequencyLabel = (frequency: EventFrequency, interval: number) => {
	const suffix = interval > 1 ? "s" : "";
	const opts = {
		Daily: "day",
		Weekly: "week",
		Monthly: "month",
		Yearly: "year",
		Custom: "",
	} as const;
	const prefix = opts[frequency as keyof object];

	return prefix + suffix;
};

const FreqAndInterval = ({
	values,
	handleChange,
	handleFrequency,
}: FreqAndIntervalProps) => {
	const { frequency, interval } = values;
	const label = getFrequencyLabel(frequency, interval);

	return (
		<div className={styles.FreqAndInterval}>
			<Select
				name="frequency"
				id="frequency"
				value={values.frequency}
				onChange={handleFrequency}
				options={freqOptions}
			/>
			<span>every</span>
			<NumberInput
				name="interval"
				id="interval"
				value={values.interval}
				onChange={handleChange}
				min={1}
				style={{ width: "5rem" }}
			/>
			<span>{label}</span>
		</div>
	);
};

type MonthProps = {
	values: RecurringVals;
	handleMonth: (name: string, value: number | string) => void;
};

const MonthlyOptions = ({ values, handleMonth }: MonthProps) => {
	const { byMonthDay } = values;
	const monthSuffix = getMonthlySuffix(byMonthDay);
	return (
		<div className={styles.MonthlyOptions}>
			{/* on day:  */}
			<span>On the </span>
			<NumberInput
				name="byMonthDay"
				id="byMonthDay"
				min={1}
				max={31}
				onChange={handleMonth}
				value={byMonthDay}
			/>
			<span>
				<b>{monthSuffix}</b> of the month
			</span>
		</div>
	);
};

const monthOpts: Array<{ value: string; label: string }> = MONTHS.map(
	(month, idx) => ({
		value: String(idx),
		label: month,
	})
);

const YearlyOptions = ({ values, handleMonth }: MonthProps) => {
	const { byMonth, byMonthDay } = values;
	const monthSuffix = getMonthlySuffix(byMonthDay);

	const handleMonthChoice = (_: string, value: string) => {
		handleMonth("byMonth", Number(value));
	};

	return (
		<div className={styles.YearlyOptions}>
			<div className={styles.YearlyOptions_months}>
				<div>Every </div>
				<Select
					name="byMonth"
					id="byMonth"
					onChange={handleMonthChoice}
					value={String(byMonth)}
					options={monthOpts}
				/>
			</div>
			<div className={styles.YearlyOptions_row}>
				{/* on day:  */}
				<span>On the </span>
				<NumberInput
					name="byMonthDay"
					id="byMonthDay"
					min={1}
					max={31}
					onChange={handleMonth}
					value={byMonthDay}
				/>
				<span>
					<b>{monthSuffix}</b> of the month
				</span>
			</div>
		</div>
	);
};

const RecurringOptions = ({
	values,
	handleDays,
	handleMonth,
	handleChange,
	handleFrequency,
}: Props) => {
	const { frequency, isRecurring } = values;
	return (
		<div className={styles.RecurringOptions}>
			<div className={styles.RecurringOptions_row}>
				<FreqAndInterval
					values={values}
					handleChange={handleChange}
					handleFrequency={handleFrequency}
				/>
			</div>
			{isRecurring && frequency === "Weekly" && (
				<div className={styles.RecurringOptions_row}>
					<WeekDays selectDay={handleDays} values={values} />
				</div>
			)}
			{isRecurring && frequency === "Monthly" && (
				<div className={styles.RecurringOptions_row}>
					<MonthlyOptions handleMonth={handleMonth} values={values} />
				</div>
			)}
			{isRecurring && frequency === "Yearly" && (
				<div className={styles.RecurringOptions_row}>
					<YearlyOptions handleMonth={handleMonth} values={values} />
				</div>
			)}
		</div>
	);
};

export default RecurringOptions;
