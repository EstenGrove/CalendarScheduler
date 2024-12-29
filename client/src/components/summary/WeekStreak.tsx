import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/summary/WeekStreak.module.scss";
import { WEEK_DAYS } from "../../utils/utils_dates";
import { getDate, isFuture, isPast } from "date-fns";

interface StreakItem {
	day: Date | string;
	isCompleted: boolean | null;
}

type Props = {
	streakData: Array<StreakItem>;
};

type DayProps = {
	day: Date | string;
	isCompleted: boolean | null;
};

const StreakDay = ({ isCompleted }: DayProps) => {
	if (!isCompleted) {
		return <MissedDay />;
	}
	return (
		<div className={styles.StreakDay}>
			<svg className={styles.StreakDay_icon}>
				<use xlinkHref={`${sprite}#icon-done`}></use>
			</svg>
		</div>
	);
};
const MissedDay = () => {
	return (
		<div className={styles.MissedDay}>
			<svg className={styles.MissedDay_icon}>
				<use xlinkHref={`${sprite}#icon-not_interested`}></use>
			</svg>
		</div>
	);
};
const FutureDay = ({ day }: DayProps) => {
	const date = getDate(day);

	return (
		<div className={styles.FutureDay}>
			<div className={styles.FutureDay_day}>{date}</div>
		</div>
	);
};

const getDayType = (item: StreakItem) => {
	const isFutureDay = isFuture(item.day);
	const isPastDay = isPast(item.day);

	if (isFutureDay) {
		return "Future";
	} else if (isPastDay) {
		return "Past";
	} else {
		return "Today";
	}
};

const Day = ({ day, isCompleted }: DayProps) => {
	const dayType = getDayType({ day, isCompleted });

	return (
		<div className={styles.Day}>
			{dayType === "Past" && <StreakDay day={day} isCompleted={isCompleted} />}
			{dayType === "Future" && (
				<FutureDay day={day} isCompleted={isCompleted} />
			)}
		</div>
	);
};

const dummy: StreakItem[] = [
	{ day: new Date(2024, 11, 22), isCompleted: false },
	{ day: new Date(2024, 11, 23), isCompleted: true },
	{ day: new Date(2024, 11, 24), isCompleted: true },
	{ day: new Date(2024, 11, 25), isCompleted: true },
	{ day: new Date(2024, 11, 26), isCompleted: null },
	{ day: new Date(2024, 11, 27), isCompleted: null },
	{ day: new Date(2024, 11, 28), isCompleted: null },
];

const WeekStreak = ({ streakData = dummy }: Props) => {
	return (
		<div className={styles.WeekStreak}>
			<div className={styles.WeekStreak_labels}>
				{WEEK_DAYS.map((day, idx) => {
					return (
						<div key={idx + day} className={styles.WeekStreak_labels_day}>
							{day.slice(0, 2)}
						</div>
					);
				})}
			</div>
			<div className={styles.WeekStreak_streak}>
				{streakData &&
					streakData.map((day, idx) => {
						return (
							<Day
								key={day.day.toString() + idx}
								day={day.day}
								isCompleted={day.isCompleted}
							/>
						);
					})}
			</div>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default WeekStreak;
