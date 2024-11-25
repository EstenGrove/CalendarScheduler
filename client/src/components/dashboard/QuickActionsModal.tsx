import { ReactNode } from "react";
import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/dashboard/QuickActionsModal.module.scss";

type Props = {
	title: string;
	children?: ReactNode;
	closeModal: () => void;
};

const QuickActionsModal = ({ title, children, closeModal }: Props) => {
	return (
		<aside className={styles.QuickActionsModal}>
			<div className={styles.QuickActionsModal_top}>
				<h2>{title}</h2>
				<svg onClick={closeModal} className={styles.QuickActionsModal_top_icon}>
					<use xlinkHref={`${sprite}#icon-clear`}></use>
				</svg>
			</div>
			<div className={styles.QuickActionsModal_inner}>{children}</div>
		</aside>
	);
};

export default QuickActionsModal;
