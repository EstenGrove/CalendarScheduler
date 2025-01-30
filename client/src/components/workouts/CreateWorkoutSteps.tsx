import { ComponentPropsWithoutRef, ReactNode, useState } from "react";
import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/workouts/CreateWorkoutSteps.module.scss";
import { workoutTypes } from "../../utils/utils_workoutPlans";
import {
	CreateWorkoutStep,
	CreateWorkoutValues,
	NewWorkoutValues,
} from "./types";
import { WeekDayToken } from "../../utils/utils_options";
import { convertToHrsAndMins, formatDate } from "../../utils/utils_dates";
import {
	isDistanceType,
	isWalkingType,
	isWeightedType,
} from "../../utils/utils_workoutLogs";
import { getRecurringDesc } from "../../utils/utils_recurring";
import { parse } from "date-fns";
// components
import TextArea from "../shared/TextArea";
import Checkbox from "../shared/Checkbox";
import TextInput from "../shared/TextInput";
import DateInput from "../shared/DateInput";
import TimerInput from "../shared/TimerInput";
import MultiStepForm from "../ui/MultiStepForm";
import CounterInput from "../shared/CounterInput";
import MultiStepFormStep from "../ui/MultiStepFormStep";
import RecurringOptions from "../events/RecurringOptions";
import TimePicker from "../shared/TimePicker";

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

type NavProps = {
	onClick: () => void;
	isDisabled?: boolean;
	children?: ReactNode;
};
// @ts-expect-error: this is fine
interface NavButtonProps extends NavProps, ComponentPropsWithoutRef<"button"> {}

type TypeProps = {
	workoutType: string;
	selectType: () => void;
	isSelected: boolean;
};
const getLoggedDate = (date: string) => {
	const parsed = parse(date, "yyyy-MM-dd", new Date());
	const formatted = formatDate(parsed, "long");

	return formatted;
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

	const saveHandler = () => {
		if (planType === "New") {
			return saveNewWorkout && saveNewWorkout();
		}
		if (planType === "Existing") {
			return saveWorkout && saveWorkout();
		}

		return;
	};

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
						style={{ backgroundColor: "var(--accent-purple)" }}
						onClick={saveHandler}
					>
						<svg className={styles.NextButton_icon}>
							<use xlinkHref={`${sprite}#icon-done_all`}></use>
						</svg>
						<span>Save</span>
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
	...rest
}: NavButtonProps) => {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={isDisabled}
			className={styles.NavButton}
			{...rest}
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
// Step child components

type SummaryProps = {
	values: NewWorkoutValues;
};

const WeightSummary = ({ values }: SummaryProps) => {
	const { weight, reps, sets } = values;
	return (
		<div className={styles.Summary}>
			<h4 className={styles.Summary_item}>
				<svg className={styles.Summary_item_icon}>
					<use xlinkHref={`${sprite}#icon-fitness_center`}></use>
				</svg>
				<span>Reps, Sets & Weight</span>
			</h4>
			<div className={styles.Summary_value}>
				<b>{sets}</b> <span>x</span> <b>{reps}</b> <span>at</span>{" "}
				<b>{weight} lbs.</b>
			</div>
		</div>
	);
};
const WalkSummary = ({ values }: SummaryProps) => {
	const { steps, miles } = values;
	return (
		<div className={styles.Summary}>
			<h4 className={styles.Summary_item}>
				<svg className={styles.Summary_item_icon}>
					<use xlinkHref={`${sprite}#icon-directions_walk`}></use>
				</svg>
				<span>Steps & Miles</span>
			</h4>
			<div className={styles.Summary_value}>
				<b>{steps}</b> <span>(steps) for</span> <b>{miles}</b>{" "}
				<span>miles</span>
			</div>
		</div>
	);
};
const DistanceSummary = ({ values }: SummaryProps) => {
	const { miles } = values;
	return (
		<div className={styles.Summary}>
			<h4 className={styles.Summary_item}>
				<svg className={styles.Summary_item_icon}>
					<use xlinkHref={`${sprite}#icon-directions_run`}></use>
				</svg>
				<span>Distance in Miles</span>
			</h4>
			<div className={styles.Summary_value}>
				<b>{miles}</b> <span>miles</span>
			</div>
		</div>
	);
};

const TimeSummary = ({ values }: SummaryProps) => {
	const { mins } = values;
	const hrsAndMins = convertToHrsAndMins(mins);
	return (
		<div className={styles.Summary}>
			<h4 className={styles.Summary_item}>
				<svg className={styles.Summary_item_icon}>
					<use xlinkHref={`${sprite}#icon-timelapse`}></use>
				</svg>
				<span>Workout Length (in mins.)</span>
			</h4>
			<div className={styles.Summary_value}>
				<b>{mins}</b> <span>mins</span>{" "}
				<span>
					({hrsAndMins.hours} hrs. {hrsAndMins.mins} mins.)
				</span>
			</div>
		</div>
	);
};

// STEPS //
const WorkoutTypesStep = ({ workoutValues, handleSelect }: StepProps) => {
	const { workoutType } = workoutValues;
	return (
		<div className={styles.WorkoutTypes}>
			{workoutTypes &&
				workoutTypes.map((type, idx) => (
					<WorkoutType
						key={type.workoutTypeID + "_" + idx}
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
const WorkoutWeightsStep = ({ workoutValues, handleChange }: StepProps) => {
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
						<label htmlFor="noEndDate">When should this schedule end?</label>
					</div>
					<div className={styles.ScheduleWorkoutStep_row}>
						<Checkbox
							name="noEndDate"
							id="noEndDate"
							value={workoutValues.noEndDate}
							onChange={handleCheckbox}
							label="No end date"
						/>
					</div>
					{!workoutValues.noEndDate && (
						<div className={styles.ScheduleWorkoutStep_row}>
							<label htmlFor="endDate">End date</label>
							<DateInput
								name="endDate"
								value={workoutValues.endDate}
								onChange={handleChange}
								style={{ width: "25rem", maxWidth: "100%" }}
							/>
						</div>
					)}

					<div className={styles.ScheduleWorkoutStep_row}>
						<label htmlFor="startTime">Start Time - End Time</label>
						<div className={styles.ScheduleWorkoutStep_time}>
							<TimePicker
								name="startTime"
								value={workoutValues.startTime as string}
								onChange={handleChange}
								style={{ minWidth: "12rem", maxWidth: "100%" }}
							/>
							<TimePicker
								name="endTime"
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
const SummaryStep = ({ workoutValues }: StepProps) => {
	const { isRecurring, workoutType } = workoutValues;
	const desc = getRecurringDesc(workoutValues);
	return (
		<div className={styles.SummaryStep}>
			<div className={styles.SummaryStep_row}>
				<h3>Workout Type</h3>
				<div className={styles.SummaryStep_row_value}>{workoutType}</div>
			</div>
			<div className={styles.SummaryStep_main}>
				{/* MAIN WORKOUT DATA */}
				{isWalkingType(workoutType) && <WalkSummary values={workoutValues} />}
				{isWeightedType(workoutType) && (
					<WeightSummary values={workoutValues} />
				)}
				{isDistanceType(workoutType) && (
					<DistanceSummary values={workoutValues} />
				)}
				{/* WORKOUT TIME/LENGTH */}
				<TimeSummary values={workoutValues} />
				{/* RECURRING DESC */}
				<div className={styles.SummaryStep_main}>
					<h4 className={styles.Summary_item}>
						<svg className={styles.Summary_item_icon}>
							<use xlinkHref={`${sprite}#icon-loop`}></use>
						</svg>
						<span>Recurring Schedule</span>
					</h4>
					<div className={styles.SummaryStep_desc}>
						{!isRecurring && "Does not repeat."}
						{isRecurring && desc}
					</div>
				</div>
			</div>
		</div>
	);
};
const SuccessStep = ({ workoutValues }: StepProps) => {
	const { date } = workoutValues;
	const formatted = getLoggedDate(date);

	return (
		<div className={styles.SuccessStep}>
			<svg className={styles.SuccessStep_icon}>
				<use xlinkHref={`${sprite}#icon-check_circle_outline`} />
			</svg>
			<div className={styles.SuccessStep_msg}>
				Your log for <b>{formatted}</b> was saved successfully!
			</div>
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
					<SummaryStep
						key="Workout Summary"
						workoutValues={workoutValues}
						handleDays={handleDays}
						handleChange={handleChange}
						handleSelect={handleSelect}
						handleCheckbox={handleCheckbox}
					/>
				</MultiStepFormStep>

				<MultiStepFormStep
					title="Log was Saved"
					isActiveStep={currentStep === "SUCCESS"}
					footer={stepFooter}
				>
					<SuccessStep
						key="Success"
						workoutValues={workoutValues}
						handleDays={handleDays}
						handleChange={handleChange}
						handleSelect={handleSelect}
						handleCheckbox={handleCheckbox}
					/>
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
