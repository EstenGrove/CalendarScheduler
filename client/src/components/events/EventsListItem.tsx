import { NavLink } from "react-router-dom";
import { CalendarEvent } from "../../features/events/types";
import styles from "../../css/events/EventsListItem.module.scss";
import { addEllipsis } from "../../utils/utils_misc";

type Props = {
	eventItem: CalendarEvent;
	onSelect: () => void;
};

const EventsListItem = ({ eventItem, onSelect }: Props) => {
	const eventTitle: string = addEllipsis(eventItem.title, 30);
	const eventDesc: string = addEllipsis(eventItem.desc, 40);
	const tagColor: string = eventItem.tagColor || "var(--blueGrey800)";
	const css = {
		borderLeft: `3px solid ${tagColor}`,
	};

	return (
		<NavLink to={`${eventItem.eventID}`} className={styles.ItemWrapper}>
			<div className={styles.EventsListItem} style={css} onClick={onSelect}>
				<div className={styles.EventsListItem_info}>
					<div className={styles.EventsListItem_info_title}>{eventTitle}</div>
					<div className={styles.EventsListItem_info_desc}>{eventDesc}</div>
				</div>
				<div className={styles.EventsListItem_times}>
					<div className={styles.EventsListItem_times_start}>
						{eventItem.startTime || "all-day"}
					</div>
					<div className={styles.EventsListItem_times_end}>
						{eventItem.endTime || "all-day"}
					</div>
				</div>
			</div>
		</NavLink>
	);
};

export default EventsListItem;
