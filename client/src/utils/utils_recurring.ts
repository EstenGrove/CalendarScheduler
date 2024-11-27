import { CalendarEventSchedule } from "../features/events/types";

// Descriptions map for 'nth' (eg 1st, 2nd, 3rd, 4th, etc...)
const numsMap = {
	1: "st",
	2: "nd",
	3: "rd",
	11: "th",
	12: "th",
	13: "th",
	21: "st",
	22: "nd",
	23: "rd",
	31: "st",
};

// 23 => "rd" (eg. "23rd")
const getMonthlySuffix = (dayOfMonth: number): string => {
	if (!dayOfMonth || dayOfMonth === 0 || dayOfMonth === null) return "";

	const lastNum = Number(String(dayOfMonth).slice(-1));

	if (lastNum < 4 && lastNum > 0) {
		const suffix = numsMap[dayOfMonth as keyof object];
		return suffix;
	} else {
		return "th";
	}
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
			const nthSuffix: string = getMonthlySuffix(byMonthDay);
			let desc: string = "Repeats every " + interval + " month" + suffix;
			desc += " on the " + byMonthDay + nthSuffix + " of the month";
			return desc;
		}
		case "Yearly": {
			const nthSuffix: string = getMonthlySuffix(byMonth);
			let desc: string = "Repeats every " + interval + " year" + suffix;
			desc += " on the " + byMonth + nthSuffix;
			return desc;
		}
		default:
			return "";
	}
};

export { getRepeatByFreq, getMonthlySuffix };
