import { ChangeEvent, FocusEvent, ComponentPropsWithoutRef } from "react";
import styles from "../../css/shared/TimeInput.module.scss";

type InputProps = {
	name: string;
	id?: string;
	value: number | string;
	onChange: (name: string, value: string) => void;
	onFocus?: (e: FocusEvent) => void;
};

// @ts-expect-error: this is fine
interface Props extends InputProps, ComponentPropsWithoutRef<"input"> {}

const TimeInput = ({ name, id, value, onChange, onFocus, ...rest }: Props) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		return onChange && onChange(name, value);
	};

	return (
		<div className={styles.TimeInput}>
			<input
				type="time"
				name={name}
				id={id}
				defaultValue={"01:35 PM"}
				value={value}
				onChange={handleChange}
				onFocus={onFocus}
				className={styles.TimeInput_input}
				{...rest}
			/>
		</div>
	);
};

export default TimeInput;
