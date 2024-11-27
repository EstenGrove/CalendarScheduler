import { ReactNode } from "react";
import styles from "../../css/workout-logs/LogTimeView.module.scss";
import { LogWorkoutFooter, LogWorkoutStep } from "../history/LogWorkoutStep";
import { CreateLogValues } from "./types";
import { LogStep } from "../../utils/utils_workoutLogs";
import TimerInput from "../shared/TimerInput";
import DateInput from "../shared/DateInput";

type Props = {
	values: CreateLogValues;
	handleChange: (name: string, value: string | number) => void;
	children?: ReactNode;
	currentStep: LogStep;
};

const LogTimeView = ({
	handleChange,
	values,
	currentStep,
	children,
}: Props) => {
	return (
		<LogWorkoutStep
			title="How long was your workout?"
			isActiveStep={currentStep === "Time"}
		>
			<div className={styles.LogTimeView}>
				<TimerInput name="mins" value={values.mins} onChange={handleChange} />
				<div className={styles.LogTimeView_row}>
					<label htmlFor="date">When was this workout?</label>
					<DateInput name="date" value={values.date} onChange={handleChange} />
				</div>
			</div>
			<LogWorkoutFooter>{children}</LogWorkoutFooter>
		</LogWorkoutStep>
	);
};

export default LogTimeView;
