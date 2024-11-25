import { ReactNode } from "react";
import styles from "../../css/workout-logs/LogTypeView.module.scss";
import { workoutTypes } from "../../utils/utils_workoutPlans";
import { LogWorkoutFooter, LogWorkoutStep } from "../history/LogWorkoutStep";
import { LogStep } from "../../utils/utils_workoutLogs";
import { CreateLogValues } from "./types";

const allTypes: string[] = workoutTypes.map(({ workoutType }) => workoutType);

type Props = {
	currentStep: LogStep | null;
	values: CreateLogValues;
	handleSelect: (name: string, value: string) => void;
	children?: ReactNode;
};

type TypeProps = {
	workoutType: string;
	selectType: () => void;
	isSelected: boolean;
};
const WorkoutType = ({ workoutType, selectType, isSelected }: TypeProps) => {
	const css = {
		backgroundColor: isSelected ? "var(--accent-purple)" : "",
		borderColor: isSelected ? "var(--accent-purple)" : "",
	};
	return (
		<div onClick={selectType} className={styles.WorkoutType} style={css}>
			<div className={styles.WorkoutType_label}>{workoutType}</div>
		</div>
	);
};

const LogTypeView = ({
	currentStep,
	values,
	handleSelect,
	children,
}: Props) => {
	const { workoutType: selectedType } = values;

	return (
		<LogWorkoutStep
			title="What kind of workout was it?"
			isActiveStep={currentStep === "Type"}
		>
			<div className={styles.LogTypeView}>
				<div className={styles.LogTypeView_types}>
					{allTypes &&
						allTypes.map((type, idx) => (
							<WorkoutType
								key={type + idx}
								workoutType={type}
								selectType={() => handleSelect("workoutType", type)}
								isSelected={selectedType === type}
							/>
						))}
				</div>
			</div>
			<LogWorkoutFooter>{children}</LogWorkoutFooter>
		</LogWorkoutStep>
	);
};

export default LogTypeView;
