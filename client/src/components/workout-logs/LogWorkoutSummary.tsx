import { ReactNode } from "react";
import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/workout-logs/LogWorkoutSummary.module.scss";
import { CreateLogValues } from "./types";
import { LogWorkoutFooter, LogWorkoutStep } from "../history/LogWorkoutStep";
import {
	isDistanceType,
	isWalkingType,
	isWeightedType,
	LogStep,
} from "../../utils/utils_workoutLogs";
import { convertToHrsAndMins } from "../../utils/utils_dates";

type Props = {
	currentStep: LogStep;
	values: CreateLogValues;
	children?: ReactNode;
};

type SummaryProps = {
	values: CreateLogValues;
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

const LogWorkoutSummary = ({ values, currentStep, children }: Props) => {
	const { workoutType } = values;

	if (!workoutType) {
		return null;
	}
	return (
		<LogWorkoutStep
			title="Summary of Workout Entry"
			isActiveStep={currentStep === "Summary"}
		>
			<div className={styles.LogWorkoutSummary}>
				<div className={styles.LogWorkoutSummary_row}>
					<h3>Workout Type</h3>
					<div className={styles.LogWorkoutSummary_row_value}>
						{workoutType}
					</div>
				</div>
				<div className={styles.LogWorkoutSummary_main}>
					{/* MAIN WORKOUT DATA */}
					{isWalkingType(workoutType) && <WalkSummary values={values} />}
					{isWeightedType(workoutType) && <WeightSummary values={values} />}
					{isDistanceType(workoutType) && <DistanceSummary values={values} />}
					{/* WORKOUT TIME/LENGTH */}
					<TimeSummary values={values} />
				</div>
			</div>
			<LogWorkoutFooter>{children}</LogWorkoutFooter>
		</LogWorkoutStep>
	);
};

export default LogWorkoutSummary;
