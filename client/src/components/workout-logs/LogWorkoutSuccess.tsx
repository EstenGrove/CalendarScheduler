import { ReactNode } from "react";
import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/workout-logs/LogWorkoutSuccess.module.scss";
import { LogWorkoutFooter, LogWorkoutStep } from "../history/LogWorkoutStep";
import { LogStep } from "../../utils/utils_workoutLogs";
import { CreateLogValues } from "./types";
import { formatDate } from "../../utils/utils_dates";
import { parse } from "date-fns";

type Props = {
	currentStep: LogStep;
	children?: ReactNode;
	values: CreateLogValues;
};

const getLoggedDate = (date: string) => {
	const parsed = parse(date, "yyyy-MM-dd", new Date());
	const formatted = formatDate(parsed, "long");

	return formatted;
};

const LogWorkoutSuccess = ({ values, currentStep, children }: Props) => {
	const { date } = values;
	const formatted = getLoggedDate(date);
	return (
		<LogWorkoutStep
			title="Log was saved!"
			isActiveStep={currentStep === "SUCCESS"}
		>
			<div className={styles.LogWorkoutSuccess}>
				<svg className={styles.LogWorkoutSuccess_icon}>
					<use xlinkHref={`${sprite}#icon-check_circle_outline`} />
				</svg>
				<div className={styles.LogWorkoutSuccess_msg}>
					Your log for <b>{formatted}</b> was saved successfully!
				</div>
			</div>
			<LogWorkoutFooter>{children}</LogWorkoutFooter>
		</LogWorkoutStep>
	);
};

export default LogWorkoutSuccess;
