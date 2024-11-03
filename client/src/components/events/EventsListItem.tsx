import { NavLink } from "react-router-dom";
import styles from "../../css/events/EventsListItem.module.scss";
import { CalendarEvent } from "../../features/events/types";

type Props = {
	eventItem: CalendarEvent;
	onSelect: () => void;
};

const EventsListItem = ({ eventItem, onSelect }: Props) => {
	const css = { borderLeft: `3px solid ${eventItem.tagColor}` };

	return (
		<NavLink to={`${eventItem.eventID}`} className={styles.ItemWrapper}>
			<div className={styles.EventsListItem} style={css} onClick={onSelect}>
				<div className={styles.EventsListItem_info}>
					<div className={styles.EventsListItem_info_title}>
						{eventItem.title}
					</div>
					<div className={styles.EventsListItem_info_desc}>
						{eventItem.desc}
					</div>
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
