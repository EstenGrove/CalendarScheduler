import styles from "../../css/calendar/MobileCalendarHeader.module.scss";
import sprite from "../../assets/icons/calendar.svg";
import { getMonthFromIdx } from "../../utils/utils_dates";
import { ReactNode } from "react";

type Props = {
	month: number; // zero-based month index
	year: number;
	onPrev: () => void;
	onNext: () => void;
	onToday: () => void;
};

type MonthControlProps = {
	onPrev: () => void;
	onNext: () => void;
	children?: ReactNode;
};

const MonthControls = ({ children, onPrev, onNext }: MonthControlProps) => {
	return (
		<div className={styles.MonthControls}>
			<button type="button" onClick={onPrev} className={styles.PrevButton}>
				<svg className={styles.PrevButton_icon}>
					<use xlinkHref={`${sprite}#icon-keyboard_arrow_left`}></use>
				</svg>
			</button>
			<div className={styles.MonthControls_label}>{children}</div>
			<button type="button" onClick={onNext} className={styles.NextButton}>
				<svg className={styles.NextButton_icon}>
					<use xlinkHref={`${sprite}#icon-keyboard_arrow_right`}></use>
				</svg>
			</button>
		</div>
	);
};

type MonthProps = {
	monthName: string;
};
const Month = ({ monthName }: MonthProps) => {
	const abbrevMonth = monthName.slice(0, 3);
	return <div className={styles.Month}>{abbrevMonth}</div>;
};
type YearProps = {
	year: number;
};
const Year = ({ year }: YearProps) => {
	return <div className={styles.Year}>{year}</div>;
};

type TodayProps = {
	onToday: () => void;
};
const Today = ({ onToday }: TodayProps) => {
	return (
		<div className={styles.Today} onClick={onToday}>
			Today
		</div>
	);
};

const MobileCalendarHeader = ({
	month,
	year,
	onPrev,
	onNext,
	onToday,
}: Props) => {
	const monthName = getMonthFromIdx(month);

	return (
		<div className={styles.MobileCalendarHeader}>
			<div className={styles.MobileCalendarHeader_controls}>
				<MonthControls onPrev={onPrev} onNext={onNext}>
					<Month monthName={monthName} />
					<Year year={year} />
				</MonthControls>
				<Today onToday={onToday} />
			</div>
		</div>
	);
};

export default MobileCalendarHeader;
