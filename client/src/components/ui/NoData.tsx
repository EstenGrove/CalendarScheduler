import styles from "../../css/ui/NoData.module.scss";
import NoDataFound from "../layout/NoDataFound";
import sprite from "../../assets/icons/calendar.svg";
import { ReactNode } from "react";

type Props = {
	icon?: string;
	msg?: string;
	children?: ReactNode;
};

const icons = {
	calendar: "event_busy",
	sync: "sync_problem",
	exclaim: "priority_high",
	info: "info_outline",
	archive: "all_inbox",
} as const;

const NoData = ({
	icon = "archive",
	msg = "No data found.",
	children,
}: Props) => {
	const iconKey: string = icons?.[icon as keyof object];

	return (
		<NoDataFound>
			<div className={styles.NoData}>
				<svg className={styles.NoData_icon}>
					<use xlinkHref={`${sprite}#icon-${iconKey}`}></use>
				</svg>
				<span>{children ? children : msg}</span>
			</div>
		</NoDataFound>
	);
};

export default NoData;
