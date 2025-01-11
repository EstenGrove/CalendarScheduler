import { ReactNode } from "react";
import styles from "../../css/ui/FloatingIsland.module.scss";

type Props = {
	isCollapsed?: boolean;
	children?: ReactNode;
};

const FloatingIsland = ({ isCollapsed = false, children }: Props) => {
	const width = {
		width: isCollapsed ? "10rem" : "25rem",
	};
	return (
		<aside
			className={styles.FloatingIsland}
			data-collapse-islan={isCollapsed}
			style={width}
		>
			<div className={styles.FloatingIsland_inner}>{children}</div>
		</aside>
	);
};

export default FloatingIsland;
