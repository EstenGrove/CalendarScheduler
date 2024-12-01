import { ReactNode } from "react";
import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/ui/ConfirmDialog.module.scss";
import { useBackgroundBlur } from "../../hooks/useBackgroundBlur";

type Props = {
	closeDialog: () => void;
	children?: ReactNode;
	onCancel: () => void;
	onConfirm: () => void;
};

type ButtonProps = {
	onClick: () => void;
};
const CancelButton = ({ onClick }: ButtonProps) => {
	return (
		<button type="button" onClick={onClick} className={styles.CancelButton}>
			Cancel
		</button>
	);
};
const ConfirmButton = ({ onClick }: ButtonProps) => {
	return (
		<button type="button" onClick={onClick} className={styles.ConfirmButton}>
			Confirm
		</button>
	);
};

const ConfirmDialog = ({
	children,
	closeDialog,
	onCancel,
	onConfirm,
}: Props) => {
	useBackgroundBlur();

	return (
		<div className={styles.ConfirmDialog}>
			<div className={styles.ConfirmDialog_top}>
				<svg onClick={closeDialog} className={styles.ConfirmDialog_top_close}>
					<use xlinkHref={`${sprite}#icon-clear`}></use>
				</svg>
			</div>
			<div className={styles.ConfirmDialog_inner}>
				<div className={styles.ConfirmDialog_inner_main}>{children}</div>
			</div>
			<div className={styles.ConfirmDialog_footer}>
				<CancelButton onClick={onCancel} />
				<ConfirmButton onClick={onConfirm} />
			</div>
		</div>
	);
};

export default ConfirmDialog;
