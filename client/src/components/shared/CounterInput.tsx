import React from "react";
import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/shared/CounterInput.module.scss";

type Props = {
	name: string;
	id: string;
	value: number;
	step?: number;
	min?: number;
	max?: number;
	onChange: (name: string, value: number) => void;
};

const CounterInput = ({
	name,
	value,
	min = 0,
	max = 100,
	step = 1,
	onChange,
}: Props) => {
	const isMinusDisabled: boolean = min !== null && value <= (min as number);
	const isPlusDisabled: boolean = !!max && value >= max;

	const decrement = () => {
		const next = value - step;
		const newValue: number = Math.max(next, min);

		return onChange && onChange(name, newValue);
	};
	const increment = () => {
		const next = value + step;
		const newValue: number = Math.min(next, max);

		return onChange && onChange(name, newValue);
	};

	return (
		<div className={styles.CounterInput}>
			<button
				type="button"
				onClick={decrement}
				className={styles.CounterInput_minus}
				disabled={isMinusDisabled}
			>
				<svg className={styles.CounterInput_minus_icon}>
					<use xlinkHref={`${sprite}#icon-remove`}></use>
				</svg>
			</button>
			<div className={styles.CounterInput_value}>
				<div>{value}</div>
			</div>
			<button
				type="button"
				onClick={increment}
				className={styles.CounterInput_add}
				disabled={isPlusDisabled}
			>
				<svg className={styles.CounterInput_add_icon}>
					<use xlinkHref={`${sprite}#icon-add`}></use>
				</svg>
			</button>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default CounterInput;
