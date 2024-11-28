import { CSSProperties, ReactNode, useState } from "react";
import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/workouts/CreateWorkoutSteps.module.scss";
import { workoutTypes } from "../../utils/utils_workoutPlans";
import MultiStepForm from "../ui/MultiStepForm";
import MultiStepFormStep from "../ui/MultiStepFormStep";
import CounterInput from "../shared/CounterInput";
import {
	CreateScheduleValues,
	CreateWorkoutStep,
	CreateWorkoutValues,
	NewWorkoutValues,
} from "./types";
import TimerInput from "../shared/TimerInput";
import DateInput from "../shared/DateInput";
import RecurringOptions from "../events/RecurringOptions";
import { CreateEventVals, WeekDayToken } from "../../utils/utils_options";
import Checkbox from "../shared/Checkbox";

type FooterProps = {
	children?: ReactNode;
};
type StepProps = {
	workoutValues: NewWorkoutValues;
	handleDays: (day: WeekDayToken) => void;
	handleCheckbox: (name: string, value: boolean) => void;
	handleSelect: (name: string, value: string | number) => void;
	handleChange: (name: string, value: string | number) => void;
};

type StepFlowProps = {
	workoutValues: NewWorkoutValues;
	handleDays: (day: WeekDayToken) => void;
	handleCheckbox: (name: string, value: boolean) => void;
	handleSelect: (name: string, value: string | number) => void;
	handleChange: (name: string, value: string | number) => void;
	changePlanType: (type: "New" | "Existing" | null) => void;
	changeStep: (step: CreateWorkoutStep) => void;
};

type NavButtonProps = {
	onClick: () => void;
	isDisabled?: boolean;
	children?: ReactNode;
};

type TypeProps = {
	workoutType: string;
	selectType: () => void;
	isSelected: boolean;
};

type StepperDeps = {
	values: CreateWorkoutValues;
	changeStep: (step: CreateWorkoutStep) => void;
	changePlanType: (type: "New" | "Existing" | null) => void;
	saveNewWorkout?: () => void;
	saveWorkout?: () => void;
};

const getStepFooter = (step: CreateWorkoutStep, stepperDeps: StepperDeps) => {
	const { changeStep, changePlanType } = stepperDeps;
	switch (step) {
		case "Type": {
			return (
				<StepFooter>
					<NavButton onClick={() => changePlanType(null)}>
						<svg className={styles.BackButton_icon}>
							<use xlinkHref={`${sprite}#icon-arrow_back`}></use>
						</svg>
						<span>Back</span>
					</NavButton>
					<NavButton onClick={() => changeStep("Reps")}>
						<span>Next</span>
						<svg className={styles.NextButton_icon}>
							<use xlinkHref={`${sprite}#icon-arrow_forward`}></use>
						</svg>
					</NavButton>
				</StepFooter>
			);
		}
		case "Reps": {
			return (
				<StepFooter>
					<NavButton onClick={() => changeStep("Type")}>
						<svg className={styles.BackButton_icon}>
							<use xlinkHref={`${sprite}#icon-arrow_back`}></use>
						</svg>
						<span>Back</span>
					</NavButton>
					<NavButton onClick={() => changeStep("Time")}>
						<span>Next</span>
						<svg className={styles.NextButton_icon}>
							<use xlinkHref={`${sprite}#icon-arrow_forward`}></use>
						</svg>
					</NavButton>
				</StepFooter>
			);
		}
		case "Time": {
			return (
				<StepFooter>
					<NavButton onClick={() => changeStep("Reps")}>
						<svg className={styles.BackButton_icon}>
							<use xlinkHref={`${sprite}#icon-arrow_back`}></use>
						</svg>
						<span>Back</span>
					</NavButton>
					<NavButton onClick={() => changeStep("Schedule")}>
						<span>Next</span>
						<svg className={styles.NextButton_icon}>
							<use xlinkHref={`${sprite}#icon-arrow_forward`}></use>
						</svg>
					</NavButton>
				</StepFooter>
			);
		}
		case "Schedule": {
			return (
				<StepFooter>
					<NavButton onClick={() => changeStep("Reps")}>
						<svg className={styles.BackButton_icon}>
							<use xlinkHref={`${sprite}#icon-arrow_back`}></use>
						</svg>
						<span>Back</span>
					</NavButton>
					<NavButton onClick={() => changeStep("Summary")}>
						<span>Next</span>
						<svg className={styles.NextButton_icon}>
							<use xlinkHref={`${sprite}#icon-arrow_forward`}></use>
						</svg>
					</NavButton>
				</StepFooter>
			);
		}

		default:
			return null;
	}
};

const NavButton = ({
	onClick,
	isDisabled = false,
	children,
}: NavButtonProps) => {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={isDisabled}
			className={styles.NavButton}
		>
			{children}
		</button>
	);
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
const StepFooter = ({ children }: FooterProps) => {
	return <div className={styles.StepFooter}>{children}</div>;
};
// STEPS //
const WorkoutTypesStep = ({ workoutValues, handleSelect }: StepProps) => {
	const { workoutType } = workoutValues;
	return (
		<div className={styles.WorkoutTypes}>
			{workoutTypes &&
				workoutTypes.map((type, idx) => (
					<WorkoutType
						key={type.workoutTypeID + idx}
						workoutType={type.workoutType}
						isSelected={workoutType === type.workoutType}
						selectType={() => handleSelect("workoutType", type.workoutType)}
					/>
				))}
		</div>
	);
};
const WorkoutWeightsStep = ({
	scheduleValues,
	workoutValues,
	handleChange,
}: StepProps) => {
	return (
		<div className={styles.WorkoutWeights}>
			<div className={styles.WorkoutWeights_row}>
				<div className={styles.WorkoutWeights_row_label}>How many reps?</div>
				<CounterInput
					id="reps"
					name="reps"
					value={workoutValues.reps}
					onChange={handleChange}
				/>
			</div>
			<div className={styles.WorkoutWeights_row}>
				<div className={styles.WorkoutWeights_row_label}>How many sets?</div>
				<CounterInput
					id="sets"
					name="sets"
					value={workoutValues.sets}
					onChange={handleChange}
				/>
			</div>
			<div className={styles.WorkoutWeights_row}>
				<div className={styles.WorkoutWeights_row_label}>
					How much weight per rep?
				</div>
				<CounterInput
					id="weight"
					name="weight"
					value={workoutValues.weight}
					onChange={handleChange}
				/>
			</div>
		</div>
	);
};
const TimeStep = ({ workoutValues, handleChange }: StepProps) => {
	return (
		<div className={styles.TimeStep}>
			<TimerInput
				name="mins"
				value={workoutValues.mins}
				onChange={handleChange}
			/>
		</div>
	);
};
const ScheduleWorkoutStep = ({
	workoutValues,
	handleChange,
	handleSelect,
	handleDays,
	handleCheckbox,
}: StepProps) => {
	const { isRecurring } = workoutValues;

	return (
		<div className={styles.ScheduleWorkoutStep}>
			<div className={styles.ScheduleWorkoutStep_date}>
				<DateInput
					name="startDate"
					value={workoutValues.startDate}
					onChange={handleChange}
					style={{ minWidth: "25rem" } as CSSProperties}
				/>
			</div>
			<div className={styles.ScheduleWorkoutStep_row}>
				<Checkbox
					name="isRecurring"
					id="isRecurring"
					label="Make this workout recurring"
					value={isRecurring}
					onChange={handleCheckbox}
				/>
			</div>
			{isRecurring && (
				<div className={styles.ScheduleWorkoutStep_recurrence}>
					<div className={styles.ScheduleWorkoutStep_recurrence_title}>
						Recurring Settings
					</div>
					<RecurringOptions
						values={workoutValues}
						handleChange={handleChange}
						handleCheckbox={handleCheckbox}
						handleDays={handleDays}
						handleMonth={handleSelect}
						handleFrequency={handleSelect}
					/>
				</div>
			)}
		</div>
	);
};

////////////////////////////////////////////////////////////////////
////////////////////////////// NEW PLAN ////////////////////////////
////////////////////////////////////////////////////////////////////

// Form that follows new plan flow
const WithNewPlan = ({
	workoutValues,
	handleSelect,
	handleChange,
	handleDays,
	handleCheckbox,
	saveNewPlan,
	changePlanType,
}: StepFlowProps) => {
	const [currentStep, setCurrentStep] = useState<CreateWorkoutStep>("Type");

	const changeStep = (step: CreateWorkoutStep) => {
		setCurrentStep(step);
	};

	const stepFooter: JSX.Element | null = getStepFooter(currentStep, {
		values: workoutValues,
		changeStep: changeStep,
		changePlanType: changePlanType,
	});

	return (
		<>
			<MultiStepForm>
				{/* WORKOUT TYPES */}
				<MultiStepFormStep
					title="What kind of workout is it?"
					isActiveStep={currentStep === "Type"}
					footer={stepFooter}
				>
					<WorkoutTypesStep
						key="Workout Types"
						workoutValues={workoutValues}
						handleDays={handleDays}
						handleChange={handleChange}
						handleSelect={handleSelect}
						handleCheckbox={handleCheckbox}
					/>
				</MultiStepFormStep>
				{/* WEIGHT, REPS & SETS */}
				<MultiStepFormStep
					title="How many reps, sets for this workout?"
					isActiveStep={currentStep === "Reps"}
					footer={stepFooter}
				>
					<WorkoutWeightsStep
						key="Reps, Sets & Weight"
						workoutValues={workoutValues}
						handleDays={handleDays}
						handleChange={handleChange}
						handleSelect={handleSelect}
						handleCheckbox={handleCheckbox}
					/>
				</MultiStepFormStep>

				{/* TIME OF EXERCISE */}
				<MultiStepFormStep
					title="How long is this workout?"
					isActiveStep={currentStep === "Time"}
					footer={stepFooter}
				>
					<TimeStep
						key="Time of Exercise"
						workoutValues={workoutValues}
						handleDays={handleDays}
						handleChange={handleChange}
						handleSelect={handleSelect}
						handleCheckbox={handleCheckbox}
					/>
				</MultiStepFormStep>

				{/* RECURRING/SCHEDULE OF WORKOUT */}
				<MultiStepFormStep
					title="When should this workout be done?"
					isActiveStep={currentStep === "Schedule"}
					footer={stepFooter}
				>
					<ScheduleWorkoutStep
						key="Workout Schedule"
						workoutValues={workoutValues}
						handleDays={handleDays}
						handleChange={handleChange}
						handleSelect={handleSelect}
						handleCheckbox={handleCheckbox}
					/>
				</MultiStepFormStep>

				{/* WORKOUT SUMMARY */}
				<MultiStepFormStep
					title="Workout Summary"
					isActiveStep={currentStep === "Summary"}
					footer={stepFooter}
				>
					{/*  */}
					{/*  */}
				</MultiStepFormStep>
			</MultiStepForm>
		</>
	);
};

export {
	// flows
	WithNewPlan,
	// steps
	WorkoutTypesStep,
	WorkoutWeightsStep,
};
