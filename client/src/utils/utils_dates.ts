import { format, formatDistanceToNow, parse } from "date-fns";

export interface DateRange {
	start: Date | string;
	end: Date | string;
}

const getMonthFromIdx = (month: number) => {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const targetMonth = months[month];

	return targetMonth;
};

export interface DateFormats {
	date: {
		short: string;
		long: string;
		full: string;
		fullMonth: string;
		db: string;
		input: string;
		shortMonth: string;
		month: string;
	};
	time: {
		short: string;
		long: string;
		mil: string;
		db: string;
	};
	datetime: {
		short: string;
		long: string;
		full: string;
		db: string;
	};
}

const FORMAT_TOKENS: DateFormats = {
	date: {
		short: "M/d/yy",
		long: "MM/dd/yyyy",
		full: "MMMM do, yyyy",
		fullMonth: "MMMM do",
		db: "yyyy-MM-dd",
		input: "yyyy-MM-dd",
		shortMonth: "MMM do, yyyy",
		month: "MMM",
	},
	time: {
		short: "h:m a",
		long: "hh:mm a",
		mil: "HH:mm a",
		db: "HH:mm",
	},
	datetime: {
		short: "M/d/yy h:m a",
		long: "MM/dd/yyyy hh:mm a",
		full: "MMMM do, yyyy hh:mm a",
		db: "yyyy-MM-dd HH:mm",
	},
};
const {
	date: DATE_TOKENS,
	time: TIME_TOKENS,
	datetime: DATETIME_TOKENS,
} = FORMAT_TOKENS;

const formatDate = (
	date: Date | string,
	formatToken: keyof DateFormats["date"] = "long"
): string => {
	const token = DATE_TOKENS[formatToken];
	const formatted = format(date, token);

	return formatted;
};

const formatTime = (
	date: Date | string,
	formatToken: keyof DateFormats["time"] = "long"
) => {
	const token = TIME_TOKENS[formatToken];
	const formatted = format(date, token);

	return formatted;
};

const formatDateTime = (
	date: Date | string,
	formatToken: keyof DateFormats["datetime"] = "db"
) => {
	const token = DATETIME_TOKENS[formatToken];
	console.log("token", token);
	const formatted = format(date, token);

	return formatted;
};

// Parses => '2024-11-22' & converts to a real date w/ a given format
const parseDateTime = (
	dateStr: string,
	formatToken: keyof DateFormats["datetime"] = "db"
) => {
	const token = DATETIME_TOKENS[formatToken];
	const parsedDate = parse(dateStr, token, new Date());

	return parsedDate;
};

const getDistanceToNow = (date: Date | string) => {
	const distance = formatDistanceToNow(date);

	return distance;
};

export {
	FORMAT_TOKENS,
	DATE_TOKENS,
	TIME_TOKENS,
	DATETIME_TOKENS,
	getMonthFromIdx,
	formatDate,
	formatTime,
	formatDateTime,
	parseDateTime,
	getDistanceToNow,
};
