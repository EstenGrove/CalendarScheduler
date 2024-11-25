import { ChangeEvent } from "react";
import styles from "../../css/shared/Select.module.scss";

interface SelectOption {
	value: string;
	label: string;
}

type Props = {
	name: string;
	id: string;
	value: string;
	options: SelectOption[];
	onChange: (name: string, value: string) => void;
};

const Select = ({ name, id, value, options, onChange }: Props) => {
	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;

		return onChange && onChange(name, value);
	};

	return (
		<div className={styles.Select}>
			<select
				name={name}
				id={id}
				className={styles.Select_select}
				onChange={handleChange}
				value={value}
			>
				{options &&
					options.map((item, idx) => (
						<option key={item.value + idx} value={item.value}>
							{item.label}
						</option>
					))}
			</select>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default Select;
