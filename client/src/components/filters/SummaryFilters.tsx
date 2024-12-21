import { useRef } from "react";
import styles from "../../css/filters/SummaryFilters.module.scss";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useBackgroundBlur } from "../../hooks/useBackgroundBlur";

type Props = {
	close: () => void;
};

const SummaryFilters = ({ close }: Props) => {
	const elRef = useRef<HTMLDivElement>(null);
	useOutsideClick(elRef, close);
	useBackgroundBlur();

	return (
		<div ref={elRef} className={styles.SummaryFilters}>
			{/*  */}
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default SummaryFilters;
