import React from "react";
import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/layout/Navbar.module.scss";
import { NavLink } from "react-router-dom";
import { CurrentUser } from "../../features/user/types";

type Props = { currentUser: CurrentUser };

const isActiveRoute = ({ isActive }: { isActive: boolean }) => {
	if (isActive) {
		return `${styles.Navbar_list_item} ${styles.isActive}`;
	} else {
		return styles.Navbar_list_item;
	}
};

const Navbar = ({ currentUser }: Props) => {
	return (
		<nav className={styles.Navbar}>
			<div className={styles.Navbar_list}>
				<div className={styles.Navbar_list_item}>
					<svg className={styles.Navbar_list_item_icon}>
						<use xlinkHref={`${sprite}#icon-apps`}></use>
					</svg>
				</div>
			</div>
			<ul className={styles.Navbar_settings}>
				<li className={styles.Navbar_settings_item}>
					<NavLink to="settings" className={isActiveRoute}>
						<svg className={styles.Navbar_settings_item_icon}>
							<use xlinkHref={`${sprite}#icon-settings`}></use>
						</svg>
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
