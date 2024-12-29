import React from "react";
import styles from "../../css/recents/RecentActivitySummary.module.scss";
import { CurrentUser } from "../../features/user/types";

type Props = {
	currentUser: CurrentUser;
};

const RecentActivitySummary = ({ currentUser }: Props) => {
	return (
		<div className={styles.RecentActivitySummary}>
			<div className={styles.RecentActivitySummary_top}>
				<h3 className={styles.RecentActivitySummary_top_title}>
					Recent Activity
				</h3>
			</div>
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default RecentActivitySummary;
