import styles from "../../css/calendar/MobileCalendarWeekHeader.module.scss";

const weekDays = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

type DayProps = {
	weekDay: string;
	weekDayIdx: number;
};

const DayLabel = ({ weekDay, weekDayIdx }: DayProps) => {
	const abbrevDay = weekDay.slice(0, 1);
	return (
		<div
			className={styles.DayLabel}
			data-weekday={weekDay}
			data-weekday-idx={weekDayIdx}
		>
			<div className={styles.DayLabel_text}>{abbrevDay}</div>
		</div>
	);
};

const MobileCalendarWeekHeader = () => {
	return (
		<div className={styles.MobileCalendarWeekHeader}>
			<div className={styles.MobileCalendarWeekHeader_inner}>
				{weekDays &&
					weekDays.map((weekDay, idx) => (
						<DayLabel
							key={`${weekDay}-${idx}`}
							weekDay={weekDay}
							weekDayIdx={idx}
						/>
					))}
			</div>
		</div>
	);
};

export default MobileCalendarWeekHeader;
