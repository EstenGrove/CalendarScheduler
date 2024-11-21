import styles from "../../css/events/EventDetailsOptions.module.scss";
import TextInput from "../shared/TextInput";
import { CreateEventVals } from "../../utils/utils_options";
import TextArea from "../shared/TextArea";

type Props = {
	values: CreateEventVals;
	handleChange: (name: string, value: string) => void;
};

const EventDetailsOptions = ({ values, handleChange }: Props) => {
	return (
		<div className={styles.EventDetailsOptions}>
			<div className={styles.EventDetailsOptions_field}>
				<label htmlFor="location">Add a location</label>
				<TextInput
					name="location"
					id="location"
					value={values.location}
					onChange={handleChange}
				/>
			</div>
			<div className={styles.EventDetailsOptions_field}>
				<label htmlFor="notes">Add a note</label>
				<TextArea
					name="notes"
					id="notes"
					value={values.notes}
					onChange={handleChange}
				/>
			</div>
			{/*  */}
		</div>
	);
};

export default EventDetailsOptions;
