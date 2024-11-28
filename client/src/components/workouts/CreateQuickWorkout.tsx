import React from "react";
import styles from "../../css/workouts/CreateQuickWorkout.module.scss";
import TextInput from "../shared/TextInput";
import DateInput from "../shared/DateInput";

type Props = {
	values: {
		name: string;
		desc: string;
		date: string;
		time: string;
		tagColor: string;
	};
	handleChange: (name: string, value: string | number) => void;
	selectTag: (value: string) => void;
};

const tagColors = [
	"var(--accent)",
	"var(--accent-purple)",
	"var(--accent-green)",
	"var(--accent-red)",
];

type TagProps = {
	onClick: () => void;
	color: string;
};
const TagColor = ({ onClick, color }: TagProps) => {
	const css = { backgroundColor: color };
	return <div className={styles.TagColor} onClick={onClick} style={css}></div>;
};

const CreateQuickWorkout = ({ values, handleChange, selectTag }: Props) => {
	return (
		<div className={styles.CreateQuickWorkout}>
			<div className={styles.CreateQuickWorkout_title}>Create a workout</div>
			<div className={styles.CreateQuickWorkout_inner}>
				<div className={styles.CreateQuickWorkout_inner_row}>
					<label htmlFor="name">Name of the workout</label>
					<TextInput
						name="name"
						id="name"
						value={values.name}
						onChange={handleChange}
					/>
				</div>
				<div className={styles.CreateQuickWorkout_inner_row}>
					<label htmlFor="name">Name of the workout</label>
					<DateInput
						name="date"
						id="date"
						value={values.date}
						onChange={handleChange}
					/>
				</div>
				<div className={styles.CreateQuickWorkout_inner_row}>
					{tagColors &&
						tagColors.map((tag, idx) => (
							<TagColor
								key={idx + tag}
								color={tag}
								onClick={() => selectTag(tag)}
							/>
						))}
				</div>
			</div>
		</div>
	);
};

export default CreateQuickWorkout;
