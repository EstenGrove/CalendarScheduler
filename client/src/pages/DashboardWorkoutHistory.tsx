import styles from "../css/pages/DashboardWorkoutHistory.module.scss";
import sprite from "../assets/icons/calendar.svg";
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store/store";
import { CurrentUser } from "../features/user/types";
import { selectCurrentUser } from "../features/user/userSlice";
import { HistoryEntry } from "../features/workoutHistory/types";
// components
import WorkoutHistoryEntry from "../components/history/WorkoutHistoryEntry";
import WorkoutHistoryFilters from "../components/history/WorkoutHistoryFilters";
import { FilterSettings, initialFilters } from "../utils/utils_filters";
import { selectWorkoutHistory } from "../features/workoutHistory/historySlice";

const fake1 = {
	name: "Weekly Curls (3x/week)",
	activityType: "weight",
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
	workout: {
		workoutID: 1,
		name: "Curls (3x a week)",
		desc: "Curls performed 3x a week",
	},
	entry: {
		historyID: 1,
		userID: "XXXX-XXXX-XXXXXX",
		date: "2024-12-23",
		startTime: "9:30 AM",
		endTime: "9:45 AM",
		mins: 15,
		reps: 0,
		sets: 0,
		steps: 0,
		miles: 0,
		isCompleted: true,
	},
};

const fake2: HistoryEntry = {
	planID: 0,
	historyID: 0,
	name: "Daily Walk (30mins)",
	workoutType: "Free Walk",
	activityType: "walk",
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
	name: "Yoga Stretching",
	workoutType: "Stretch",
	activityType: "stretch",
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

const DashboardWorkoutHistory = () => {
	const dispatch = useAppDispatch();
	const currentUser: CurrentUser = useSelector(selectCurrentUser);
	const workoutHistory = useSelector(selectWorkoutHistory);
	// filters
	const [filterSettings, setFilterSettings] =
		useState<FilterSettings>(initialFilters);
	const [searchVal, setSearchVal] = useState<string>("");

	const handleSearch = (name: string, value: string) => {
		// do stuff
	};
	const clearSearch = () => {
		// do stuff
		setSearchVal("");
	};

	return (
		<div className={styles.DashboardWorkoutHistory}>
			<div className={styles.DashboardWorkoutHistory_filters}>
				<WorkoutHistoryFilters
					filterSettings={filterSettings}
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
				{historyEntries.map((history, idx) => (
					<WorkoutHistoryEntry key={history.name + idx} entry={history} />
				))}
			</div>
		</div>
	);
};

export default DashboardWorkoutHistory;
