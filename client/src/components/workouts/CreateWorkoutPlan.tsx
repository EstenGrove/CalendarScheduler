import React from "react";
import styles from "../../css/workouts/CreateWorkoutPlan.module.scss";
import { Steps, Step } from "../ui/Steps";
import {
	CreatePlanValues,
	type WorkoutType,
	workoutTypes,
} from "../../utils/utils_workoutPlans";
import NumberInput from "../shared/NumberInput";
import CounterInput from "../shared/CounterInput";
import TextInput from "../shared/TextInput";

type Props = {
	values: CreatePlanValues;
	handleChange: (name: string, value: string | number) => void;
	handleCheckbox: (name: string, value: boolean) => void;
	handleSelect: (name: string, value: string) => void;
};

type WorkoutTypeProps = {
	workoutType: WorkoutType;
	isSelected: boolean;
	selectWorkoutType: () => void;
};
const WorkoutType = ({
	workoutType,
	selectWorkoutType,
	isSelected,
}: WorkoutTypeProps) => {
	const { workoutType: name } = workoutType;
	const css = {
		backgroundColor: isSelected ? "var(--accent)" : "",
		color: "#fff",
	};
	return (
		<div className={styles.WorkoutType} onClick={selectWorkoutType} style={css}>
			<h3>{name}</h3>
		</div>
	);
};

type MenuProps = {
	values: CreatePlanValues;
	selectWorkoutType: (name: string, type: WorkoutType) => void;
};

const WorkoutTypesMenu = ({ selectWorkoutType, values }: MenuProps) => {
	const { workoutType } = values;
	return (
		<div className={styles.WorkoutTypesMenu}>
			{workoutTypes &&
				workoutTypes.map((type) => (
					<WorkoutType
						key={type.workoutTypeID}
						workoutType={type}
						isSelected={workoutType === type.workoutType}
						selectWorkoutType={() => selectWorkoutType("workoutType", type)}
					/>
				))}
		</div>
	);
};

const CreateWorkoutPlan = ({
	values,
	handleChange,
	handleCheckbox,
	handleSelect,
}: Props) => {
	return (
		<div className={styles.CreateWorkoutPlan}>
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default CreateWorkoutPlan;
