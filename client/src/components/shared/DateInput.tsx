import { ChangeEvent, RefObject } from "react";
import styles from "../../css/shared/DateInput.module.scss";

type DateProps = {
	name: string;
	id?: string;
	value: number | string;
	inputRef?: RefObject<HTMLInputElement>;
	onChange: (name: string, value: string) => void;
};

// @ts-expect-error: this is fine
interface Props extends DateProps, ComponentPropsWithoutRef<"input"> {}

const DateInput = ({ name, id, value, onChange, inputRef, ...rest }: Props) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		return onChange && onChange(name, value);
	};

	return (
		<div className={styles.DateInput}>
			<input
				type="date"
				ref={inputRef}
				name={name}
				id={id}
				value={value}
				onChange={handleChange}
				className={styles.DateInput_input}
				{...rest}
			/>
		</div>
	);
};

export default DateInput;
