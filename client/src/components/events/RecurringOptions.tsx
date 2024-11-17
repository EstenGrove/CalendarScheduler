import styles from "../../css/events/RecurringOptions.module.scss";
import {
	CreateEventVals,
	EventFrequency,
	FREQ_OPTIONS as freqOptions,
	WeekDayToken,
} from "../../utils/utils_options";
import DateInput from "../shared/DateInput";
import NumberInput from "../shared/NumberInput";
import Select from "../shared/Select";

type Props = {
	values: CreateEventVals;
	handleFrequency: (name: string, value: string) => void;
	handleDays: (day: WeekDayToken) => void;
	handleChange: (name: string, value: string | number) => void;
	handleCheckbox: (name: string, value: boolean) => void;
};

type FreqAndIntervalProps = {
	values: CreateEventVals;
	handleFrequency: (name: string, value: string) => void;
	handleChange: (name: string, value: string | number) => void;
};

type WeekDayProps = {
	values: CreateEventVals;
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
			/>
			<span>{label}</span>
		</div>
	);
};

const WeeklyOptions = () => {
	return;
};

type MonthProps = {
	byMonth: number;
	byMonthDay: number;
	handleMonth: (name: string, value: string | number) => void;
};

const MonthlyOptions = ({ byMonth, byMonthDay, handleMonth }: MonthProps) => {
	return (
		<div className={styles.MonthlyOptions}>
			{/* on day:  */}
			<NumberInput
				name="byMonthDay"
				id="byMonthDay"
				min={1}
				max={31}
				onChange={handleMonth}
				value={byMonthDay}
			/>
		</div>
	);
};

const RecurringOptions = ({
	values,
	handleDays,
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

			{/*  */}
			{/*  */}
		</div>
	);
};

export default RecurringOptions;
