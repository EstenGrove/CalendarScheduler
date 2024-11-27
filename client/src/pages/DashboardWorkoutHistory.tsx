import { useState, useEffect } from "react";
import styles from "../css/pages/DashboardWorkoutHistory.module.scss";
import {
	selectIsHistoryLoading,
	selectWorkoutLogs,
} from "../features/workoutHistory/historySlice";
import { WorkoutLogEntry } from "../features/workoutHistory/types";
import { useSelector } from "react-redux";
import HistoryFilters from "../components/history/HistoryFilters";
import HistoryLogList from "../components/history/HistoryLogList";
import { useAppDispatch } from "../store/store";
import {
	getWorkoutHistory,
	LogRange,
} from "../features/workoutHistory/operations";
import { CurrentUser } from "../features/user/types";
import { selectCurrentUser } from "../features/user/userSlice";
import { endOfWeek, startOfWeek } from "date-fns";
import { formatDate } from "../utils/utils_dates";
import HistoryFiltersModal from "../components/history/HistoryFiltersModal";
import Spinner from "../components/ui/Spinner";
import Loader from "../components/ui/Loader";

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

const filterFns = {
	Today: (logs: WorkoutLogEntry[]): WorkoutLogEntry[] => {
		const todaysDate = formatDate(new Date(), "db");
		return logs.filter((log) => {
			const logDate = formatDate(log.date, "db");

			return logDate === todaysDate;
		});
	},
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

	console.log("isLoading", isLoading);

	const selectFilter = (logsFilter: string) => {
		if (filters.includes(logsFilter)) {
			const newFilters = [...filters.filter((name) => name !== logsFilter)];
			setFilters(newFilters);
		} else {
			setFilters([...filters, logsFilter]);
		}
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
					openFiltersModal={openFiltersModal}
					selectFilter={selectFilter}
					filters={filters}
				/>
			</div>
			<div className={styles.DashboardWorkoutHistory_search}>
				<input
					type="text"
					name="searchLogs"
					id="searchLogs"
					className={styles.DashboardWorkoutHistory_search_input}
					placeholder="Search logs..."
				/>
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
					{/*  */}
					{/*  */}
				</HistoryFiltersModal>
			)}
		</div>
	);
};

export default DashboardWorkoutHistory;
