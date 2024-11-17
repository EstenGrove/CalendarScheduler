import { ChangeEvent, ComponentPropsWithRef, RefObject } from "react";
import styles from "../../css/shared/NumberInput.module.scss";

interface InputProps {
	id?: string;
	name: string;
	value: number;
	onChange: (name: string, value: number) => void;
	inputRef?: RefObject<HTMLInputElement>;
	min?: number;
	max?: number;
}

// @ts-expect-error: Extends input's props to support forwarding via ...rest
interface Props extends InputProps, ComponentPropsWithRef<"input"> {}

const NumberInput = ({
	id,
	name,
	value,
	onChange,
	inputRef,
	min,
	max,
}: Props) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const num: number = Number(value);

		if (min && max) {
			let newVal: number = min;

			if (num < min) {
				newVal = min;
			}
			if (num > max) {
				newVal = max;
			}
			return onChange(name, newVal);
		}

		return onChange && onChange(name, Number(value));
	};

	return (
		<div className={styles.NumberInput}>
			<input
				ref={inputRef}
				type="number"
				name={name}
				id={id}
				value={value}
				onChange={handleChange}
				className={styles.NumberInput_input}
				min={min}
				max={max}
			/>
		</div>
	);
};

export default NumberInput;
