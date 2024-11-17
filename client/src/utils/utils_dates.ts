import { format } from "date-fns";

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
	};
	time: {
		short: string;
		long: string;
		mil: string;
	};
	datetime: {
		short: string;
		long: string;
		full: string;
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
	},
	time: {
		short: "h:m a",
		long: "hh:mm a",
		mil: "HH:mm a",
	},
	datetime: {
		short: "M/d/yy h:m a",
		long: "MM/dd/yyyy hh:mm a",
		full: "MMMM do, yyyy hh:mm a",
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
	const formatted = format(date, formatToken);

	return formatted;
};

const formatDateTime = (
	date: Date | string,
	formatToken: keyof DateFormats["datetime"] = "long"
) => {
	const formatted = format(date, formatToken);

	return formatted;
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
};
