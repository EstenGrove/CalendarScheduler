import React from "react";
import styles from "../css/pages/DashboardLayout.module.scss";
import PageHeader from "../components/layout/PageHeader";

type Props = {};

const DashboardLayout = ({}: Props) => {
	return (
		<div className={styles.DashboardLayout}>
			<PageHeader title="Dashboard" />
			{/*  */}
			{/*  */}
		</div>
	);
};

export default DashboardLayout;
