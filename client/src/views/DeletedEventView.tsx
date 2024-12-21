import { ReactNode } from "react";
import styles from "../css/views/DeletedEventView.module.scss";

type Props = {
	children?: ReactNode;
};

const DeletedEventView = ({ children }: Props) => {
	return (
		<div className={styles.DeletedEventView}>
			<h2 className={styles.DeletedEventView_title}>This event was deleted</h2>
			<div className={styles.DeletedEventView_inner}>{children}</div>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default DeletedEventView;
