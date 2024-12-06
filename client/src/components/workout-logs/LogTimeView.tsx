import styles from "../../css/workout-logs/LogTimeView.module.scss";
import { ReactNode, useMemo } from "react";
import { CreateLogValues } from "./types";
import { formatTime, parseTime } from "../../utils/utils_dates";
import { addMinutes, isValid } from "date-fns";
import { LogStep } from "../../utils/utils_workoutLogs";
import { LogWorkoutFooter, LogWorkoutStep } from "../history/LogWorkoutStep";
import TimerInput from "../shared/TimerInput";
import DateInput from "../shared/DateInput";
import TimePicker from "../shared/TimePicker";

type Props = {
	values: CreateLogValues;
	handleChange: (name: string, value: string | number) => void;
	children?: ReactNode;
	currentStep: LogStep;
};

const calculateEndTime = (values: CreateLogValues) => {
	const { date, startTime, mins } = values;
	if (!date || !startTime) return "";
	const timeDate = parseTime(startTime, "long");
	const approxEnd = addMinutes(timeDate, mins);

	return approxEnd;
};

const LogTimeView = ({
	values,
	handleChange,
	currentStep,
	children,
}: Props) => {
	const approxEnd = useMemo(() => {
		if (!values.startTime || !values.date) return null;
		return calculateEndTime(values);
	}, [values]);

	return (
		<LogWorkoutStep
			title="How long was your workout?"
			isActiveStep={currentStep === "Time"}
		>
			<div className={styles.LogTimeView}>
				<div className={styles.LogTimeView_row}>
					<TimerInput name="mins" value={values.mins} onChange={handleChange} />
				</div>
				<div className={styles.LogTimeView_row}>
					<label htmlFor="date">When was this workout?</label>
					<DateInput name="date" value={values.date} onChange={handleChange} />
				</div>
				<label htmlFor="startTime">When did you start this workout?</label>
				<div className={styles.LogTimeView_row}>
					<TimePicker
						name="startTime"
						onChange={handleChange}
						initialTime={formatTime(new Date(), "long")}
					/>
				</div>
				{!!approxEnd && (
					<div className={styles.LogTimeView_desc}>
						Ending at {isValid(approxEnd) && formatTime(approxEnd, "long")}
					</div>
				)}
			</div>
			<LogWorkoutFooter>{children}</LogWorkoutFooter>
		</LogWorkoutStep>
	);
};

export default LogTimeView;
