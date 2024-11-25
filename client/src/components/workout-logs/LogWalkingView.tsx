import { ReactNode } from "react";
import styles from "../../css/workout-logs/LogWalkingView.module.scss";
import { LogWorkoutFooter, LogWorkoutStep } from "../history/LogWorkoutStep";
import NumberInput from "../shared/NumberInput";
import { CreateLogValues, WorkoutTypeOpts } from "./types";
import { LogStep } from "../../utils/utils_workoutLogs";

type Props = {
	values: CreateLogValues;
	handleChange: (name: string, value: string | number) => void;
	children?: ReactNode;
	currentStep: LogStep;
};

const getTitle = (type: WorkoutTypeOpts) => {
	let title = "How far did you ";

	if (type.includes("Walk")) {
		title += "walk?";
	}
	if (type.includes("Run")) {
		title += "run?";
	}

	return title;
};

const LogWalkingView = ({
	values,
	handleChange,
	children,
	currentStep,
}: Props) => {
	const { workoutType } = values;
	const title = getTitle(workoutType as WorkoutTypeOpts);
	return (
		<LogWorkoutStep title={title} isActiveStep={currentStep === "Steps"}>
			<div className={styles.LogWalkingView}>
				<div className={styles.LogWalkingView_row}>
					<div className={styles.LogWalkingView_row_label}>How many steps?</div>
					<NumberInput
						id="steps"
						name="steps"
						value={values.steps}
						onChange={handleChange}
						style={{ width: "10rem", display: "block", margin: "0 auto" }}
					/>
				</div>
				<div className={styles.LogWalkingView_row}>
					<div className={styles.LogWalkingView_row_label}>How many miles?</div>
					<NumberInput
						id="miles"
						name="miles"
						value={values.miles}
						onChange={handleChange}
						style={{ width: "10rem" }}
						inputMode="decimal"
					/>
				</div>
			</div>
			<LogWorkoutFooter>{children}</LogWorkoutFooter>
		</LogWorkoutStep>
	);
};

export default LogWalkingView;
