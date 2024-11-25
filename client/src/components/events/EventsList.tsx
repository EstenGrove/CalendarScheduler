import styles from "../../css/events/EventsList.module.scss";
import sprite from "../../assets/icons/calendar.svg";
import { CalendarEvent } from "../../features/events/types";
import NoDataFound from "../layout/NoDataFound";
import EventsListItem from "./EventsListItem";

type Props = {
	calendarEvents: CalendarEvent[];
	onSelect: (eventItem: CalendarEvent) => void;
};

const EventsList = ({ calendarEvents = [], onSelect }: Props) => {
	return (
		<div className={styles.EventsList}>
			<ul className={styles.EventsList_list}>
				{!calendarEvents ||
					(!calendarEvents.length && (
						<NoDataFound>
							<div className={styles.NoData}>
								<svg className={styles.NoData_icon}>
									<use xlinkHref={`${sprite}#icon-event_busy`}></use>
								</svg>
								<span>No events for this day</span>
							</div>
						</NoDataFound>
					))}
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
