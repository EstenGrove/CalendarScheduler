import { useEffect, useState } from "react";
import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/ui/Toast.module.scss";
import { addEllipsis } from "../../utils/utils_misc";

type ToastPosition =
	| "top-right"
	| "top-left"
	| "top-middle"
	| "bottom-left"
	| "bottom-right"
	| "bottom-middle";
type ToastType = "info" | "success" | "warning" | "error" | "custom";

type Props = {
	title?: string;
	desc?: string;
	type?: ToastType;
	position?: ToastPosition;
	timeToShow?: number;
	showToast?: boolean;
};
type ToastProps = {
	title?: string;
	desc?: string;
};

const messages: Record<string, { title: string; desc: string }> = {
	info: {
		title: "Info",
		desc: "An action was attempted",
	},
	error: {
		title: "Error",
		desc: "There was an error",
	},
	warning: {
		title: "Warning",
		desc: "Something changed. Please be aware.",
	},
	success: {
		title: "Success",
		desc: "This action was completed successfully.",
	},
};

const InfoToast = ({ title = "Info", desc }: ToastProps) => {
	return (
		<div className={styles.Info}>
			<div className={styles.Info_left}>
				<svg className={styles.Info_left_icon}>
					<use xlinkHref={`${sprite}#icon-info_outline`}></use>
				</svg>
			</div>
			<div className={styles.Info_main}>
				<div className={styles.Info_main_title}>{title}</div>
				<div className={styles.Info_main_desc}>{desc}</div>
			</div>
		</div>
	);
};
const ErrorToast = ({ title = "Error", desc }: ToastProps) => {
	return (
		<div className={styles.Error}>
			<div className={styles.Error_left}>
				<svg className={styles.Error_left_icon}>
					<use xlinkHref={`${sprite}#icon-error_outline`}></use>
				</svg>
			</div>
			<div className={styles.Error_main}>
				<div className={styles.Error_main_title}>{title}</div>
				<div className={styles.Error_main_desc}>{desc}</div>
			</div>
		</div>
	);
};
const WarningToast = ({ title = "Warning", desc }: ToastProps) => {
	return (
		<div className={styles.Warning}>
			<div className={styles.Warning_left}>
				<svg className={styles.Warning_left_icon}>
					<use xlinkHref={`${sprite}#icon-warning`}></use>
				</svg>
			</div>
			<div className={styles.Warning_main}>
				<div className={styles.Warning_main_title}>{title}</div>
				<div className={styles.Warning_main_desc}>{desc}</div>
			</div>
		</div>
	);
};
const SuccessToast = ({ title = "Success", desc }: ToastProps) => {
	return (
		<div className={styles.Success}>
			<div className={styles.Success_left}>
				<svg className={styles.Success_left_icon}>
					<use xlinkHref={`${sprite}#icon-check_circle`}></use>
				</svg>
			</div>
			<div className={styles.Success_main}>
				<div className={styles.Success_main_title}>{title}</div>
				<div className={styles.Success_main_desc}>{desc}</div>
			</div>
		</div>
	);
};

const getPositionClass = (position: ToastPosition) => {
	return `${styles[position]}`;
};

const getTitle = (title: string | undefined, type: ToastType) => {
	if (!title) {
		const fallbackTitle = messages[type as keyof object].title;
		return fallbackTitle;
	} else {
		return addEllipsis(title, 70);
	}
};
const getDesc = (desc: string | undefined, type: ToastType) => {
	if (!desc) {
		const fallbackDesc = messages[type as keyof object].desc;
		return fallbackDesc;
	} else {
		return addEllipsis(desc, 85);
	}
};

const Toast = ({
	title,
	desc,
	position = "top-right",
	type = "info",
	timeToShow = 5000,
}: Props) => {
	const [isShowing, setIsShowing] = useState(true);
	const positionClass = getPositionClass(position);
	const mergedClasses = `${styles.Toast} ${positionClass}`;
	const newTitle = getTitle(title, type);
	const newDesc = getDesc(desc, type);

	const close = () => {
		setIsShowing(false);
	};

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		let timerID: ReturnType<typeof setTimeout>;

		if (isShowing) {
			timerID = setTimeout(() => {
				setIsShowing(false);
			}, timeToShow);
		}

		return () => {
			isMounted = false;
			clearTimeout(timerID);
		};
	}, [isShowing, timeToShow]);

	if (!isShowing) {
		return null;
	}
	return (
		<div className={mergedClasses}>
			{type === "info" && <InfoToast title={newTitle} desc={newDesc} />}
			{type === "error" && <ErrorToast title={newTitle} desc={newDesc} />}
			{type === "success" && <SuccessToast title={newTitle} desc={newDesc} />}
			{type === "warning" && <WarningToast title={newTitle} desc={newDesc} />}

			<div className={styles.Toast_close}>
				<svg className={styles.Toast_close_icon} onClick={close}>
					<use xlinkHref={`${sprite}#icon-clear`}></use>
				</svg>
			</div>
		</div>
	);
};

export default Toast;
