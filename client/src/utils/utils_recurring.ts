import { CalendarEventSchedule } from "../features/events/types";
import { formatDate, parseDate } from "./utils_dates";
import { RecurringVals } from "./utils_options";

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

// We need to parse the date string value that comes from the date inputs
// - eg. '2024-11-18' => '11/18/2024' otherwise we're off by one day when it's formatted
const getRepeatDate = (date: string) => {
	const parsed = parseDate(date, "db");
	const formatted = formatDate(parsed, "long");
	return formatted;
};

const getRecurringDesc = (values: RecurringVals) => {
	const {
		startDate,
		endDate,
		frequency,
		interval,
		byDay,
		byMonth,
		byMonthDay,
	} = values;
	const sDate: string = getRepeatDate(startDate);
	const eDate: string = getRepeatDate(endDate);
	const prefix: string = `Repeats every ${interval}`;
	const suffix: string = interval > 1 ? "s" : "";
	const from: string = `from ${sDate}`;
	const until: string = endDate ? `until ${eDate}` : `until cancelled`;

	switch (frequency) {
		case "Daily": {
			const desc: string = `${prefix} day${suffix} ${from} ${until}`;
			return desc;
		}
		case "Weekly": {
			const days: string = byDay.join(", ");
			const desc: string = `${prefix} week${suffix} on ${days} ${from} ${until}`;
			return desc;
		}
		case "Monthly": {
			const nthSuffix: string = getMonthlySuffix(byMonthDay);
			const desc: string = `${prefix} month${suffix} on the ${nthSuffix} of the month ${from} ${until}`;
			return desc;
		}
		case "Yearly": {
			const nthSuffix: string = getMonthlySuffix(byMonth);
			const desc: string = `${prefix} year${suffix} on the ${nthSuffix} ${from} ${until}`;
			return desc;
		}
		case "Custom": {
			return "Custom repeat schedule.";
		}
		case "Never": {
			return "Does not repeat.";
		}
		default:
			return "Does not repeat";
	}
};

export { getRepeatByFreq, getMonthlySuffix, getRecurringDesc, getRepeatDate };
