import React, { useState } from "react";
import styles from "../../css/shared/MonthPicker.module.scss";
import PickerSelector from "./PickerSelector";

type Props = {
	name: string;
	id?: string;
	value: string;
	onChange: (name: string, value: string) => void;
};

const MonthMenu = () => {
	return (
		<div className={styles.MonthMenu}>
			<div className={styles.MonthMenu_controls}>
				<PickerSelector />
			</div>
		</div>
	);
};

const MonthPicker = ({ name, id, value, onChange }: Props) => {
	const [selection, setSelection] = useState({
		month: new Date().getMonth(),
		year: new Date().getFullYear(),
	});

	return (
		<div className={styles.MonthPicker}>
			{/*  */}
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default MonthPicker;
