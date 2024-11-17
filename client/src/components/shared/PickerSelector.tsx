import { useState } from "react";
import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/shared/PickerSelector.module.scss";

type Props = {
	name?: string;
	value: string;
	options: string[];
	onChange?: (name: string, value: string) => void;
	enableCycleMode?: boolean; // means we cycle thru instead of hard-stopping at the ends
};

type ButtonProps = {
	onClick: () => void;
	isDisabled: boolean;
};
const PrevButton = ({ onClick, isDisabled = false }: ButtonProps) => {
	return (
		<button
			onClick={onClick}
			type="button"
			className={styles.ArrowButton}
			data-label="Prev"
			disabled={isDisabled}
		>
			<svg className={styles.ArrowButton_icon}>
				<use xlinkHref={`${sprite}#icon-keyboard_arrow_left`}></use>
			</svg>
		</button>
	);
};
const NextButton = ({ onClick, isDisabled = false }: ButtonProps) => {
	return (
		<button
			onClick={onClick}
			type="button"
			className={styles.ArrowButton}
			data-label="Next"
			disabled={isDisabled}
		>
			<svg className={styles.ArrowButton_icon}>
				<use xlinkHref={`${sprite}#icon-keyboard_arrow_left`}></use>
			</svg>
		</button>
	);
};

const PickerSelector = ({
	name = "picker",
	value,
	options = [],
	onChange,
	enableCycleMode = false,
}: Props) => {
	const [currentOption, setCurrentOption] = useState<string>(value);
	const [disabledButtons, setDisabledButtons] = useState({
		prev: false,
		next: false,
	});

	const goToPrev = () => {
		const currentIdx: number = options.findIndex(
			(opt) => opt === currentOption
		);

		if (enableCycleMode) {
			// cycle thru our options instead of stopping at the ends (eg start/end)
			if (currentIdx <= 0) {
				const lastOpt: string = options[options.length - 1];
				setCurrentOption(lastOpt);
				return onChange && onChange(name, lastOpt);
			} else {
				const prevIdx: number = currentIdx - 1;
				const prevOpt: string = options[prevIdx];
				setCurrentOption(prevOpt);
				return onChange && onChange(name, prevOpt);
			}
		} else {
			// don't cycle; stop at the start and end when either is reached
			const prevIdx: number = currentIdx - 1;
			const prevOpt: string = options[prevIdx <= 0 ? 0 : prevIdx];
			setCurrentOption(prevOpt);
			setDisabledButtons({
				...disabledButtons,
				prev: prevIdx === 0,
			});
			return onChange && onChange(name, prevOpt);
		}
	};
	const goToNext = () => {
		const lastIdx: number = options.length - 1;
		const currentIdx: number = options.findIndex(
			(opt) => opt === currentOption
		);

		if (enableCycleMode) {
			if (currentIdx >= lastIdx) {
				const firstOpt: string = options[0];
				setCurrentOption(firstOpt);
				return onChange && onChange(name, firstOpt);
			} else {
				const nextIdx: number = currentIdx + 1;
				const nextOpt: string = options[nextIdx];
				setCurrentOption(nextOpt);
				return onChange && onChange(name, nextOpt);
			}
		} else {
			const nextIdx: number = currentIdx + 1;
			const nextOpt: string = options[nextIdx >= lastIdx ? lastIdx : nextIdx];
			setDisabledButtons({
				...disabledButtons,
				next: nextIdx === lastIdx,
			});
			return onChange && onChange(name, nextOpt);
		}
	};

	return (
		<div className={styles.PickerSelector}>
			<PrevButton onClick={goToPrev} isDisabled={disabledButtons.prev} />
			<div className={styles.PickerSelector_selection}>
				<div className={styles.PickerSelector_selection_value}>{value}</div>
			</div>
			<NextButton onClick={goToNext} isDisabled={disabledButtons.next} />
		</div>
	);
};

export default PickerSelector;
