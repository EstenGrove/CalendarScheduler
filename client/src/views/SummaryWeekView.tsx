import { ReactNode, useState, useEffect } from "react";
import sprite from "../assets/icons/calendar.svg";
import styles from "../css/views/SummaryWeekView.module.scss";
import { isSunday, subDays } from "date-fns";
import { RangeSummary, SummaryWeekData } from "../features/summary/types";
import {
	getDiffWeekRangesFromBase,
	getSummaryByWeek,
} from "../utils/utils_summary";
import { formatDate, getWeekStartAndEnd } from "../utils/utils_dates";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/user/userSlice";
// components
import {
	FiltersButton,
	QuickFilterButton,
	SummaryViewFilters,
} from "../components/filters/SummaryViewFilters";
import Modal from "../components/shared/Modal";
import DiffSummary from "../components/summary/DiffSummary";
import DiffWeekSummary from "../components/summary/DiffWeekSummary";
import WeekStreak from "../components/summary/WeekStreak";
import { useAppDispatch } from "../store/store";
import { fetchSummaryByWeek } from "../features/summary/operations";
import {
	selectSummaryByWeek,
	SummarySlice,
} from "../features/summary/summarySlice";
import Loader from "../components/ui/Loader";

type TotalsProps = {
	currentWeek: RangeSummary;
	prevWeek: RangeSummary;
};

const SummaryTotals = ({ currentWeek, prevWeek }: TotalsProps) => {
	const isWeekStart = isSunday(new Date());
	const dateStr = isWeekStart ? "New week" : "";
	return (
		<>
			<DiffSummary
				title="Mins."
				label="mins."
				iconName="time"
				prevValue={prevWeek.totalMins}
				curValue={currentWeek.totalMins}
				date={dateStr}
			/>
			<DiffSummary
				title="Reps"
				label="reps"
				iconName="weight"
				prevValue={prevWeek.totalReps}
				curValue={currentWeek.totalReps}
				date={dateStr}
			/>
			<DiffSummary
				title="Steps"
				label="steps"
				iconName="steps"
				prevValue={prevWeek.totalSteps}
				curValue={currentWeek.totalSteps}
				date={dateStr}
			/>
			<DiffSummary
				title="Miles"
				label="miles"
				iconName="miles"
				prevValue={prevWeek.totalMiles}
				curValue={currentWeek.totalMiles}
				date={dateStr}
			/>
		</>
	);
};

type CardLGProps = {
	title: string;
	children?: ReactNode;
};
const CardLG = ({ title, children }: CardLGProps) => {
	return (
		<div className={styles.CardLG}>
			{/* <div className={styles.CardLG_title}>{title}</div> */}
			<div className={styles.CardLG_inner}>{children}</div>
		</div>
	);
};

type MainCardProps = {
	title: string;
	children?: ReactNode;
	details?: string;
};

const MainCard = ({ title, children, details }: MainCardProps) => {
	const [collapsed, setCollapsed] = useState<boolean>(false);
	const iconCss = {
		transition: "all .3s linear",
		transform: collapsed ? "rotate(-90deg)" : "initial",
	};

	const toggleCollapse = () => {
		setCollapsed(!collapsed);
	};
	return (
		<div className={styles.MainCard} data-main-collapsed={collapsed}>
			<div className={styles.MainCard_top}>
				<h4 className={styles.MainCard_top_title}>
					<svg className={styles.MainCard_top_title_icon}>
						<use xlinkHref={`${sprite}#icon-history`}></use>
					</svg>
					<span>{title}</span>
				</h4>
				<button
					type="button"
					onClick={toggleCollapse}
					className={styles.MainCard_top_goTo}
				>
					<svg className={styles.MainCard_top_goTo_icon} style={iconCss}>
						<use xlinkHref={`${sprite}#icon-keyboard_arrow_down`}></use>
					</svg>
				</button>
			</div>
			{!collapsed && (
				<div className={styles.MainCard_main}>
					<div className={styles.MainCard_main_graph}>{children}</div>
					<div className={styles.MainCard_main_details}>{details}</div>
				</div>
			)}
		</div>
	);
};

interface Filters {
	startDate: Date | string;
	endDate: Date | string;
}

interface WeeklyMinsData {
	thisWeek: number[];
	lastWeek: number[];
}
const getWeeklyMins = (
	diffSummary: SummarySlice["diffByWeek"]
): WeeklyMinsData => {
	const { currentWeek, prevWeek } = diffSummary;
	const curMins = currentWeek?.dailyMins || [];
	const prevMins = prevWeek?.dailyMins || [];
	const currentWeekMins = curMins.map((day) => day.totalMins);
	const prevWeekMins = prevMins.map((day) => day.totalMins);

	return {
		thisWeek: currentWeekMins,
		lastWeek: prevWeekMins,
	};
};

const SummaryWeekView = () => {
	const dispatch = useAppDispatch();
	const currentUser = useSelector(selectCurrentUser);
	const diffSummary = useSelector(selectSummaryByWeek);
	const weeklyMins = getWeeklyMins(diffSummary);
	const curTotals = diffSummary.currentWeek?.rangeTotals as RangeSummary;
	const prevTotals = diffSummary.prevWeek?.rangeTotals as RangeSummary;
	const [showFilters, setShowFilters] = useState(false);
	const range = getWeekStartAndEnd(new Date());
	const [filters, setFilters] = useState<Filters>(range);

	console.log("diffSummary", diffSummary);

	const getFilteredWeekly = () => {
		// fetch data
	};

	const openFilters = () => {
		setShowFilters(true);
	};
	const closeFilters = () => {
		setShowFilters(false);
	};

	// fetch summary week data
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		const getData = async () => {
			const { userID } = currentUser;
			const base = new Date();
			const { currentWeek } = getDiffWeekRangesFromBase(base);
			dispatch(
				fetchSummaryByWeek({
					userID,
					startDate: currentWeek.startDate,
					endDate: currentWeek.endDate,
				})
			);
		};

		if (currentUser) {
			getData();
		}

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (diffSummary.status === "PENDING") {
		return <Loader>Loading...</Loader>;
	}
	return (
		<div className={styles.SummaryWeekView}>
			{diffSummary.currentWeek && (
				<>
					<SummaryViewFilters>
						<QuickFilterButton onClick={getFilteredWeekly}>
							This Week
						</QuickFilterButton>
						<FiltersButton onClick={openFilters}>Filters</FiltersButton>
					</SummaryViewFilters>
					{/* LEFT */}
					<MainCard
						title="Weekly Mins."
						details={"Showing last week & this week"}
					>
						{/* <DiffWeekSummary data={weeklyMins} /> */}
						<DiffWeekSummary />
					</MainCard>
					<CardLG title="Week">
						<SummaryTotals currentWeek={curTotals} prevWeek={prevTotals} />
						{/* <WeekStreak /> */}
					</CardLG>
				</>
			)}

			{showFilters && (
				<Modal title="Filters" closeModal={closeFilters}>
					{/*  */}
					{/*  */}
				</Modal>
			)}
		</div>
	);
};

export default SummaryWeekView;
