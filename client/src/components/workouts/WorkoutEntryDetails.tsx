import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/workouts/WorkoutEntryDetails.module.scss";
import { HistoryEntry } from "../../features/workoutHistory/types";
import { activityIcons, getActivityTypeKey } from "../../utils/utils_activity";
import { formatCustom, formatTime } from "../../utils/utils_dates";
import { addEllipsis } from "../../utils/utils_misc";
import { addMinutes } from "date-fns";

type Props = { workout: HistoryEntry };

type ActivityProps = {
	icon: keyof typeof activityIcons;
	tagColor?: string;
};
const ActivityType = ({ icon, tagColor }: ActivityProps) => {
	const name = activityIcons[icon as keyof object];

	return (
		<div className={styles.ActivityType}>
			<svg className={styles.ActivityType_icon} style={{ fill: tagColor }}>
				<use xlinkHref={`${sprite}#icon-${name}`}></use>
			</svg>
		</div>
	);
};

const getWorkoutDateDesc = (workout: HistoryEntry) => {
	if (!workout) return;
	const custom = formatCustom(workout.startTime, "dateDesc");

	return custom;
};

const DoneAt = ({ workout }: DetailsProps) => {
	const start = formatTime(workout.startTime, "long");
	const end = formatTime(
		addMinutes(workout.endTime, workout.recordedMins),
		"long"
	);
	return (
		<div>
			{start} - {end}
		</div>
	);
};

type DetailsProps = {
	workout: HistoryEntry;
};
const DetailsHeader = ({ workout }: DetailsProps) => {
	const activity = getActivityTypeKey(workout.activityType);
	const name = addEllipsis(workout.name, 30);
	const dateDesc = getWorkoutDateDesc(workout);

	return (
		<div className={styles.DetailsHeader}>
			<div className={styles.DetailsHeader_title}>{dateDesc}</div>
			<div className={styles.DetailsHeader_wrapper}>
				<ActivityType icon={activity} />
				<div className={styles.DetailsHeader_main}>
					<div className={styles.DetailsHeader_main_name}>{name}</div>
					<div className={styles.DetailsHeader_main_time}>
						<DoneAt workout={workout} />
					</div>
				</div>
			</div>
		</div>
	);
};

type EntryProps = {
	label: string;
	value: string | number;
};
const DetailsEntry = ({ label, value }: EntryProps) => {
	return (
		<div className={styles.DetailsGrid_entry}>
			<div className={styles.DetailsGrid_entry_label}>{label}</div>
			<div className={styles.DetailsGrid_entry_value}>{value}</div>
		</div>
	);
};

const LiftDetails = ({ workout }: DetailsProps) => {
	return (
		<>
			<DetailsEntry label="Workout Mins." value={workout.recordedMins + "m"} />
			<DetailsEntry label="Weights" value={workout.recordedWeight + "lbs."} />
			<DetailsEntry label="Reps" value={workout.recordedReps} />
			<DetailsEntry label="Sets" value={workout.recordedSets} />
		</>
	);
};
const CardioDetails = ({ workout }: DetailsProps) => {
	return (
		<>
			<DetailsEntry label="Workout Mins." value={workout.recordedMins + "m"} />
			<DetailsEntry label="Reps" value={workout.recordedReps} />
			<DetailsEntry label="Sets" value={workout.recordedSets} />
		</>
	);
};
const WalkDetails = ({ workout }: DetailsProps) => {
	return (
		<>
			<DetailsEntry label="Workout Mins." value={workout.recordedMins + "m"} />
			<DetailsEntry label="Steps" value={workout.recordedSteps} />
			<DetailsEntry label="Miles" value={workout.recordedMiles + "mi."} />
		</>
	);
};
const StretchDetails = ({ workout }: DetailsProps) => {
	return (
		<>
			<DetailsEntry label="Workout Mins." value={workout.recordedMins + "m"} />
		</>
	);
};

const DetailsGrid = ({ workout }: DetailsProps) => {
	const type = workout.activityType;
	console.log("type", type);
	return (
		<div className={styles.DetailsGrid}>
			{(type === "Lift" || type === "Strength") && (
				<LiftDetails workout={workout} />
			)}
			{(type === "Walk" || type === "Run") && <WalkDetails workout={workout} />}
			{type === "Cardio" && <CardioDetails workout={workout} />}
			{type === "Stretch" && <StretchDetails workout={workout} />}
		</div>
	);
};

const WorkoutEntryDetails = ({ workout }: Props) => {
	return (
		<div className={styles.WorkoutEntryDetails}>
			<DetailsHeader workout={workout} />
			<DetailsGrid workout={workout} />
			{/*  */}
			{/*  */}
		</div>
	);
};

export default WorkoutEntryDetails;
