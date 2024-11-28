import React from "react";
import styles from "../../css/ui/Spinner.module.scss";

type Props = {};

const Spinner = ({}: Props) => {
	return (
		<div className={styles.Spinner}>
			<div className={styles.ripple}>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default Spinner;
