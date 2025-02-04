import styles from "../../css/events/CreateEvent.module.scss";
import { useState } from "react";
import { CreateEventVals, WeekDayToken } from "../../utils/utils_options";
import DateInput from "../shared/DateInput";
import TextArea from "../shared/TextArea";
import TextInput from "../shared/TextInput";
import Checkbox from "../shared/Checkbox";
import RecurringOptions from "./RecurringOptions";
import Button from "../shared/Button";
import EventDetailsOptions from "./EventDetailsOptions";
import TimePicker from "../shared/TimePicker";

type Props = {
	values: CreateEventVals;
	handleDays: (day: WeekDayToken) => void;
	handleMonth: (name: string, value: number | string) => void;
	handleChange: (name: string, value: string | number) => void;
	handleCheckbox: (name: string, value: boolean) => void;
	handleFrequency: (name: string, value: string) => void;
	createNewEvent: () => void;
	cancelNewEvent: () => void;
};

const customCSS = {
	cancel: {
		border: "none",
		marginRight: "1rem",
	},
	create: {
		backgroundColor: "var(--accent)",
		color: "#fff",
	},
};

const CreateEvent = ({
	values,
	handleChange,
	handleCheckbox,
	handleDays,
	handleMonth,
	handleFrequency,
	createNewEvent,
	cancelNewEvent,
}: Props) => {
	const [showMore, setShowMore] = useState<boolean>(false);

	console.log("values", values);

	const toggleShowMore = () => {
		setShowMore(!showMore);
	};

	return (
		<div className={styles.CreateEvent}>
			<div className={styles.CreateEvent_field}>
				<label htmlFor="title">Add a title</label>
				<TextInput
					name="title"
					id="title"
					value={values.title}
					onChange={handleChange}
				/>
			</div>
			<div className={styles.CreateEvent_field}>
				<label htmlFor="desc">Add a description (optional)</label>
				<TextArea
					name="desc"
					id="desc"
					value={values.desc}
					onChange={handleChange}
				/>
			</div>

			{/* RECURRING OPTIONS */}
			<div className={styles.CreateEvent_row}>
				<Checkbox
					label="Repeat Event"
					name="isRecurring"
					id="isRecurring"
					value={values.isRecurring}
					onChange={handleCheckbox}
				/>
			</div>
			{values.isRecurring && (
				<div className={styles.CreateEvent_row}>
					<RecurringOptions
						values={values}
						handleDays={handleDays}
						handleMonth={handleMonth}
						handleChange={handleChange}
						handleCheckbox={handleCheckbox}
						handleFrequency={handleFrequency}
					/>
				</div>
			)}

			<div className={styles.CreateEvent_row}>
				<div className={styles.CreateEvent_start}>
					<label htmlFor="startDate">
						{values.isRecurring ? "Start" : "Event"} Date
					</label>
					<DateInput
						name="startDate"
						id="startDate"
						value={values.startDate}
						onChange={handleChange}
					/>
				</div>
				<div className={styles.CreateEvent_start}>
					{values.isRecurring && (
						<>
							<label htmlFor="endDate">End Date</label>
							<DateInput
								name="endDate"
								id="endDate"
								value={values.endDate}
								onChange={handleChange}
							/>
						</>
					)}
				</div>
			</div>
			<div className={styles.CreateEvent_row}>
				<div className={styles.CreateEvent_start}>
					<label htmlFor="startTime">Start Time</label>
					<TimePicker
						name="startTime"
						id="startTime"
						value={values.startTime}
						onChange={handleChange}
						style={{ minWidth: "100%" }}
					/>
				</div>
				<div className={styles.CreateEvent_start}>
					<label htmlFor="endTime">End Time</label>
					<TimePicker
						name="endTime"
						id="endTime"
						value={values.endTime}
						onChange={handleChange}
						style={{ minWidth: "100%" }}
					/>
				</div>
			</div>
			{/* MORE OPTIONS */}
			<div className={styles.CreateEvent_more}>
				<button
					type="button"
					onClick={toggleShowMore}
					className={styles.CreateEvent_more_options}
				>
					{showMore ? "Hide" : "Show"} More options
				</button>
			</div>
			{showMore && (
				<EventDetailsOptions values={values} handleChange={handleChange} />
			)}

			<div className={styles.CreateEvent_actions}>
				<Button style={customCSS.cancel} onClick={cancelNewEvent}>
					Cancel
				</Button>
				<Button style={customCSS.create} onClick={createNewEvent}>
					Create
				</Button>
			</div>
		</div>
	);
};

export default CreateEvent;
