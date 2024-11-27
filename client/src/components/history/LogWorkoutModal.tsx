import { useRef } from "react";
import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/history/LogWorkoutModal.module.scss";
import { CurrentUser } from "../../features/user/types";
import { useBackgroundBlur } from "../../hooks/useBackgroundBlur";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import LogWorkout from "./LogWorkout";

type Props = {
	currentUser: CurrentUser;
	closeModal: () => void;
};

const LogWorkoutModal = ({ currentUser, closeModal }: Props) => {
	const modalRef = useRef<HTMLElement>(null);
	useOutsideClick(modalRef, closeModal);
	useBackgroundBlur();
	useLockBodyScroll();

	return (
		<aside ref={modalRef} className={styles.LogWorkoutModal}>
			<div className={styles.LogWorkoutModal_header}>
				<div className={styles.LogWorkoutModal_header_title}>
					<svg className={styles.LogWorkoutModal_header_title_icon}>
						<use xlinkHref={`${sprite}#icon-fact_check`}></use>
					</svg>
					<h3>Log a Workout</h3>
				</div>
				<svg
					onClick={closeModal}
					className={styles.LogWorkoutModal_header_close}
				>
					<use xlinkHref={`${sprite}#icon-clear`}></use>
				</svg>
			</div>
			<div className={styles.LogWorkoutModal_steps}>
				<LogWorkout currentUser={currentUser} closeModal={closeModal} />
			</div>
			{/*  */}
			{/*  */}
			{/*  */}
		</aside>
	);
};

export default LogWorkoutModal;
