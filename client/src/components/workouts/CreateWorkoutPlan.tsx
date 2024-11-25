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
	const handleWorkoutType = (name: string, type: WorkoutType) => {
		return handleSelect && handleSelect(name, type.workoutType);
	};

	return (
		<div className={styles.CreateWorkoutPlan}>
			<div className={styles.CreateWorkoutPlan_row}>
				<h2>Select a workout</h2>
				<WorkoutTypesMenu
					values={values}
					selectWorkoutType={handleWorkoutType}
				/>
			</div>
			<div className={styles.CreateWorkoutPlan_row}>
				<h2>Add a name for the workout plan</h2>
				<TextInput
					name="workoutPlanName"
					id="workoutPlanName"
					value={values.workoutPlanName}
					onChange={handleChange}
				/>
			</div>
			<div className={styles.CreateWorkoutPlan_row}>
				<h2>Select a weight (lbs.)</h2>
				<CounterInput
					name="workoutPlanWeight"
					id="workoutPlanWeight"
					step={5}
					min={0}
					max={100}
					value={values.workoutPlanWeight}
					onChange={handleChange}
				/>
			</div>
			<div className={styles.CreateWorkoutPlan_row}>
				<h2>Number of reps per set</h2>
				<CounterInput
					name="workoutPlanReps"
					id="workoutPlanReps"
					value={values.workoutPlanReps}
					onChange={handleChange}
				/>
			</div>
			<div className={styles.CreateWorkoutPlan_row}>
				<h2>Number of sets</h2>
				<CounterInput
					name="workoutPlanSets"
					id="workoutPlanSets"
					value={values.workoutPlanSets}
					onChange={handleChange}
				/>
			</div>
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default CreateWorkoutPlan;
