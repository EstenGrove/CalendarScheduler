import { parse } from "date-fns";

export interface ConvertTimeArgs {
	formatToken: string;
	baseDate: Date;
}
const defaultOpts = {
	formatToken: "hh:mm a",
	baseDate: new Date(),
};
// Merges a time string (eg. '1:30 PM' to a date => 'Sun Nov 03 2024 13:30:000 GMT-700...')
const convertTimeToDate = (
	time: string,
	options: ConvertTimeArgs = defaultOpts
) => {
	const parsed = parse(time, options.formatToken, options.baseDate);

	return parsed;
};

export { convertTimeToDate };
