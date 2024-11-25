import { ReactNode } from "react";
import styles from "../../css/layout/PageNav.module.scss";
import { NavLink } from "react-router-dom";

type NavButtonProps = {
	to: string;
	children?: ReactNode;
};

const isActiveRoute = ({ isActive }: { isActive: boolean }) => {
	if (isActive) {
		return `${styles.PageNavButton} ${styles.isActive}`;
	} else {
		return styles.PageNavButton;
	}
};

const PageNavButton = ({ to, children }: NavButtonProps) => {
	return (
		<NavLink to={to} className={isActiveRoute}>
			{children}
		</NavLink>
	);
};

type Props = { children: ReactNode };

const PageNav = ({ children }: Props) => {
	return (
		<div className={styles.PageNav}>
			<div className={styles.PageNav_inner}>
				{children}
				{/*  */}
			</div>
		</div>
	);
};

export { PageNav, PageNavButton };
