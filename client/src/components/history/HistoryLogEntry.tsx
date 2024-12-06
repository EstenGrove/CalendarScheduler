import styles from "../../css/history/HistoryLogEntry.module.scss";
import sprite from "../../assets/icons/calendar.svg";
import { useRef, useState } from "react";
import { WorkoutLogEntry } from "../../features/workoutHistory/types";
import { differenceInHours, format, getDate, getYear } from "date-fns";
import { getMonthlySuffix } from "../../utils/utils_recurring";
import { formatDate, getDistanceToNow } from "../../utils/utils_dates";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import {
	isDistanceType,
	isOtherType,
	isWalkingType,
	isWeightedType,
} from "../../utils/utils_workoutLogs";

// THIS IS USED FOR BOTH AD-HOC LOG ENTRIES AND WORKOUT PLAN ENTRIES

type Props = { logEntry: WorkoutLogEntry };
type MenuProps = {
	closeMenu: () => void;
	viewLog: () => void;
	editLog: () => void;
	deleteLog: () => void;
};

const parseWorkoutDate = (date: string) => {
	const day: number = getWorkoutDate(date);
	const suffix: string = getSuffix(day);
	const month: string = formatDate(date, "month");
	const year: number = getYear(date);
	const dist = getDistanceToNow(date);

	return {
		day,
		suffix,
		month,
		year,
		distance: dist,
	};
};

const getWorkoutDate = (date: string) => {
	const parsed = date;
	return getDate(parsed);
};
const getSuffix = (dayOfMonth: number) => {
	const suffix = getMonthlySuffix(dayOfMonth);

	return suffix;
};

const LogMenu = ({ closeMenu, viewLog, editLog, deleteLog }: MenuProps) => {
	const menuRef = useRef<HTMLDivElement>(null);
	useOutsideClick(menuRef, closeMenu);
	return (
		<div ref={menuRef} className={styles.LogMenu}>
			<ul className={styles.LogMenu_list}>
				<li onClick={viewLog} className={styles.LogMenu_list_item}>
					View
				</li>
				<li onClick={editLog} className={styles.LogMenu_list_item}>
					Edit
				</li>
				<li onClick={deleteLog} className={styles.LogMenu_list_item}>
					Delete
				</li>
			</ul>
		</div>
	);
};

const getEntryInfoUI = (logEntry: WorkoutLogEntry) => {
	const { workoutType, steps, miles, reps, sets } = logEntry;

	switch (true) {
		case isDistanceType(workoutType):
		case isWalkingType(workoutType): {
			return (
				<div className={styles.LogEntryInfo}>
					<div className={styles.LogEntryInfo_item}>
						<svg className={styles.LogEntryInfo_icon}>
							<use xlinkHref={`${sprite}#icon-directions_run`}></use>
						</svg>
						<span>{steps} steps</span>
					</div>
					<div className={styles.LogEntryInfo_item}>
						<svg className={styles.LogEntryInfo_icon}>
							<use xlinkHref={`${sprite}#icon-follow_the_signs`}></use>
						</svg>
						<span>{miles}mi</span>
					</div>
				</div>
			);
		}
		case isWeightedType(workoutType): {
			const totalReps = reps * sets;
			return (
				<div className={styles.LogEntryInfo}>
					<div className={styles.LogEntryInfo_item}>
						<span className={styles.LogEntryInfo_item_total}>
							{totalReps} reps
						</span>
						<span className={styles.LogEntryInfo_item_repsSets}>
							({reps}x{sets})
						</span>
					</div>
				</div>
			);
		}
		case isOtherType(workoutType): {
			return <></>;
		}
		default:
			return <></>;
	}
};

const LogEntryInfo = ({ logEntry }: Props) => {
	const info = getEntryInfoUI(logEntry);

	return <>{info}</>;
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

const TimeEntry = ({ logEntry }: Props) => {
	const { startTime, endTime } = logEntry;
	const timeMsg: string = getTimeMsg(startTime, endTime);
	return (
		<div className={styles.TimeEntry}>
			<span>{timeMsg}</span>
		</div>
	);
};

const HistoryLogEntry = ({ logEntry }: Props) => {
	const { date, workoutType, mins } = logEntry;
	const [showMenu, setShowMenu] = useState<boolean>(false);
	const dateParts = parseWorkoutDate(date);
	const formatted = formatDate(date, "long");

	const openMenu = () => {
		setShowMenu(true);
	};
	const closeMenu = () => {
		setShowMenu(false);
	};

	const deleteLogEntry = () => {
		// do stuff
	};
	const viewLogEntry = () => {
		// do stuff
	};
	const editLogEntry = () => {
		// do stuff
	};

	return (
		<div className={styles.HistoryLogEntry}>
			<div className={styles.HistoryLogEntry_top}>
				<div className={styles.HistoryLogEntry_top_title}>
					<h3>{workoutType}</h3>
					<div className={styles.HistoryLogEntry_top_title_when}>
						{dateParts.distance} ago ({formatted})
					</div>
				</div>
				<div className={styles.HistoryLogEntry_top_options}>
					<svg
						onClick={openMenu}
						className={styles.HistoryLogEntry_top_options_icon}
					>
						<use xlinkHref={`${sprite}#icon-keyboard_control`}></use>
					</svg>

					{showMenu && (
						<LogMenu
							closeMenu={closeMenu}
							viewLog={viewLogEntry}
							editLog={editLogEntry}
							deleteLog={deleteLogEntry}
						/>
					)}
				</div>
			</div>
			<div className={styles.HistoryLogEntry_middle}>
				{/*  */}
				{/*  */}
				{/*  */}
			</div>
			<div className={styles.HistoryLogEntry_bottom}>
				<div className={styles.HistoryLogEntry_bottom_mins}>
					<svg className={styles.HistoryLogEntry_bottom_mins_icon}>
						<use xlinkHref={`${sprite}#icon-stopwatch`}></use>
					</svg>
					<span>{mins}m</span>
				</div>
				<LogEntryInfo logEntry={logEntry} />
				<TimeEntry logEntry={logEntry} />
				{/*  */}
				{/*  */}
			</div>
			{/*  */}
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default HistoryLogEntry;
