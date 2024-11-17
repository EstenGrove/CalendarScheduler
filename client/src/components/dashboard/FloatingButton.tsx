import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/dashboard/FloatingButton.module.scss";

type Props = {
	onClick: () => void;
};

const FloatingButton = ({ onClick }: Props) => {
	return (
		<button className={styles.FloatingButton} onClick={onClick}>
			<svg className={styles.FloatingButton_icon}>
				<use xlinkHref={`${sprite}#icon-add`}></use>
			</svg>
		</button>
	);
};

export default FloatingButton;
