import styles from "../../css/health/HealthProfile.module.scss";
import { useSelector } from "react-redux";
import { CurrentUser } from "../../features/user/types";

type Props = {
	currentUser: CurrentUser;
};

// REQUIREMENTS:
// Weight, Height, Age, Stride-Length, Daily Avg. Steps, Avg Calories

const HealthProfile = ({ currentUser }: Props) => {
	// const healthProfile = useSelector()
	return (
		<div className={styles.HealthProfile}>
			<div className={styles.HealthProfile_header}>
				<h2>Hi, {currentUser.firstName}</h2>
			</div>
			<div className={styles.HealthProfile_header}>{/* USER ICON */}</div>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default HealthProfile;
