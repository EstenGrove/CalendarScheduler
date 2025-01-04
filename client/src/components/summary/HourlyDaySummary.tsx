import React from "react";
import styles from "../../css/summary/HourlyDaySummary.module.scss";

type Props = {
	data: DiffHour[];
};

interface DiffHour {
	hour: number;
	value: number;
}

// REQUIREMENTS:
// - Shows summary for a single day separated by 4 groups of 6 hours equaling 24 total hours.
type HourRangeBarProps = {
	value: number;
};

const dayMinsRange = {
	min: 0,
	max: 180, // max # of mins to workout a day
	// max: 1440, // # of mins in a day
	// max: 1080, // 18 hrs in mins
};

const getHeightFromValue = (valueInMins: number = 0) => {
	const percentage = valueInMins / dayMinsRange.max;

	return percentage * 600;
	// return percentage * 7000;
};

const HourRangeBar = ({ value }: HourRangeBarProps) => {
	const height: number = getHeightFromValue(value);
	const css = {
		height: height + "%",
		minHeight: height + "%",
		maxHeight: height + "%",
	};
	return (
		<div className={styles.WeekDayBar}>
			<div className={styles.WeekDayBar_value} style={css}></div>
		</div>
	);
};

const HourlyDaySummary = ({}: Props) => {
	return (
		<div className={styles.HourlyDaySummary}>
			<div className={styles.HourlyDaySummary_graph}>
				{/*  */}
				{/*  */}
				{/*  */}
			</div>
			<div className={styles.HourlyDaySummary_labels}>
				{/*  */}
				{/*  */}
				{/*  */}
			</div>
		</div>
	);
};

export default HourlyDaySummary;
