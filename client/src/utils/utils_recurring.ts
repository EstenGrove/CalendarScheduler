import { CalendarEventSchedule } from "../features/events/types";

// Descriptions map for 'nth' (eg 1st, 2nd, 3rd, 4th, etc...)
const numsMap = {
	1: "st",
	2: "nd",
	3: "rd",
};

const getRepeatByFreq = (schedule: CalendarEventSchedule) => {
	const { frequency, interval, byDay, byMonthDay, byMonth } = schedule;
	const suffix: string = interval > 1 ? "s" : "";

	switch (frequency) {
		case "Daily": {
			const desc: string = "Repeats every " + interval + " day" + suffix;
			return desc;
		}
		case "Weekly": {
			let desc: string = "Repeats every " + interval + " week" + suffix;
			desc += " on " + byDay.join(", ");
			return desc;
		}
		case "Monthly": {
			const nthSuffix: string =
				byMonthDay in numsMap ? numsMap[byMonthDay as keyof object] : "th";
			let desc: string = "Repeats every " + interval + " month" + suffix;
			desc += " on the " + byMonthDay + nthSuffix + " of the month";
			return desc;
		}
		case "Yearly": {
			const nthSuffix: string =
				byMonth in numsMap ? numsMap[byMonth as keyof object] : "th";

			let desc: string = "Repeats every " + interval + " year" + suffix;
			desc += " on the " + byMonth + nthSuffix;
			return desc;
		}
		default:
			return "";
	}
};

export { getRepeatByFreq };
