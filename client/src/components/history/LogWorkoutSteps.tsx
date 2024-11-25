import styles from "../../css/history/LogWorkoutSteps.module.scss";
import {
	groupTypesByUnit,
	workoutTypes,
	type WorkoutType,
} from "../../utils/utils_workoutPlans";
import { TRecord } from "../../utils/utils_misc";
import CounterInput from "../shared/CounterInput";
import NumberInput from "../shared/NumberInput";

const allTypes: string[] = workoutTypes.map(({ workoutType }) => workoutType);
const groupedTypes: TRecord<WorkoutType> = groupTypesByUnit(workoutTypes);

console.log("groupedTypes", groupedTypes);

interface CreateLogValues {
	workoutType: string;
	workoutLength: number; // mins
	workoutReps: number;
	workoutSets: number;
	workoutWeight: number;
	startTime: string;
	endTime: string;
}

type TypeProps = {
	workoutType: string;
	selectType: () => void;
	isSelected: boolean;
};
const WorkoutType = ({ workoutType, selectType, isSelected }: TypeProps) => {
	const css = {
		backgroundColor: isSelected ? "var(--accent-purple)" : "",
	};
	return (
		<div onClick={selectType} className={styles.WorkoutType} style={css}>
			<div className={styles.WorkoutType_label}>{workoutType}</div>
		</div>
	);
};

type StepProps = {
	values: CreateLogValues;
	goToStep: (step: string) => void;
	handleSelect?: (name: string, value: string) => void;
	handleChange?: (name: string, value: string | number) => void;
};

const StepWorkoutType = ({ handleSelect, values, goToStep }: StepProps) => {
	const selectType = (name: string, type: string) => {
		return handleSelect && handleSelect(name, type);
	};
	return (
		<div className={styles.StepWorkoutType}>
			{allTypes &&
				allTypes.map((type, idx) => (
					<WorkoutType
						key={type + idx}
						workoutType={type}
						selectType={() => selectType("workoutType", type)}
						isSelected={values.workoutType === type}
					/>
				))}
		</div>
	);
};

const StepNonEquipment = ({
	handleSelect,
	handleChange,
	values,
	goToStep,
}: StepProps) => {
	const changeHandler = (name: string, value: string | number) => {
		return handleChange && handleChange(name, value);
	};

	return (
		<div className={styles.StepNonEquipment}>
			<div className={styles.StepNonEquipment_row}>
				<div className={styles.StepNonEquipment_row_label}>How many miles?</div>
				<CounterInput
					id="workoutReps"
					name="workoutReps"
					value={values.workoutReps}
					onChange={changeHandler}
				/>
			</div>
			<div className={styles.StepNonEquipment_row}>
				<div className={styles.StepNonEquipment_row_label}>How many steps?</div>
				<NumberInput
					id="workoutReps"
					name="workoutReps"
					value={values.workoutReps}
					onChange={changeHandler}
				/>
			</div>
			{/*  */}
			{/*  */}
		</div>
	);
};
const StepWithEquipment = ({
	handleSelect,
	handleChange,
	values,
	goToStep,
}: StepProps) => {
	const changeHandler = (name: string, value: string | number) => {
		return handleChange && handleChange(name, value);
	};

	return (
		<div className={styles.StepWithEquipment}>
			<div className={styles.StepWithEquipment_row}>
				<div className={styles.StepWithEquipment_row_label}>How many reps?</div>
				<CounterInput
					id="workoutReps"
					name="workoutReps"
					value={values.workoutReps}
					onChange={changeHandler}
				/>
			</div>
			<div className={styles.StepWithEquipment_row}>
				<div className={styles.StepWithEquipment_row_label}>How many sets?</div>
				<CounterInput
					id="workoutSets"
					name="workoutSets"
					value={values.workoutSets}
					onChange={changeHandler}
				/>
			</div>
			{/*  */}
			{/*  */}
		</div>
	);
};

// exported steps
export { StepWorkoutType, StepWithEquipment };
