import styles from "../../css/events/EventsList.module.scss";
import { CalendarEvent } from "../../features/events/types";
import EventsListItem from "./EventsListItem";

type Props = {
	calendarEvents: CalendarEvent[];
	onSelect: (eventItem: CalendarEvent) => void;
};

const EventsList = ({ calendarEvents = [], onSelect }: Props) => {
	return (
		<div className={styles.EventsList}>
			<ul className={styles.EventsList_list}>
				{calendarEvents &&
					calendarEvents.map((event, idx) => (
						<EventsListItem
							key={idx}
							eventItem={event}
							onSelect={() => onSelect(event)}
						/>
					))}
			</ul>
		</div>
	);
};

export default EventsList;
