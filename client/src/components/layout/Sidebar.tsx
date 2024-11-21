import React from "react";
import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/layout/Sidebar.module.scss";
import { NavLink } from "react-router-dom";

type Props = {};

const Sidebar = ({}: Props) => {
	return (
		<aside className={styles.Sidebar}>
			<ul className={styles.Sidebar_list}>
				<li className={styles.Sidebar_list_item}>
					<NavLink to="">
						<svg className={styles.Sidebar_list_item_icon}>
							<use xlinkHref={`${sprite}#icon-view_compact`}></use>
						</svg>
					</NavLink>
				</li>
				<li className={styles.Sidebar_list_item}>
					<NavLink to="calendar">
						<svg className={styles.Sidebar_list_item_icon}>
							<use xlinkHref={`${sprite}#icon-event_note`}></use>
						</svg>
					</NavLink>
				</li>
				<li className={styles.Sidebar_list_items}>
					<NavLink to="summary">
						<svg className={styles.Sidebar_list_item_icon}>
							<use xlinkHref={`${sprite}#icon-ballot`}></use>
						</svg>
					</NavLink>
				</li>
				<li className={styles.Sidebar_list_items}>
					<NavLink to="workouts">
						<svg className={styles.Sidebar_list_item_icon}>
							<use xlinkHref={`${sprite}#icon-fitness_center`}></use>
						</svg>
					</NavLink>
				</li>
				<li className={styles.Sidebar_list_items}>
					<NavLink to="completed">
						<svg className={styles.Sidebar_list_item_icon}>
							<use xlinkHref={`${sprite}#icon-done_all`}></use>
						</svg>
					</NavLink>
				</li>
				<li className={styles.Sidebar_list_items}>
					<NavLink to="upcoming">
						<svg className={styles.Sidebar_list_item_icon}>
							<use xlinkHref={`${sprite}#icon-notifications_none`}></use>
						</svg>
					</NavLink>
				</li>
				<li className={styles.Sidebar_list_items}>
					<NavLink to="history">
						<svg className={styles.Sidebar_list_item_icon}>
							<use xlinkHref={`${sprite}#icon-inventory`}></use>
						</svg>
					</NavLink>
				</li>
			</ul>
			{/*  */}
			{/*  */}
			{/*  */}
		</aside>
	);
};

export default Sidebar;
