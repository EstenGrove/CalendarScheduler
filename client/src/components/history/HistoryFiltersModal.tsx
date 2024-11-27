import { ReactNode, useRef } from "react";
import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/history/HistoryFiltersModal.module.scss";
import { useBackgroundBlur } from "../../hooks/useBackgroundBlur";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import DateInput from "../shared/DateInput";

type Props = {
	closeModal: () => void;
	children?: ReactNode;
};

const HistoryFiltersModal = ({ children, closeModal }: Props) => {
	const modalRef = useRef<HTMLDivElement>(null);
	useOutsideClick(modalRef, closeModal);
	useBackgroundBlur();
	useLockBodyScroll();

	return (
		<div ref={modalRef} className={styles.HistoryFiltersModal}>
			<div className={styles.HistoryFiltersModal_top}>
				<h2 className={styles.HistoryFiltersModal_top_title}>Filters</h2>
				<svg
					onClick={closeModal}
					className={styles.HistoryFiltersModal_top_close}
				>
					<use xlinkHref={`${sprite}#icon-clear`}></use>
				</svg>
			</div>
			<div className={styles.HistoryFiltersModal_inner}>
				<div className={styles.HistoryFiltersModal_inner_row}>
					<div className={styles.HistoryFiltersModal_inner_group}>
						<label htmlFor="fromDate">From:</label>
						<DateInput />
					</div>
					<div className={styles.HistoryFiltersModal_inner_group}>
						<label htmlFor="toDate">To:</label>
						<DateInput />
					</div>
				</div>
			</div>
		</div>
	);
};

export default HistoryFiltersModal;
