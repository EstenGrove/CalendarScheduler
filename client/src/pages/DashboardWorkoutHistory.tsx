import { useState, useEffect, ChangeEvent } from "react";
import sprite from "../assets/icons/calendar.svg";
import styles from "../css/pages/DashboardWorkoutHistory.module.scss";
import {
	selectIsHistoryLoading,
	selectWorkoutLogs,
} from "../features/workoutHistory/historySlice";
import { WorkoutLogEntry } from "../features/workoutHistory/types";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store/store";
import {
	getWorkoutHistory,
	LogRange,
} from "../features/workoutHistory/operations";
import { CurrentUser } from "../features/user/types";
import { selectCurrentUser } from "../features/user/userSlice";
import { FilterSettings } from "../utils/utils_filters";
import { endOfWeek, isToday, startOfWeek } from "date-fns";
import { formatDate } from "../utils/utils_dates";
// components
import Loader from "../components/ui/Loader";
import HistoryFilters from "../components/history/HistoryFilters";
import HistoryLogList from "../components/history/HistoryLogList";
import HistoryFiltersModal from "../components/history/HistoryFiltersModal";
import HistoryFilterOptions from "../components/history/HistoryFilterOptions";

const getLogRange = () => {
	const start = startOfWeek(new Date());
	const end = endOfWeek(new Date());
	const startDate = formatDate(start, "db");
	const endDate = formatDate(end, "db");

	return {
		start: startDate,
		end: endDate,
	};
};

const searchLogs = (
	value: string,
	logs: WorkoutLogEntry[]
): WorkoutLogEntry[] => {
	if (!value || value === "") return logs;
	const normVal = value.toLowerCase();

	return logs.filter((log) => {
		const { workoutType, weight, reps } = log;
		const ct = String(reps);
		const lbs = String(weight);
		const wt = workoutType.toLowerCase();
		const isMatch =
			wt.includes(normVal) ||
			wt.startsWith(normVal) ||
			lbs.includes(normVal) ||
			lbs.startsWith(normVal) ||
			ct.includes(normVal) ||
			ct.startsWith(normVal);

		return isMatch;
	});
};

const getTodaysLogs = (logs: WorkoutLogEntry[]): WorkoutLogEntry[] => {
	return logs.filter((log) => {
		return isToday(log.date) || isToday(log.createdDate);
	});
};

const DashboardWorkoutHistory = () => {
	const dispatch = useAppDispatch();
	const isLoading: boolean = useSelector(selectIsHistoryLoading);
	const currentUser: CurrentUser = useSelector(selectCurrentUser);
	const workoutLogs: WorkoutLogEntry[] = useSelector(selectWorkoutLogs);
	// filters & logs state
	const [showFiltersModal, setShowFiltersModal] = useState<boolean>(false);
	const [filteredLogs, setFilteredLogs] = useState<WorkoutLogEntry[]>([]);
	const [filters, setFilters] = useState<string[]>([]);
	const [filterSettings, setFilterSettings] = useState<FilterSettings>({
		rangeType: "Week",
		startDate: startOfWeek(new Date()).toString(),
		endDate: endOfWeek(new Date()).toString(),
		workoutType: null,
		workoutLength: 0,
	});
	const [searchVal, setSearchVal] = useState<string>("");

	const selectFilter = (logsFilter: string) => {
		if (filters.includes(logsFilter)) {
			const newFilters = [...filters.filter((name) => name !== logsFilter)];
			setFilters(newFilters);
		} else {
			setFilters([...filters, logsFilter]);
		}
	};

	const handleFilter = (name: string, value: string | number) => {
		setFilterSettings({
			...filterSettings,
			[name]: value,
		});
	};

	const toggleTodayFilter = () => {
		if (filters.includes("Today")) {
			// remove 'Today' filter
			setFilters([...filters.filter((x) => x !== "Today")]);
			setFilteredLogs(workoutLogs);
		} else {
			const todaysLogs = getTodaysLogs(workoutLogs);
			setFilters([...filters, "Today"]);
			setFilteredLogs(todaysLogs);
		}
	};

	const handleSearch = (_: string, value: string) => {
		setSearchVal(value);
		const results = searchLogs(value, workoutLogs);
		setFilteredLogs(results);
	};

	const clearFilters = () => {
		//  do stuff
		setFilters([]);
		setFilteredLogs(workoutLogs);
	};

	const clearSearch = () => {
		handleSearch("searchVal", "");
	};

	const openFiltersModal = () => {
		setShowFiltersModal(true);
	};
	const closeFiltersModal = () => {
		setShowFiltersModal(false);
	};

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		const getLogs = async (userID: string, range: LogRange) => {
			const result = await dispatch(
				getWorkoutHistory({ userID, range })
			).unwrap();
			// const sorted =
			setFilteredLogs(result.logs);
		};

		const { userID } = currentUser;
		const range = getLogRange();
		getLogs(userID, range);

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.DashboardWorkoutHistory}>
			<div className={styles.DashboardWorkoutHistory_filters}>
				<HistoryFilters
					filters={filters}
					workoutLogs={workoutLogs}
					filteredLogs={filteredLogs}
					clearFilters={clearFilters}
					toggleTodayFilter={toggleTodayFilter}
					openFiltersModal={openFiltersModal}
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
				{isLoading && (
					<div className={styles.DashboardWorkoutHistory_list_loading}>
						<Loader>Loading workout logs...please wait..</Loader>
					</div>
				)}
				{filteredLogs && <HistoryLogList workoutLogs={filteredLogs} />}
			</div>

			{showFiltersModal && (
				<HistoryFiltersModal closeModal={closeFiltersModal}>
					<HistoryFilterOptions
						values={filterSettings}
						handleFilter={handleFilter}
					/>
				</HistoryFiltersModal>
			)}
		</div>
	);
};

export default DashboardWorkoutHistory;
