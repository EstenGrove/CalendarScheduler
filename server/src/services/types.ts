export type WeekDayToken = "Su" | "Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa";

export type EventFrequency =
	| "Daily"
	| "Weekly"
	| "Monthly"
	| "Yearly"
	| "Custom"
	| "Never";

export interface CreateEventVals {
	title: string;
	desc: string;
	startDate: string;
	endDate: string;
	startTime: string;
	endTime: string;
	isRecurring: boolean;
	frequency: EventFrequency; // 'Daily', 'Weekly', 'Monthly', 'Yearly'
	interval: number; // X => Every X (days|weeks|months|years)
	byDay: WeekDayToken[]; // ['Tu', 'Fr']
	byMonthDay: number; // Day of the month (eg. 16th OR 2nd friday of the month)
	byMonth: number; // Month number (eg 1 => January & 12 => December)
	tagColor: string;
}

const FREQ_OPTIONS = [
	{ label: "Daily", value: "Daily" },
	{ label: "Weekly", value: "Weekly" },
	{ label: "Monthly", value: "Monthly" },
	{ label: "Yearly", value: "Yearly" },
	{ label: "Custom", value: "Custom" },
	{ label: "Never", value: "Never" },
];

export { FREQ_OPTIONS };
