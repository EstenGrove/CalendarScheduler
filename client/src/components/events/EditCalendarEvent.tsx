import React from "react";
import styles from "../../css/events/EditCalendarEvent.module.scss";
import TextInput from "../shared/TextInput";
import TextArea from "../shared/TextArea";

type Props = {
	values: EditValues;
	onChange: (name: string, value: string) => void;
};

interface EditValues {
	title: string;
	desc: string;
}

const EditCalendarEvent = ({ values, onChange }: Props) => {
	return (
		<div className={styles.EditCalendarEvent}>
			<div className={styles.EditCalendarEvent_row}>
				<label htmlFor="title">Change Title</label>
				<TextInput
					name="title"
					id="title"
					value={values.title}
					onChange={onChange}
				/>
			</div>
			<div className={styles.EditCalendarEvent_row}>
				<label htmlFor="desc">Change desc</label>
				<TextArea
					name="desc"
					id="desc"
					value={values.desc}
					onChange={onChange}
				/>
			</div>

			{/*  */}
			{/*  */}
		</div>
	);
};

export default EditCalendarEvent;
