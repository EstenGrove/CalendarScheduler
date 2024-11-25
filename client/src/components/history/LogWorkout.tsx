import { useState } from "react";
import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/history/LogWorkout.module.scss";
import { CurrentUser } from "../../features/user/types";
import { CreateLogValues } from "../workout-logs/types";
import {
	isDistanceType,
	isOtherType,
	isWalkingType,
	isWeightedType,
	LogStep,
} from "../../utils/utils_workoutLogs";
import LogTypeView from "../workout-logs/LogTypeView";
import LogWeightedView from "../workout-logs/LogWeightedView";
import LogWalkingView from "../workout-logs/LogWalkingView";
import LogTimeView from "../workout-logs/LogTimeView";
import LogWorkoutSummary from "../workout-logs/LogWorkoutSummary";

// WORKOUT LOG FLOWS
// - Type => Weights/Reps

type Props = {
	currentUser: CurrentUser;
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

const LogWorkout = ({ currentUser }: Props) => {
	const [activeStep, setActiveStep] = useState<LogStep | null>("Type");
	const [newLog, setNewLog] = useState<CreateLogValues>({
		workoutType: "",
		mins: 30,
		reps: 20,
		sets: 1,
		weight: 15,
		steps: 0,
		miles: 0,
		startTime: "",
		endTime: "",
	});
	const { workoutType } = newLog;

	const handleSelect = (name: string, value: string | number) => {
		setNewLog({
			...newLog,
			[name]: value,
		});
	};

	const changeStep = (step: LogStep) => {
		setActiveStep(step);
	};

	const saveNewLog = () => {
		//
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
						const prevStep: LogStep = get2ndStepFromType(workoutType);
						changeStep(prevStep);
					}}
				/>
				<NextButton goToNext={() => changeStep("Summary")} />
			</LogTimeView>

			{/* 4TH: WORKOUT SUMMARY */}
			<LogWorkoutSummary values={newLog} currentStep={activeStep}>
				<BackButton goToPrev={() => changeStep("Time")} />
				<SaveButton saveLog={() => changeStep("Summary")} />
			</LogWorkoutSummary>
		</div>
	);
};

export default LogWorkout;
