import React, { ChangeEvent } from "react";
import styles from "../../css/shared/RadioButton.module.scss";

type Props = {
	name: string;
	id: string;
	value: boolean;
	label: string;
	onChange: (name: string, value: boolean) => void;
	onGroupChange: (name: string, value: boolean) => void;
};

const RadioButton = ({
	label,
	name,
	id,
	value,
	onChange,
	onGroupChange,
}: Props) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;

		return onChange(name, checked);
	};

	const handleGroupSelection = () => {
		if (onGroupChange) {
			return onGroupChange(name, true);
		}
	};

	return (
		<div className={styles.RadioButton}>
			<input
				type="radio"
				name={name}
				id={id}
				checked={value}
				onChange={handleChange}
				onClick={handleGroupSelection}
				className="RadioButton"
			/>
			<label htmlFor={id} className={styles.RadioButton_label}>
				{label}
			</label>
		</div>
	);
};

export default RadioButton;
