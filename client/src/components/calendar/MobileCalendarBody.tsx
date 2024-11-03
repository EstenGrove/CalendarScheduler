import { ReactNode } from "react";
import styles from "../../css/calendar/MobileCalendarBody.module.scss";

type Props = {
	children?: ReactNode;
};

const MobileCalendarBody = ({ children }: Props) => {
	return (
		<div className={styles.MobileCalendarBody}>
			<div className={styles.MobileCalendarBody_inner}>{children}</div>
		</div>
	);
};

export default MobileCalendarBody;
