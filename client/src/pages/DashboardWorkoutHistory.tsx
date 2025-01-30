import styles from "../css/pages/DashboardWorkoutHistory.module.scss";
import sprite from "../assets/icons/calendar.svg";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HistoryEntry } from "../features/workoutHistory/types";
import { FilterSettings, initialFilters } from "../utils/utils_filters";
import { selectWorkoutHistory } from "../features/workoutHistory/historySlice";
// components
import WorkoutHistoryEntry from "../components/history/WorkoutHistoryEntry";
import WorkoutHistoryFilters from "../components/history/WorkoutHistoryFilters";
import {
	endOfDay,
	endOfMonth,
	endOfWeek,
	endOfYear,
	startOfDay,
	startOfMonth,
	startOfWeek,
	startOfYear,
} from "date-fns";
import { formatDate } from "../utils/utils_dates";
import { useAppDispatch } from "../store/store";
import { getWorkoutHistoryRecords } from "../features/workoutHistory/operations";
import { selectCurrentUser } from "../features/user/userSlice";
import Modal from "../components/shared/Modal";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import ViewWorkout from "../components/workouts/ViewWorkout";

// REQUIREMENTS:
// - Store filters in query params
// - Quick access filters NEED to be included in 'FilterSettings'

type DefaultRange = "DAY" | "WEEK" | "MONTH" | "QUARTER" | "YEAR";

const getDefaultRangeByType = (type: DefaultRange) => {
	switch (type) {
		case "DAY": {
			const day = new Date();
			const start = startOfDay(day);
			const end = endOfDay(day);

			return {
				start: formatDate(start, "db"),
				end: formatDate(end, "db"),
			};
		}
		case "WEEK": {
			const day = new Date();
			const start = startOfWeek(day);
			const end = endOfWeek(day);

			return {
				start: formatDate(start, "db"),
				end: formatDate(end, "db"),
			};
		}
		case "MONTH": {
			const day = new Date();
			const start = startOfMonth(day);
			const end = endOfMonth(day);

			return {
				start: formatDate(start, "db"),
				end: formatDate(end, "db"),
			};
		}
		case "YEAR": {
			const day = new Date();
			const start = startOfYear(day);
			const end = endOfYear(day);

			return {
				start: formatDate(start, "db"),
				end: formatDate(end, "db"),
			};
		}

		default:
			throw new Error("Invalid range type: " + type);
	}
};

const getLogRange = () => {
	const range = getDefaultRangeByType("WEEK");

	return {
		start: range.start,
		end: range.end,
	};
};

type ActiveModal = "VIEW" | "EDIT" | "DELETE";

const DashboardWorkoutHistory = () => {
	const dispatch = useAppDispatch();
	const currentUser = useSelector(selectCurrentUser);
	const workoutHistory = useSelector(selectWorkoutHistory);
	// filters
	const [filterSettings, setFilterSettings] =
		useState<FilterSettings>(initialFilters);
	const [searchVal, setSearchVal] = useState<string>("");
	const [filteredHistory, setFilteredHistory] = useState<HistoryEntry[]>(
		workoutHistory || []
	);
	const [selectedWorkout, setSelectedWorkout] = useState<HistoryEntry | null>(
		null
	);
	const [activeModal, setActiveModal] = useState<ActiveModal | null>(null);

	const handleSearch = (name: string, value: string) => {
		// do stuff
		console.log("name", name);
		console.log("value", value);
	};
	const clearSearch = () => {
		// do stuff
		setSearchVal("");
	};

	const selectWorkout = (workout: HistoryEntry) => {
		setSelectedWorkout(workout);
	};

	const viewEntry = (workout: HistoryEntry) => {
		selectWorkout(workout);
		openModal("VIEW");
	};
	const editEntry = (workout: HistoryEntry) => {
		selectWorkout(workout);
		openModal("EDIT");
	};
	const deleteEntry = (workout: HistoryEntry) => {
		selectWorkout(workout);
		openModal("DELETE");
	};

	const openModal = (type: ActiveModal) => {
		setActiveModal(type);
	};
	const closeModal = () => {
		setActiveModal(null);
	};

	const confirmDelete = () => {
		// do stuff
	};
	const cancelDelete = () => {
		// do stuff
	};

	// fetch workout history records for range
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		const getHistory = async () => {
			const logRange = getLogRange();
			const results = await dispatch(
				getWorkoutHistoryRecords({
					userID: currentUser.userID,
					range: logRange,
				})
			).unwrap();
			setFilteredHistory(results);
		};

		getHistory();

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.DashboardWorkoutHistory}>
			<div className={styles.DashboardWorkoutHistory_filters}>
				<WorkoutHistoryFilters
					filterSettings={filterSettings}
					filteredLogs={filteredHistory}
					workoutHistory={workoutHistory || []}
				/>
			</div>
			<div className={styles.DashboardWorkoutHistory_search}>
				<div className={styles.SearchInputWrapper}>
					<input
						type="text"
						name="searchLogs"
						id="searchLogs"
						className={styles.SearchInput}
						placeholder="Search logs..."
						value={searchVal}
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							const { name, value } = e.target;
							handleSearch(name, value);
						}}
					/>
					{!!searchVal && (
						<button
							type="button"
							onClick={clearSearch}
							className={styles.SearchInputWrapper_btn}
						>
							<svg className={styles.SearchInputWrapper_btn_icon}>
								<use xlinkHref={`${sprite}#icon-clear`}></use>
							</svg>
						</button>
					)}
				</div>
			</div>

			<div className={styles.DashboardWorkoutHistory_list}>
				{workoutHistory.map((history, idx) => (
					<WorkoutHistoryEntry
						key={history.name + idx}
						entry={history}
						onEdit={() => editEntry(history)}
						onView={() => viewEntry(history)}
						onDelete={() => deleteEntry(history)}
					/>
				))}
			</div>

			{activeModal === "VIEW" && (
				<Modal closeModal={closeModal}>
					<ViewWorkout workout={selectedWorkout as HistoryEntry} />
				</Modal>
			)}
			{activeModal === "EDIT" && (
				<Modal closeModal={closeModal}>
					{/*  */}
					{/*  */}
				</Modal>
			)}

			{activeModal === "DELETE" && (
				<ConfirmDialog
					closeDialog={closeModal}
					onConfirm={confirmDelete}
					onCancel={cancelDelete}
				>
					{/*  */}
					{/*  */}
				</ConfirmDialog>
			)}
		</div>
	);
};

export default DashboardWorkoutHistory;
