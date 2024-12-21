import { ReactNode, useRef } from "react";
import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/ui/ConfirmDialog.module.scss";
import { useBackgroundBlur } from "../../hooks/useBackgroundBlur";
import { useOutsideClick } from "../../hooks/useOutsideClick";

type Props = {
	closeDialog: () => void;
	children?: ReactNode;
	onCancel: () => void;
	onConfirm: () => void;
	isConfirming?: boolean;
};

type ButtonProps = {
	onClick: () => void;
	isConfirming?: boolean;
};
const CancelButton = ({ onClick }: ButtonProps) => {
	return (
		<button type="button" onClick={onClick} className={styles.CancelButton}>
			Cancel
		</button>
	);
};
const ConfirmButton = ({ onClick, isConfirming }: ButtonProps) => {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={isConfirming}
			className={styles.ConfirmButton}
		>
			{isConfirming ? "Saving..." : "Confirm"}
		</button>
	);
};

const ConfirmDialog = ({
	children,
	closeDialog,
	onCancel,
	onConfirm,
	isConfirming = false,
}: Props) => {
	const modalRef = useRef<HTMLDivElement>(null);
	useOutsideClick(modalRef, closeDialog);
	useBackgroundBlur();

	return (
		<div ref={modalRef} className={styles.ConfirmDialog}>
			<div className={styles.ConfirmDialog_top}>
				<svg onClick={closeDialog} className={styles.ConfirmDialog_top_close}>
					<use xlinkHref={`${sprite}#icon-clear`}></use>
				</svg>
			</div>
			<div className={styles.ConfirmDialog_inner}>
				<div className={styles.ConfirmDialog_inner_main}>{children}</div>
			</div>
			<div className={styles.ConfirmDialog_footer}>
				<CancelButton onClick={onCancel} isConfirming={isConfirming} />
				<ConfirmButton onClick={onConfirm} isConfirming={isConfirming} />
			</div>
		</div>
	);
};

export default ConfirmDialog;
