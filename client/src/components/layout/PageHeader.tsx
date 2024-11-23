import { ReactNode } from "react";
import styles from "../../css/layout/PageHeader.module.scss";

type Props = { title: string; children?: ReactNode };

const PageHeader = ({ title, children }: Props) => {
	return (
		<div className={styles.PageHeader}>
			<h1 className={styles.PageHeader_title}>{title}</h1>
			<div className={styles.PageHeader_main}>{children}</div>
		</div>
	);
};

export default PageHeader;
