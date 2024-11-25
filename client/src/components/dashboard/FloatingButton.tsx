import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/dashboard/FloatingButton.module.scss";

interface Icons {
	add: "add";
	workout: "fitness_center";
}

const icons: Icons = {
	add: "add",
	workout: "fitness_center",
};

type Props = {
	onClick: () => void;
	icon?: keyof Icons;
};

const FloatingButton = ({ onClick, icon = "add" }: Props) => {
	const iconName: typeof icons = icons[icon as keyof object];
	return (
		<button className={styles.FloatingButton} onClick={onClick}>
			<svg className={styles.FloatingButton_icon}>
				<use xlinkHref={`${sprite}#icon-${iconName}`}></use>
			</svg>
		</button>
	);
};

export default FloatingButton;
