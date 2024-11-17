import { ReactNode } from "react";
import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/shared/Modal.module.scss";

type Props = { title: string; children?: ReactNode; closeModal: () => void };

const Modal = ({ title, children, closeModal }: Props) => {
	return (
		<div className={styles.Modal}>
			<div className={styles.Modal_top}>
				<h2 className={styles.Modal_top_title}>{title}</h2>
				<svg onClick={closeModal} className={styles.Modal_top_close}>
					<use xlinkHref={`${sprite}#icon-clear`}></use>
				</svg>
			</div>
			<div className={styles.Modal_inner}>{children}</div>
		</div>
	);
};

export default Modal;
