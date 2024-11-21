import styles from "../../css/events/RecurringDesc.module.scss";
import { CalendarEventSchedule } from "../../features/events/types";
import { isRecurring } from "../../utils/utils_events";
import { getRepeatByFreq } from "../../utils/utils_recurring";

type Props = {
	eventSchedule: CalendarEventSchedule;
};

const RecurringDesc = ({ eventSchedule }: Props) => {
	const { frequency } = eventSchedule;
	const repeatDesc: string = getRepeatByFreq(eventSchedule);

	if (!isRecurring(frequency)) {
		<div className={styles.RecurringDesc}>
			<span>Does not repeat.</span>
		</div>;
	}
	return (
		<div className={styles.RecurringDesc}>
			<div>{repeatDesc}</div>
		</div>
	);
};

export default RecurringDesc;
