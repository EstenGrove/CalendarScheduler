import { ReactNode, useState } from "react";
import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/workouts/CreateWorkoutSteps.module.scss";
import { workoutTypes } from "../../utils/utils_workoutPlans";
import {
	CreateWorkoutStep,
	CreateWorkoutValues,
	NewWorkoutValues,
} from "./types";
import { WeekDayToken } from "../../utils/utils_options";
// components
import Checkbox from "../shared/Checkbox";
import DateInput from "../shared/DateInput";
import TimerInput from "../shared/TimerInput";
import MultiStepForm from "../ui/MultiStepForm";
import CounterInput from "../shared/CounterInput";
import MultiStepFormStep from "../ui/MultiStepFormStep";
import RecurringOptions from "../events/RecurringOptions";
import { getRecurringDesc } from "../../utils/utils_recurring";
import TimeInput from "../shared/TimeInput";
import TextInput from "../shared/TextInput";
import TextArea from "../shared/TextArea";

type PlanType = "New" | "Existing" | null;

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
	planType: PlanType;
	workoutValues: NewWorkoutValues;
	handleDays: (day: WeekDayToken) => void;
	handleCheckbox: (name: string, value: boolean) => void;
	handleSelect: (name: string, value: string | number) => void;
	handleChange: (name: string, value: string | number) => void;
	changePlanType: (type: "New" | "Existing" | null) => void;
	// dispatch/requests
	saveNewWorkoutPlan: () => void;
	saveNewWorkout: () => void;
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
	planType: PlanType;
	changeStep: (step: CreateWorkoutStep) => void;
	changePlanType: (type: "New" | "Existing" | null) => void;
	saveNewWorkout?: () => void;
	saveWorkout?: () => void;
};

const getStepFooter = (step: CreateWorkoutStep, stepperDeps: StepperDeps) => {
	const { planType, changeStep, changePlanType, saveWorkout, saveNewWorkout } =
		stepperDeps;
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
					<NavButton onClick={() => changeStep("About")}>
						<span>Next</span>
						<svg className={styles.NextButton_icon}>
							<use xlinkHref={`${sprite}#icon-arrow_forward`}></use>
						</svg>
					</NavButton>
				</StepFooter>
			);
		}
		case "About": {
			return (
				<StepFooter>
					<NavButton onClick={() => changeStep("Type")}>
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
		case "Summary": {
			return (
				<StepFooter>
					<NavButton onClick={() => changeStep("Schedule")}>
						<svg className={styles.BackButton_icon}>
							<use xlinkHref={`${sprite}#icon-arrow_back`}></use>
						</svg>
						<span>Back</span>
					</NavButton>
					<NavButton
						onClick={() => {
							if (planType === "New") {
								return saveNewWorkout && saveNewWorkout();
							} else if (planType === "Existing") {
								return saveWorkout && saveWorkout();
							} else {
								return;
							}
						}}
					>
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
const AboutStep = ({ workoutValues, handleChange }: StepProps) => {
	return (
		<div className={styles.AboutStep}>
			<div className={styles.AboutStep_row}>
				<label htmlFor="planName">Add a name/label</label>
				<TextInput
					name="planName"
					id="planName"
					value={workoutValues.planName}
					onChange={handleChange}
					placeholder="Weekly curls..."
				/>
			</div>
			<div className={styles.AboutStep_row}>
				<label htmlFor="planDesc">Add any notes or details</label>
				<TextArea
					name="planDesc"
					id="planDesc"
					value={workoutValues.planDesc}
					onChange={handleChange}
					placeholder="About this workout..."
				/>
			</div>
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
	const desc = getRecurringDesc(workoutValues);

	return (
		<div className={styles.ScheduleWorkoutStep}>
			<div className={styles.ScheduleWorkoutStep_date}>
				<DateInput
					name="startDate"
					value={workoutValues.startDate}
					onChange={handleChange}
					style={{ minWidth: "25rem" }}
				/>
			</div>
			<div
				className={styles.ScheduleWorkoutStep_row}
				style={{ paddingLeft: "2rem" }}
			>
				<Checkbox
					name="isRecurring"
					id="isRecurring"
					label="Make this workout recurring"
					value={isRecurring}
					onChange={handleCheckbox}
				/>
			</div>
			<div className={styles.Break}></div>
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
					<div className={styles.ScheduleWorkoutStep_row}>
						<label htmlFor="endDate">When should this schedule end?</label>
						<DateInput
							name="endDate"
							value={workoutValues.endDate}
							onChange={handleChange}
							style={{ minWidth: "25rem" }}
						/>
					</div>
					<div className={styles.ScheduleWorkoutStep_row}>
						<label htmlFor="startTime">Start Time - End Time</label>
						<div className={styles.ScheduleWorkoutStep_time}>
							<TimeInput
								name="startTime"
								id="startTime"
								value={workoutValues.startTime}
								onChange={handleChange}
								style={{ minWidth: "12rem", maxWidth: "100%" }}
							/>
							<TimeInput
								name="endTime"
								id="endTime"
								value={workoutValues.endTime}
								onChange={handleChange}
								style={{ minWidth: "12rem", maxWidth: "100%" }}
							/>
						</div>
					</div>
					<div className={styles.ScheduleWorkoutStep_row}>
						<span className={styles.ScheduleWorkoutStep_desc}>{desc}</span>
					</div>
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
	saveNewWorkoutPlan,
	saveNewWorkout,
	planType,
	changePlanType,
}: StepFlowProps) => {
	const [currentStep, setCurrentStep] = useState<CreateWorkoutStep>("Type");

	const changeStep = (step: CreateWorkoutStep) => {
		setCurrentStep(step);
	};

	const stepFooter: JSX.Element | null = getStepFooter(currentStep, {
		values: workoutValues,
		planType: planType,
		changeStep: changeStep,
		changePlanType: changePlanType,
		saveWorkout: saveNewWorkout, // w/ existing plan
		saveNewWorkout: saveNewWorkoutPlan, // w/ new plan
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

				{/* ABOUT STEP (eg. NAME, DESC, NOTES) */}
				<MultiStepFormStep
					title="What's the name of this workout?"
					isActiveStep={currentStep === "About"}
					footer={stepFooter}
				>
					<AboutStep
						key="About this Workout"
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
