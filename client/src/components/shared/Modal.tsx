import { ReactNode, useRef } from "react";
import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/shared/Modal.module.scss";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { useBackgroundBlur } from "../../hooks/useBackgroundBlur";

type Props = { title: string; children?: ReactNode; closeModal: () => void };

const Modal = ({ title, children, closeModal }: Props) => {
	const modalRef = useRef<HTMLDivElement>(null);
	useOutsideClick(modalRef, closeModal);
	useLockBodyScroll();
	useBackgroundBlur();

	return (
		<>
			{/* <div className={styles.Overlay}></div> */}
			<div ref={modalRef} className={styles.Modal}>
				<div className={styles.Modal_top}>
					<h2 className={styles.Modal_top_title}>{title}</h2>
					<svg onClick={closeModal} className={styles.Modal_top_close}>
						<use xlinkHref={`${sprite}#icon-clear`}></use>
					</svg>
				</div>
				<div className={styles.Modal_inner}>{children}</div>
			</div>
		</>
	);
};

export default Modal;
