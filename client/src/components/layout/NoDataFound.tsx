import { ReactNode } from "react";
import styles from "../../css/layout/NoDataFound.module.scss";

type Props = { children?: ReactNode };

const defaultMsg = <h2 className={styles.DefaultMsg}>No data found.</h2>;

const NoDataFound = ({ children }: Props) => {
	return (
		<div className={styles.NoDataFound}>
			{!children && defaultMsg}
			{children}
		</div>
	);
};

export default NoDataFound;
