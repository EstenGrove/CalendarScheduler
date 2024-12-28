import { ReactNode, useState, useEffect } from "react";
import sprite from "../assets/icons/calendar.svg";
import styles from "../css/views/SummaryWeekView.module.scss";
import { subDays } from "date-fns";
import { SummaryWeekData } from "../features/summary/types";
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

type TotalsProps = {
	currentWeek: SummaryWeekData["currentWeek"];
	prevWeek: SummaryWeekData["prevWeek"];
};

const SummaryTotals = ({ currentWeek, prevWeek }: TotalsProps) => {
	return (
		<>
			<DiffSummary
				title="Mins."
				label="mins."
				iconName="time"
				prevValue={17}
				curValue={24}
				// date={subDays(new Date(), 3)}
				// prevValue={prevWeek.totalMins}
				// curValue={currentWeek.totalMins}
			/>
			<DiffSummary
				title="Reps"
				label="reps"
				iconName="weight"
				prevValue={32}
				curValue={18}
				// date={subDays(new Date(), 1)}
				// prevValue={prevWeek.totalReps}
				// curValue={currentWeek.totalReps}
			/>
			<DiffSummary
				title="Steps"
				label="steps"
				iconName="steps"
				prevValue={32}
				curValue={33}
				date={subDays(new Date(), 1)}
				// prevValue={prevWeek.totalSteps}
				// curValue={currentWeek.totalSteps}
			/>
			<DiffSummary
				title="Miles"
				label="miles"
				iconName="miles"
				prevValue={32}
				curValue={46}
				date={subDays(new Date(), 1)}
				// prevValue={prevWeek.totalMiles}
				// curValue={currentWeek.totalMiles}
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

const summaryData = {
	currentWeekTotals: {
		mins: 46,
		reps: 118,
		steps: 2802,
		miles: 6.03,
		dayTotals: [],
		streak: [],
	},
	prevWeekTotals: {
		mins: 15,
		reps: 97,
		steps: 4811,
		miles: 4.03,
		dayTotals: [],
		streak: [],
	},
};

const SummaryWeekView = () => {
	const currentUser = useSelector(selectCurrentUser);
	const [showFilters, setShowFilters] = useState(false);

	const getThisWeek = () => {
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
			const ranges = getDiffWeekRangesFromBase(base);
			console.log("ranges", ranges);
		};

		if (currentUser) {
			getData();
		}

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.SummaryWeekView}>
			<SummaryViewFilters>
				<QuickFilterButton onClick={getThisWeek}>This Week</QuickFilterButton>
				<FiltersButton onClick={openFilters}>Filters</FiltersButton>
			</SummaryViewFilters>
			{/* LEFT */}
			<MainCard title="Weekly Mins." details={"Showing last week & this week"}>
				<DiffWeekSummary />
			</MainCard>
			<CardLG title="Week">
				<SummaryTotals />
				{/* <WeekStreak /> */}
			</CardLG>

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
