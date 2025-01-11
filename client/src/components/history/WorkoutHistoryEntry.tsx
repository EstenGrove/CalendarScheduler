import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/history/WorkoutHistoryEntry.module.scss";
import { differenceInHours, format, isYesterday } from "date-fns";
import { HistoryEntry } from "../../features/workoutHistory/types";
import { useRef, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { ActivityType } from "../../utils/utils_activity";
import {
	applyTimeStrToDate,
	formatDate,
	formatTime,
	getDistanceToNow,
} from "../../utils/utils_dates";

type Props = {
	entry: HistoryEntry;
};
type ItemProps = {
	icon: keyof typeof iconOpts;
	recorded: number;
	target: number;
	label: string;
};
type RecordedItemsProps = {
	entry: HistoryEntry;
};
type TimeProps = {
	startTime: string;
	endTime: string;
};
type ItemBadgeProps = {
	icon: keyof typeof iconOpts;
};
// Recorded Item by Activity Type props
type WeightProps = {
	// actual
	recordedReps: number;
	recordedSets: number;
	recordedWeight: number;
	// targets
	targetReps: number;
	targetSets: number;
	targetWeight: number;
};
type WalkItemProps = {
	recordedMins: number;
	recordedSteps: number;
	recordedMiles: number;
	targetMins: number;
	targetSteps: number;
	targetMiles: number;
};
type CardioItemProps = {
	// actual
	recordedMins: number;
	recordedReps: number;
	recordedSets: number;
	// targets
	targetMins: number;
	targetReps: number;
	targetSets: number;
};
type TimedItemsProps = {
	recordedMins: number;
	targetMins: number;
};
type MenuProps = {
	closeMenu: () => void;
	viewLog: () => void;
	editLog: () => void;
	deleteLog: () => void;
};
type MenuIconProps = {
	openMenu: () => void;
};
const iconOpts = {
	time: "timer",
	miles: "follow_the_signs",
	steps: "directions_walk",
	weight: "fitness_center",
	lbs: "fitness_center",
	reps: "timelapse",
	sets: "timelapse",
	run: "directions_run",
	cardio: "",
	stretch: "accessibility",
	done: "done",
	doneAll: "done_all",
	notDone: "clear",
} as const;

const getActivityTypeKey = (entry: HistoryEntry): keyof typeof iconOpts => {
	const type = entry.activityType as ActivityType;

	switch (type) {
		case "Lift":
			return "weight";
		case "Walk":
			return "miles";
		case "Run":
			return "run";
		case "Cardio":
			return "cardio";
		case "Stretch":
			return "stretch";
		case "More":
			return "doneAll";

		default:
			return "time";
	}
};

const formatThousand = (value: number): string => {
	if (Number(value) >= 1000) {
		const newStr = Math.floor(value / 100) / 10.0;
		return newStr + "k";
	} else {
		return String(value);
	}
};

const getTimeMsg = (startTime: string, endTime: string) => {
	const greaterThan10Hours = differenceInHours(endTime, startTime) >= 10;

	const start = format(startTime, "h:mm a");

	if (greaterThan10Hours) {
		return "All Day";
	} else {
		return "at " + start;
	}
};
const Item = ({ icon, recorded, target, label }: ItemProps) => {
	const isDone = recorded >= target;
	const newStepsR = formatThousand(recorded);

	return (
		<div className={styles.ItemAlt}>
			<IconBadge icon={icon} isDone={isDone} />
			<div className={styles.ItemAlt_recorded}>
				<div className={styles.ItemAlt_recorded_actual}>{newStepsR}</div>
			</div>
			<div className={styles.ItemAlt_label}>{label}</div>
		</div>
	);
};
const TimeEntry = ({ startTime, endTime }: TimeProps) => {
	const timeMsg: string = getTimeMsg(startTime, endTime);
	return (
		<div className={styles.TimeEntry}>
			<span>{timeMsg}</span>
		</div>
	);
};

const Mins = ({ mins }: { mins: number }) => {
	return (
		<div className={styles.Mins}>
			<svg className={styles.Mins_icon}>
				<use xlinkHref={`${sprite}#icon-stopwatch`}></use>
			</svg>
			<span>{mins}m</span>
		</div>
	);
};
const IconBadge = ({ icon = "timer", isDone = false }) => {
	const name = iconOpts[icon as keyof object];
	const iconCss = {
		fill: isDone ? "var(--accent-green)" : "var(--accent-red3)",
	};
	return (
		<div className={styles.RecordedItems_item_badge}>
			<svg className={styles.RecordedItems_item_badge_icon} style={iconCss}>
				<use xlinkHref={`${sprite}#icon-${name}`}></use>
			</svg>
		</div>
	);
};
const WeightItems = ({
	// actual
	recordedReps,
	recordedSets,
	recordedWeight,
	// targets
	targetReps,
	targetSets,
	targetWeight,
}: WeightProps) => {
	const isRepsDone = recordedReps >= targetReps;
	const isSetsDone = recordedSets >= targetSets;
	const isCorrectWeight = recordedWeight >= targetWeight;
	return (
		<div className={styles.RecordedItems}>
			{/* WEIGHT */}
			<div className={styles.RecordedItems_item}>
				<Item
					icon={isCorrectWeight ? "done" : "notDone"}
					recorded={recordedWeight}
					target={targetWeight}
					label="lbs."
				/>
			</div>
			{/* REPS */}
			<div className={styles.RecordedItems_item}>
				<Item
					icon={isRepsDone ? "done" : "notDone"}
					recorded={recordedReps}
					target={targetReps}
					label="reps"
				/>
			</div>
			{/* SETS */}
			<div className={styles.RecordedItems_item}>
				<Item
					icon={isSetsDone ? "done" : "notDone"}
					recorded={recordedSets}
					target={targetSets}
					label="sets"
				/>
			</div>
		</div>
	);
};
const WalkItems = ({
	// actual
	recordedMins,
	recordedSteps,
	recordedMiles,
	// target
	targetMins,
	targetSteps,
	targetMiles,
}: WalkItemProps) => {
	const isMinsDone = recordedMins >= targetMins;
	const isStepsDone = recordedSteps >= targetSteps;
	const isMilesDone = recordedMiles >= targetMiles;
	return (
		<div className={styles.RecordedItems}>
			<div className={styles.RecordedItems_item}>
				<Item
					icon={isMinsDone ? "done" : "notDone"}
					recorded={recordedMins}
					target={targetMins}
					label="mins"
				/>
			</div>
			<div className={styles.RecordedItems_item}>
				<Item
					icon={isStepsDone ? "done" : "notDone"}
					recorded={recordedSteps}
					target={targetSteps}
					label="steps"
				/>
			</div>
			<div className={styles.RecordedItems_item}>
				<Item
					icon={isMilesDone ? "done" : "notDone"}
					recorded={recordedMiles}
					target={targetMiles}
					label="mi"
				/>
			</div>
		</div>
	);
};
const CardioItems = ({
	// actual
	recordedMins,
	recordedReps,
	recordedSets,
	// targets
	targetMins,
	targetReps,
	targetSets,
}: CardioItemProps) => {
	const isRepsDone = recordedReps >= targetReps;
	const isSetsDone = recordedSets >= targetSets;
	const isMinsDone = recordedMins >= targetMins;
	return (
		<div className={styles.RecordedItems}>
			<div className={styles.RecordedItems_item}>
				<Item
					icon={isMinsDone ? "done" : "notDone"}
					recorded={recordedMins}
					target={targetMins}
					label="mins"
				/>
			</div>
			<div className={styles.RecordedItems_item}>
				<Item
					icon={isRepsDone ? "done" : "notDone"}
					recorded={recordedReps}
					target={targetReps}
					label="reps"
				/>
			</div>
			<div className={styles.RecordedItems_item}>
				<Item
					icon={isSetsDone ? "done" : "notDone"}
					recorded={recordedSets}
					target={targetSets}
					label="sets"
				/>
			</div>
		</div>
	);
};
// Stretch, timed
const TimedItems = ({
	// actual
	recordedMins,
	// target
	targetMins,
}: TimedItemsProps) => {
	const isMinsDone = recordedMins >= targetMins;
	return (
		<div className={styles.RecordedItems}>
			<div className={styles.RecordedItems_item}>
				<Item
					icon={isMinsDone ? "done" : "notDone"}
					recorded={recordedMins}
					target={targetMins}
					label="mins"
				/>
			</div>
		</div>
	);
};
const RecordedItems = ({ entry }: RecordedItemsProps) => {
	const {
		activityType,
		recordedMins,
		recordedSteps,
		recordedMiles,
		recordedReps,
		recordedSets,
		recordedWeight, // UPDATE workout_history TO INCLUDE
		// target
		targetMins,
		targetSteps,
		targetMiles,
		targetReps,
		targetSets,
		targetWeight,
	} = entry;

	return (
		<>
			{activityType === "Lift" && (
				<WeightItems
					recordedReps={recordedReps}
					recordedSets={recordedSets}
					recordedWeight={recordedWeight}
					targetWeight={targetWeight}
					targetReps={targetReps}
					targetSets={targetSets}
				/>
			)}
			{activityType === "Cardio" && (
				<CardioItems
					recordedMins={recordedMins}
					recordedReps={recordedReps}
					recordedSets={recordedSets}
					targetMins={targetMins}
					targetReps={targetReps}
					targetSets={targetSets}
				/>
			)}
			{(activityType === "Walk" || activityType === "Run") && (
				<WalkItems
					recordedMins={recordedMins}
					recordedSteps={recordedSteps}
					recordedMiles={recordedMiles}
					targetMins={targetMins}
					targetSteps={targetSteps}
					targetMiles={targetMiles}
				/>
			)}
			{(activityType === "Timed" ||
				activityType === "Stretch" ||
				activityType === "More") && (
				<TimedItems recordedMins={recordedMins} targetMins={targetMins} />
			)}
		</>
	);
};

const MenuIcon = ({ openMenu }: MenuIconProps) => {
	return (
		<div onClick={openMenu} className={styles.MenuIcon}>
			<svg className={styles.MenuIcon_icon}>
				<use xlinkHref={`${sprite}#icon-keyboard_control`}></use>
			</svg>
		</div>
	);
};

const getHowLongAgo = (startTime: string, date: string) => {
	if (!startTime) return "a while";
	const timeStr: string = formatTime(startTime, "long");
	const withTime = applyTimeStrToDate(timeStr, date);
	const dist = getDistanceToNow(withTime);

	if (isYesterday(withTime)) {
		return "yesterday";
	} else {
		return dist + " ago";
	}
};

const ItemHeader = ({ entry }: Props) => {
	const ago = getHowLongAgo(entry.startTime, entry.date);
	const date = formatDate(entry.date, "long");
	return (
		<div className={styles.ItemHeader}>
			<div className={styles.ItemHeader_name}>{entry.name}</div>
			<div className={styles.ItemHeader_time}>
				{ago} ({date})
			</div>
		</div>
	);
};
const ItemBadge = ({ icon = "time" }: ItemBadgeProps) => {
	const name = iconOpts[icon as keyof object];

	return (
		<div className={styles.ItemBadge}>
			<svg className={styles.ItemBadge_icon}>
				<use xlinkHref={`${sprite}#icon-${name}`}></use>
			</svg>
		</div>
	);
};

const MenuOptions = ({ closeMenu, viewLog, editLog, deleteLog }: MenuProps) => {
	const menuRef = useRef<HTMLDivElement>(null);
	useOutsideClick(menuRef, closeMenu);
	return (
		<div ref={menuRef} className={styles.MenuOptions}>
			<ul className={styles.MenuOptions_list}>
				<li onClick={viewLog} className={styles.MenuOptions_list_item}>
					View
				</li>
				<li onClick={editLog} className={styles.MenuOptions_list_item}>
					Edit
				</li>
				<li onClick={deleteLog} className={styles.MenuOptions_list_item}>
					Delete
				</li>
			</ul>
		</div>
	);
};

const WorkoutHistoryEntry = ({ entry }: Props) => {
	const type = getActivityTypeKey(entry);
	const [showMoreOptions, setShowMoreOptions] = useState(false);

	const viewHistoryEntry = () => {
		// do stuff
	};
	const editHistoryEntry = () => {
		// do stuff
	};
	const deleteHistoryEntry = () => {
		// do stuff
	};

	const openMenu = () => {
		setShowMoreOptions(true);
	};
	const closeMenu = () => {
		setShowMoreOptions(false);
	};

	return (
		<div className={styles.HistoryItem}>
			<div className={styles.HistoryItem_top}>
				<div className={styles.HistoryItem_top_main}>
					<ItemBadge icon={type} />
					<ItemHeader entry={entry} />
				</div>
				<div className={styles.HistoryItem_top_more}>
					<MenuIcon openMenu={openMenu} />
					{showMoreOptions && (
						<MenuOptions
							viewLog={viewHistoryEntry}
							editLog={editHistoryEntry}
							deleteLog={deleteHistoryEntry}
							closeMenu={closeMenu}
						/>
					)}
				</div>
			</div>
			<div className={styles.HistoryItem_recorded}>
				<RecordedItems entry={entry} />
			</div>
			<div className={styles.HistoryItem_bottom}>
				<Mins mins={entry.recordedMins} />
				<TimeEntry
					startTime={"2024-12-31T19:02:00.000Z"}
					endTime={"2024-12-31T19:32:00.000Z"}
				/>
			</div>
		</div>
	);
};

export default WorkoutHistoryEntry;
