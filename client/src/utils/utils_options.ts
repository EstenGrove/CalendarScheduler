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
	isRecurring: boolean;
	frequency: EventFrequency;
	interval: number;
	byDay: WeekDayToken[];
	byMonthDay: number;
	byMonth: number;
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