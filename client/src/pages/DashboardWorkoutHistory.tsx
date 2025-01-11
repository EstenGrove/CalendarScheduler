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
import { endOfMonth, startOfMonth } from "date-fns";
import { formatDate } from "../utils/utils_dates";
import { useAppDispatch } from "../store/store";
import { getWorkoutHistoryRecords } from "../features/workoutHistory/operations";
import { selectCurrentUser } from "../features/user/userSlice";

const fake1: HistoryEntry = {
	planID: 23,
	historyID: 12,
	workoutID: 4,
	workoutType: "Curls",
	name: "Weekly Curls (3x/week)",
	desc: "",
	activityType: "weight",
	date: "2024-12-30",
	startTime: "2024-12-30T09:22:000Z",
	endTime: "2024-12-30T09:46:000Z",
	// recorded & target values
	targetMins: 30,
	targetReps: 20,
	targetSets: 4,
	targetMiles: 0,
	targetSteps: 0,
	targetWeight: 20,
	// actual
	recordedMins: 42,
	recordedReps: 22,
	recordedSets: 3,
	recordedMiles: 0,
	recordedSteps: 0,
	recordedWeight: 20,
};

const fake2: HistoryEntry = {
	planID: 0,
	historyID: 0,
	workoutID: 8,
	name: "Daily Walk (30mins)",
	desc: "",
	workoutType: "Free Walk",
	activityType: "walk",
	date: "2024-12-30",
	startTime: "2024-12-30T09:22:000Z",
	endTime: "2024-12-30T09:46:000Z",
	targetMins: 30,
	targetReps: 0,
	targetSets: 0,
	targetMiles: 2.0,
	targetSteps: 2100,
	targetWeight: 0,
	// actual
	recordedMins: 34,
	recordedReps: 0,
	recordedSets: 0,
	recordedMiles: 2.1,
	recordedSteps: 2150,
	recordedWeight: 0,
};
const fake3: HistoryEntry = {
	planID: 0,
	historyID: 0,
	workoutID: 99,
	name: "Yoga Stretching",
	desc: "",
	workoutType: "Stretch",
	activityType: "stretch",
	date: "2024-12-30",
	startTime: "2024-12-30T09:22:000Z",
	endTime: "2024-12-30T09:46:000Z",
	targetMins: 25,
	targetReps: 0,
	targetSets: 0,
	targetMiles: 0,
	targetSteps: 0,
	targetWeight: 0,
	// actual
	recordedMins: 26,
	recordedReps: 0,
	recordedSets: 0,
	recordedMiles: 0,
	recordedSteps: 0,
	recordedWeight: 0,
};

const historyEntries = [fake1, fake2, fake3, fake2, fake1, fake1];

// REQUIREMENTS:
// - Store filters in query params
// - Quick access filters NEED to be included in 'FilterSettings'

const getLogRange = () => {
	const start = startOfMonth(new Date());
	const end = endOfMonth(new Date());
	const startDate = formatDate(start, "db");
	const endDate = formatDate(end, "db");

	return {
		start: startDate,
		end: endDate,
	};
};

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

	const handleSearch = (name: string, value: string) => {
		// do stuff
		console.log("name", name);
		console.log("value", value);
	};
	const clearSearch = () => {
		// do stuff
		setSearchVal("");
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
					<WorkoutHistoryEntry key={history.name + idx} entry={history} />
				))}
			</div>
		</div>
	);
};

export default DashboardWorkoutHistory;
