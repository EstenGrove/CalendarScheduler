import styles from "../../css/pomodoro/PomodoroModal.module.scss";
import { CurrentUser } from "../../features/user/types";

type Props = {
	currentUser: CurrentUser;
	closeModal: () => void;
};

const PomodoroModal = ({ currentUser, closeModal }: Props) => {
	return (
		<div className={styles.PomodoroModal}>
			<div className={styles.PomodoroModal_top}>
				<h3>Pomodoro Timer</h3>
			</div>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default PomodoroModal;
