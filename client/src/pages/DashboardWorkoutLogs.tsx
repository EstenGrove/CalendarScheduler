import { useState, useEffect, ChangeEvent } from "react";
import sprite from "../assets/icons/calendar.svg";
import styles from "../css/pages/DashboardWorkoutLogs.module.scss";
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
import { FilterSettings, RangeType } from "../utils/utils_filters";
import {
	endOfDay,
	endOfMonth,
	endOfQuarter,
	endOfWeek,
	endOfYear,
	isToday,
	startOfDay,
	startOfMonth,
	startOfQuarter,
	startOfWeek,
	startOfYear,
	subDays,
	subMonths,
	subWeeks,
} from "date-fns";
import { formatDate } from "../utils/utils_dates";
import { sortWorkoutLogsBy } from "../utils/utils_workoutLogs";
import { useToast } from "../hooks/useToast";
// components
import Toast from "../components/ui/Toast";
import Loader from "../components/ui/Loader";
import ModalFooter from "../components/shared/ModalFooter";
import HistoryLogList from "../components/history/HistoryLogList";
import HistoryFilters from "../components/history/HistoryFilters";
import HistoryFiltersModal from "../components/history/HistoryFiltersModal";
import HistoryFilterOptions from "../components/history/HistoryFilterOptions";

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

const formatRange = (start: Date, end: Date) => {
	return {
		start: formatDate(start, "db"),
		end: formatDate(end, "db"),
	};
};

const getDateRangeByType = (rangeType: RangeType) => {
	switch (rangeType) {
		case "Today": {
			const newRange = formatRange(
				startOfDay(new Date()),
				endOfDay(new Date())
			);
			return newRange;
		}
		case "Yesterday": {
			const newRange = formatRange(
				startOfDay(subDays(new Date(), 1)),
				endOfDay(subDays(new Date(), 1))
			);
			return newRange;
		}
		case "This Week": {
			const newRange = formatRange(
				startOfWeek(new Date()),
				endOfWeek(new Date())
			);
			return newRange;
		}
		case "Last Week": {
			const newRange = formatRange(
				startOfWeek(subWeeks(new Date(), 1)),
				endOfWeek(subWeeks(new Date(), 1))
			);
			return newRange;
		}
		case "This Month": {
			const newRange = formatRange(
				startOfMonth(new Date()),
				endOfMonth(new Date())
			);
			return newRange;
		}
		case "Last Month": {
			const newRange = formatRange(
				startOfMonth(subMonths(new Date(), 1)),
				endOfMonth(subMonths(new Date(), 1))
			);
			return newRange;
		}
		case "This Year": {
			const newRange = formatRange(
				startOfYear(new Date()),
				endOfYear(new Date())
			);
			return newRange;
		}

		// Default: this month to-date
		default: {
			const start = startOfMonth(new Date());
			const end = endOfMonth(new Date());
			const startDate = formatDate(start, "db");
			const endDate = formatDate(end, "db");
			return { start: startDate, end: endDate };
		}
	}
};

const getDateRangeByFilters = (values: FilterSettings) => {
	const { rangeType } = values;

	switch (rangeType) {
		case "Day": {
			const { rangeDate: startDate } = values;
			const start = startOfDay(startDate);
			const end = endOfDay(startDate);

			return {
				start: formatDate(start, "long"),
				end: formatDate(end, "long"),
			};
		}
		case "Week": {
			const { rangeDate: startDate } = values;
			const start = startOfWeek(startDate);
			const end = endOfWeek(startDate);

			return {
				start: formatDate(start, "long"),
				end: formatDate(end, "long"),
			};
		}
		case "Month": {
			const { rangeMonth: startDate } = values;
			const start = startOfMonth(startDate);
			const end = endOfMonth(startDate);

			return {
				start: formatDate(start, "long"),
				end: formatDate(end, "long"),
			};
		}
		case "Quarter": {
			const { rangeQuarter: startDate } = values;
			const start = startOfQuarter(startDate);
			const end = endOfQuarter(startDate);

			return {
				start: formatDate(start, "long"),
				end: formatDate(end, "long"),
			};
		}
		case "Year": {
			const { rangeYear: startDate } = values;
			const start = startOfYear(startDate);
			const end = endOfYear(startDate);

			return {
				start: formatDate(start, "long"),
				end: formatDate(end, "long"),
			};
		}
		// Quick Access Ranges
		case "Today": {
			const newRange = formatRange(
				startOfDay(new Date()),
				endOfDay(new Date())
			);
			return newRange;
		}
		case "Yesterday": {
			const newRange = formatRange(
				startOfDay(subDays(new Date(), 1)),
				endOfDay(subDays(new Date(), 1))
			);
			return newRange;
		}
		case "This Week": {
			const newRange = formatRange(
				startOfWeek(new Date()),
				endOfWeek(new Date())
			);
			return newRange;
		}
		case "Last Week": {
			const newRange = formatRange(
				startOfWeek(subWeeks(new Date(), 1)),
				endOfWeek(subWeeks(new Date(), 1))
			);
			return newRange;
		}
		case "This Month": {
			const newRange = formatRange(
				startOfMonth(new Date()),
				endOfMonth(new Date())
			);
			return newRange;
		}
		case "Last Month": {
			const newRange = formatRange(
				startOfMonth(subMonths(new Date(), 1)),
				endOfMonth(subMonths(new Date(), 1))
			);
			return newRange;
		}
		case "This Year": {
			const newRange = formatRange(
				startOfYear(new Date()),
				endOfYear(new Date())
			);
			return newRange;
		}

		default:
			throw new Error("Invalid range");
	}
};

// REQUIREMENTS:
// - Store filters in query params
// - Quick access filters NEED to be included in 'FilterSettings'

// Returns start of month as date
const getInitialMonth = (): Date => {
	return startOfMonth(new Date());
};
// Returns start of quarter as date
const getInitialQuarter = () => {
	return startOfQuarter(new Date());
};
const getInitialYear = (): number => {
	return new Date().getFullYear();
};
const getInitialLogState = () => {
	const initialState: FilterSettings = {
		// rangeType: "Week",
		rangeType: "None",
		rangeDate: new Date(),
		rangeMonth: getInitialMonth(),
		rangeYear: getInitialYear(),
		rangeQuarter: getInitialQuarter(),
		customStart: "",
		customEnd: "",
		workoutType: null,
		workoutLength: 0,
	};
	return initialState;
};

const initialState: FilterSettings = {
	rangeType: "None",
	rangeDate: new Date(),
	rangeMonth: getInitialMonth(),
	rangeYear: getInitialYear(),
	rangeQuarter: getInitialQuarter(),
	customStart: "",
	customEnd: "",
	workoutType: null,
	workoutLength: 0,
};

const DashboardWorkoutLogs = () => {
	const dispatch = useAppDispatch();
	const isLoading: boolean = useSelector(selectIsHistoryLoading);
	const currentUser: CurrentUser = useSelector(selectCurrentUser);
	const workoutLogs: WorkoutLogEntry[] = useSelector(selectWorkoutLogs);
	// filters & logs state
	const [showFiltersModal, setShowFiltersModal] = useState<boolean>(false);
	const [filteredLogs, setFilteredLogs] = useState<WorkoutLogEntry[]>([]);
	const [filters, setFilters] = useState<string[]>([]);
	const [filterSettings, setFilterSettings] =
		useState<FilterSettings>(initialState);
	const [searchVal, setSearchVal] = useState<string>("");
	const toaster = useToast();
	const [toastMsg, setToastMsg] = useState("Showing data for this week");

	// quick access filters handler (closes modal & fires off request)
	const handleQuickFilter = (name: string, value: string | number) => {
		const newSettings = {
			...filterSettings,
			[name]: value,
		};
		setFilterSettings(newSettings);
		getQuickAccessRange(newSettings);
		setToastMsg("Showing data for " + newSettings.rangeType);
		toaster.showToast();
	};
	const handleFilter = (name: string, value: string | number) => {
		setFilterSettings({
			...filterSettings,
			[name]: value,
		});
	};
	const handleDate = (name: string, value: Date) => {
		setFilterSettings({
			...filterSettings,
			[name]: value,
		});
	};
	const handleMonth = (name: string, value: Date) => {
		setFilterSettings({
			...filterSettings,
			[name]: value,
		});
	};
	const handleQuarter = (name: string, value: Date) => {
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
			setFilterSettings({
				...filterSettings,
				rangeType: "Today",
			});
		}
	};

	const getQuickAccessRange = async (newSettings: FilterSettings) => {
		const { userID } = currentUser;
		const { rangeType } = newSettings;
		const newRange = getDateRangeByType(rangeType);
		// fire off request for data
		const result = await dispatch(
			getWorkoutHistory({ userID, range: newRange })
		).unwrap();
		const sorted = sortWorkoutLogsBy(result.logs, "workoutDate:DESC");
		setFilteredLogs(sorted);
	};

	const getFilteredRange = async (newSettings: FilterSettings) => {
		const { userID } = currentUser;
		const newRange = getDateRangeByFilters(newSettings);
		// fire off request for data
		const result = await dispatch(
			getWorkoutHistory({ userID, range: newRange })
		).unwrap();
		const sorted = sortWorkoutLogsBy(result.logs, "workoutDate:DESC");
		setFilteredLogs(sorted);
	};

	const handleSearch = (_: string, value: string) => {
		setSearchVal(value);
		const results = searchLogs(value, workoutLogs);
		setFilteredLogs(results);
	};

	const clearFilters = () => {
		setFilters([]);
		setFilteredLogs(workoutLogs);
		const newState = getInitialLogState();
		setFilterSettings(newState);
		resetLogData();
	};

	const resetLogData = async () => {
		const { userID } = currentUser;
		const range = getLogRange();
		const result = await dispatch(
			getWorkoutHistory({ userID, range })
		).unwrap();
		const sorted = sortWorkoutLogsBy(result.logs, "workoutDate:DESC");
		setFilteredLogs(sorted);
	};

	const clearSearch = () => {
		handleSearch("searchVal", "");
	};

	const saveFilters = () => {
		// - Get new range
		// - Get workout type, if selected, otherwise default to 'ALL'
		getFilteredRange(filterSettings);
		closeFiltersModal();
	};
	const cancelFilters = () => {
		closeFiltersModal();
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
			const sorted = sortWorkoutLogsBy(result.logs, "workoutDate:DESC");
			setFilteredLogs(sorted);
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
		<div className={styles.DashboardWorkoutLogs}>
			<div className={styles.DashboardWorkoutLogs_filters}>
				<HistoryFilters
					filterSettings={filterSettings}
					filters={filters}
					workoutLogs={workoutLogs}
					filteredLogs={filteredLogs}
					clearFilters={clearFilters}
					toggleTodayFilter={toggleTodayFilter}
					openFiltersModal={openFiltersModal}
				/>
			</div>
			<div className={styles.DashboardWorkoutLogs_search}>
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
			<div className={styles.DashboardWorkoutLogs_list}>
				{isLoading && (
					<div className={styles.DashboardWorkoutLogs_list_loading}>
						<Loader>Loading workout logs...please wait..</Loader>
					</div>
				)}
				{filteredLogs && <HistoryLogList workoutLogs={filteredLogs} />}
			</div>

			{showFiltersModal && (
				<HistoryFiltersModal closeModal={closeFiltersModal}>
					<HistoryFilterOptions
						values={filterSettings}
						handleQuickFilter={handleQuickFilter}
						handleFilter={handleFilter}
						handleDate={handleDate}
						handleMonth={handleMonth}
						handleQuarter={handleQuarter}
						closeModal={closeFiltersModal}
					/>
					<ModalFooter onConfirm={saveFilters} onCancel={cancelFilters} />
				</HistoryFiltersModal>
			)}

			{toaster.isShowing && (
				<Toast desc={toastMsg as string} position="bottom-right" type="info" />
			)}
		</div>
	);
};

export default DashboardWorkoutLogs;
