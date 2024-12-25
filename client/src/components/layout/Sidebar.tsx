import sprite from "../../assets/icons/calendar2.svg";
import styles from "../../css/layout/Sidebar.module.scss";
import { NavLink } from "react-router-dom";
import { CurrentUser } from "../../features/user/types";
import { addEllipsis } from "../../utils/utils_misc";
import { useState } from "react";

type Props = {
	currentUser: CurrentUser;
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

type ItemProps = {
	to: string;
	icon: string;
	label: string;
};
const Item = ({ to = "", icon, label = "" }: ItemProps) => {
	const tooltip = addEllipsis(label, 25);
	const [showTooltip, setShowTooltip] = useState(false);

	return (
		<li
			className={styles.Sidebar_list_item}
			onMouseEnter={() => setShowTooltip(true)}
			onMouseLeave={() => setShowTooltip(false)}
		>
			<NavLink to={to}>
				<svg className={styles.Sidebar_list_item_icon}>
					<use xlinkHref={`${sprite}#icon-${icon}`}></use>
				</svg>
			</NavLink>

			{showTooltip && (
				<div className={styles.Sidebar_list_item_tooltip}>
					<div>{tooltip}</div>
				</div>
			)}
		</li>
	);
};

const Sidebar = ({ currentUser }: Props) => {
	return (
		<aside className={styles.Sidebar}>
			<ul className={styles.Sidebar_list}>
				<Item to="" icon="view_compact" label="Dashboard" />
				<Item to="calendar" icon="event_note" label="Calendar" />
				<Item to="summary/week" icon="equalizer" label="Summary" />
				<Item to="workouts/week" icon="fitness_center" label="Workouts" />
				<Item to="completed" icon="done_all" label="Completed" />
				<Item to="health" icon="favorite_outline" label="Health Profile" />
			</ul>
			<ul className={styles.Sidebar_bottom}>
				<li className={styles.Sidebar_bottom_items}>
					<NavLink to="settings">
						<svg className={styles.Sidebar_bottom_items_icon}>
							<use xlinkHref={`${sprite}#icon-settings`}></use>
						</svg>
					</NavLink>
				</li>
				<UserAvatar user={currentUser} />
			</ul>
		</aside>
	);
};

export default Sidebar;
