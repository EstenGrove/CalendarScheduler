import { ReactNode } from "react";
import styles from "../../css/ui/Loader.module.scss";

type Props = {
	children?: ReactNode;
};

const Loader = ({ children }: Props) => {
	return (
		<div className={styles.Loader}>
			<div className={styles.ripple}>
				<div></div>
				<div></div>
			</div>
			<div className={styles.Loader_inner}>{children}</div>
		</div>
	);
};

export default Loader;
