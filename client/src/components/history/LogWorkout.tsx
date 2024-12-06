import { useState } from "react";
import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/history/LogWorkout.module.scss";
import { CurrentUser } from "../../features/user/types";
import { CreateLogValues } from "../workout-logs/types";
import { useAppDispatch } from "../../store/store";
import { saveLogEntry } from "../../features/workoutHistory/operations";
import { formatDate, formatTime } from "../../utils/utils_dates";
import { addMinutes } from "date-fns";
import {
	getWorkoutTypeIDFromName,
	isDistanceType,
	isOtherType,
	isWalkingType,
	isWeightedType,
	LogStep,
	prepareLogDates,
	TimeRange,
} from "../../utils/utils_workoutLogs";
// components
import LogTypeView from "../workout-logs/LogTypeView";
import LogWeightedView from "../workout-logs/LogWeightedView";
import LogWalkingView from "../workout-logs/LogWalkingView";
import LogTimeView from "../workout-logs/LogTimeView";
import LogWorkoutSummary from "../workout-logs/LogWorkoutSummary";
import LogWorkoutSuccess from "../workout-logs/LogWorkoutSuccess";

// WORKOUT LOG FLOWS
// - Type => Weights/Reps

type Props = {
	currentUser: CurrentUser;
	closeModal: () => void;
};

type BackProps = {
	goToPrev: () => void;
	isDisabled?: boolean;
};
type NextProps = {
	goToNext: () => void;
	isDisabled?: boolean;
};
type SaveProps = {
	saveLog: () => void;
	isDisabled?: boolean;
};
type CloseProps = {
	close: () => void;
	isDisabled?: boolean;
};

const get2ndStepFromType = (type: string): LogStep => {
	const isWeighted = isWeightedType(type);
	const isWalkOrRun = isWalkingType(type);
	const isDistance = isDistanceType(type);
	const isOther = isOtherType(type);

	if (isWeighted) return "Reps";
	if (isWalkOrRun) return "Steps";
	if (isDistance) return "Length";
	if (isOther) return "Time";
	// if 'Other', then just record the time
	return "Time";
};

const getPrevStep = (stepsList: LogStep[]) => {
	const prevStep = stepsList.pop();

	return prevStep as LogStep;
};

const BackButton = ({ goToPrev, isDisabled = false }: BackProps) => {
	return (
		<button
			type="button"
			onClick={goToPrev}
			disabled={isDisabled}
			className={styles.BackButton}
		>
			<svg className={styles.BackButton_icon}>
				<use xlinkHref={`${sprite}#icon-arrow_back`}></use>
			</svg>
			<span>Back</span>
		</button>
	);
};
const NextButton = ({ goToNext, isDisabled = false }: NextProps) => {
	return (
		<button
			type="button"
			onClick={goToNext}
			disabled={isDisabled}
			className={styles.NextButton}
		>
			<span>Next</span>
			<svg className={styles.NextButton_icon}>
				<use xlinkHref={`${sprite}#icon-arrow_forward`}></use>
			</svg>
		</button>
	);
};
const SaveButton = ({ saveLog, isDisabled = false }: SaveProps) => {
	return (
		<button
			type="button"
			onClick={saveLog}
			disabled={isDisabled}
			className={styles.SaveButton}
		>
			<svg className={styles.SaveButton_icon}>
				<use xlinkHref={`${sprite}#icon-fact_check`}></use>
			</svg>
			<span>Save Log</span>
		</button>
	);
};
const CreateNewButton = ({ goToPrev, isDisabled = false }: BackProps) => {
	return (
		<button
			type="button"
			onClick={goToPrev}
			disabled={isDisabled}
			className={styles.CreateNewButton}
		>
			<svg className={styles.CreateNewButton_icon}>
				<use xlinkHref={`${sprite}#icon-arrow_back`}></use>
			</svg>
			<span>Reset</span>
		</button>
	);
};
const CloseButton = ({ close, isDisabled = false }: CloseProps) => {
	return (
		<button
			type="button"
			onClick={close}
			disabled={isDisabled}
			className={styles.CloseButton}
		>
			<span>Close</span>
		</button>
	);
};

// Add any field validations/changes/adjustments here before fetch request
// - Find matching workoutTypeID
// - Adjust start/end times based off 'date' selection
const prepareWorkoutEntry = (values: CreateLogValues) => {
	const { workoutType } = values;
	// must parse the date string, to get the correct day/date of the month
	const typeID: number = getWorkoutTypeIDFromName(workoutType);
	const adjustedTimes: TimeRange = prepareLogDates(values);

	const newLog = {
		...values,
		workoutTypeID: typeID,
		startTime: adjustedTimes.startTime.toISOString(),
		endTime: adjustedTimes.endTime.toISOString(),
	};

	return newLog;
};

const getInitialStartTime = () => {
	const start = formatTime(new Date(), "long");

	return start;
};
const getInitialEndTime = (mins: number = 30) => {
	const start = new Date();
	const end = addMinutes(start, mins);
	const endTime = formatTime(end, "long");
	return endTime;
};

const initialState: CreateLogValues = {
	workoutType: "",
	mins: 30,
	reps: 20,
	sets: 1,
	weight: 15,
	steps: 0,
	miles: 0,
	startTime: getInitialStartTime(), //  start time
	endTime: getInitialEndTime(), //  end time
	date: formatDate(new Date(), "db"), // date of workout
};

const LogWorkout = ({ currentUser, closeModal }: Props) => {
	const dispatch = useAppDispatch();
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [activeStep, setActiveStep] = useState<LogStep | null>("Type");
	const [newLog, setNewLog] = useState<CreateLogValues>(initialState);
	const { workoutType } = newLog;
	const stepsList: LogStep[] = ["Type"];

	const handleSelect = (name: string, value: string | number) => {
		setNewLog({
			...newLog,
			[name]: value,
		});
	};

	const changeStep = (step: LogStep) => {
		setActiveStep(step);
		stepsList.push(step);
	};

	const saveNewLog = async () => {
		const { userID } = currentUser;
		// prepares dates/times & calculates 'endTime' from start & mins combined
		const newEntry = prepareWorkoutEntry(newLog);
		const params = { userID, workoutLog: newEntry };

		console.log("newEntry", newEntry);
		const result = await dispatch(saveLogEntry(params)).unwrap();
		// const result = true;

		if (result) {
			setIsSubmitting(false);
			changeStep("SUCCESS");
		} else {
			setIsSubmitting(false);
			alert("WHOOPS! Log entry failed to save :(");
		}
	};

	const resetForm = () => {
		setNewLog(initialState);
		changeStep("Type");
	};

	const closeLogModal = () => {
		resetForm();
		closeModal();
	};

	return (
		<div className={styles.LogWorkout}>
			{/* 1ST STEP: WORKOUT TYPE */}
			<LogTypeView
				values={newLog}
				currentStep={activeStep}
				handleSelect={handleSelect}
			>
				<NextButton
					isDisabled={!workoutType || workoutType === ""}
					goToNext={() => {
						const nextStep: LogStep = get2ndStepFromType(workoutType);
						changeStep(nextStep);
					}}
				/>
			</LogTypeView>

			{/* 2nd: WEIGHTS, REPS, SETS */}
			<LogWeightedView
				values={newLog}
				handleChange={handleSelect}
				currentStep={activeStep}
			>
				<BackButton goToPrev={() => changeStep("Type")} />
				<NextButton goToNext={() => changeStep("Time")} />
			</LogWeightedView>

			{/* 2nd: WALK/RUN STEP */}
			<LogWalkingView
				values={newLog}
				handleChange={handleSelect}
				currentStep={activeStep}
			>
				<BackButton goToPrev={() => changeStep("Type")} />
				<NextButton goToNext={() => changeStep("Time")} />
			</LogWalkingView>

			{/* 3rd: WORKOUT LENGTH/TIME */}
			<LogTimeView
				values={newLog}
				handleChange={handleSelect}
				currentStep={activeStep}
			>
				<BackButton
					goToPrev={() => {
						const secondStep: LogStep = get2ndStepFromType(workoutType);
						const prevStep: LogStep = getPrevStep(stepsList);

						console.log("secondStep", secondStep);
						console.log("prevStep", prevStep);

						if (secondStep === activeStep) {
							changeStep(secondStep);
						} else {
							changeStep(secondStep);
						}
					}}
				/>
				<NextButton goToNext={() => changeStep("Summary")} />
			</LogTimeView>

			{/* 4TH: WORKOUT SUMMARY */}
			<LogWorkoutSummary values={newLog} currentStep={activeStep}>
				<BackButton goToPrev={() => changeStep("Time")} />
				<SaveButton
					isDisabled={isSubmitting}
					saveLog={() => {
						setIsSubmitting(true);
						saveNewLog();
					}}
				/>
			</LogWorkoutSummary>

			{/* SUCCESS MESSAGE */}
			<LogWorkoutSuccess values={newLog} currentStep={activeStep}>
				<CreateNewButton goToPrev={resetForm} />
				<CloseButton close={closeLogModal} />
			</LogWorkoutSuccess>
		</div>
	);
};

export default LogWorkout;
