import React, { useState } from "react";
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

type UserAvatarProps = {
	user: CurrentUser;
};
const UserAvatar = ({ user }: UserAvatarProps) => {
	const first = user?.firstName.slice(0, 1) || "N";
	const last = user?.lastName.slice(0, 1) || "A";
	const initial = first + last;

	return (
		<li className={styles.UserAvatar} title={initial}>
			<svg className={styles.UserAvatar_icon}>
				<use xlinkHref={`${sprite}#icon-person`}></use>
			</svg>
		</li>
	);
};

type MenuProps = {
	closeMenu: () => void;
};

const MobileMenu = ({ closeMenu }: MenuProps) => {
	return (
		<div className={styles.MobileMenu}>
			<div className={styles.MobileMenu_top}>
				<h2>Menu.</h2>
				<svg onClick={closeMenu} className={styles.MobileMenu_top_icon}>
					<use xlinkHref={`${sprite}#icon-clear`}></use>
				</svg>
			</div>
			<ul className={styles.MobileMenu_list}>
				<li onClick={closeMenu} className={styles.MobileMenu_list_item}>
					<NavLink to="/dashboard">Dashboard</NavLink>
				</li>
				<li onClick={closeMenu} className={styles.MobileMenu_list_item}>
					<NavLink to="calendar">Calendar</NavLink>
				</li>
				<li onClick={closeMenu} className={styles.MobileMenu_list_item}>
					<NavLink to="workouts/week">Workouts</NavLink>
				</li>
				<li onClick={closeMenu} className={styles.MobileMenu_list_item}>
					<NavLink to="upcoming">Upcoming</NavLink>
				</li>
				<li onClick={closeMenu} className={styles.MobileMenu_list_item}>
					<NavLink to="calendar">Summary</NavLink>
				</li>
				<li onClick={closeMenu} className={styles.MobileMenu_list_item}>
					<NavLink to="completed">Completed</NavLink>
				</li>
			</ul>
		</div>
	);
};

const Navbar = ({ currentUser }: Props) => {
	const [showMenu, setShowMenu] = useState<boolean>(false);

	const openMenu = () => {
		setShowMenu(true);
	};
	const closeMenu = () => {
		setShowMenu(false);
	};

	return (
		<nav className={styles.Navbar}>
			<div className={styles.Navbar_list}>
				<div onClick={openMenu} className={styles.Navbar_list_item}>
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
				<UserAvatar user={currentUser} />
			</ul>

			{showMenu && <MobileMenu closeMenu={closeMenu} />}
		</nav>
	);
};

export default Navbar;
