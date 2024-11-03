import { ReactNode } from "react";
import styles from "../../css/calendar/MobileCalendarWeek.module.scss";

type Props = { weekIdx: number; children?: ReactNode };

const MobileCalendarWeek = ({ weekIdx, children }: Props) => {
	return (
		<div className={styles.MobileCalendarWeek} data-week-idx={weekIdx}>
			<div className={styles.MobileCalendarWeek_inner}>{children}</div>
		</div>
	);
};

export default MobileCalendarWeek;
