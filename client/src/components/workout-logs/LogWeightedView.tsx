import { ReactNode } from "react";
import styles from "../../css/workout-logs/LogWeightedView.module.scss";
import { CreateLogValues, WorkoutTypeOpts } from "./types";
import { isWeightedType, LogStep } from "../../utils/utils_workoutLogs";
// components
import { LogWorkoutFooter, LogWorkoutStep } from "../history/LogWorkoutStep";
import LogWeightedEntry from "./LogWeightedEntry";

type Props = {
	values: CreateLogValues;
	currentStep: LogStep | null;
	handleChange: (name: string, value: string | number) => void;
	children?: ReactNode;
};

const getTitle = (type: WorkoutTypeOpts) => {
	let title = "How many ";
	const endsInS = type.endsWith("s");
	const endsInSS = type.endsWith("ss");

	if (endsInS && !endsInSS) {
		title += type + "";
	} else if (endsInSS) {
		title += type + "es";
	} else {
		title += type + "s";
	}

	title += " did you do?";

	return title;
};

const LogWeightedView = ({
	handleChange,
	values,
	currentStep,
	children,
}: Props) => {
	const workoutType = values.workoutType as WorkoutTypeOpts;
	const isWeighted: boolean = isWeightedType(workoutType);
	const title: string = getTitle(workoutType);

	if (!isWeighted) {
		return null;
	}
	return (
		<div className={styles.LogWeightedView}>
			<LogWorkoutStep title={title} isActiveStep={currentStep === "Reps"}>
				<LogWeightedEntry values={values} handleChange={handleChange} />
				<LogWorkoutFooter>{children}</LogWorkoutFooter>
			</LogWorkoutStep>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default LogWeightedView;
