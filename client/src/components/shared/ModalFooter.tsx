import { ReactNode } from "react";
import styles from "../../css/shared/ModalFooter.module.scss";

type Props = {
	onConfirm?: () => void;
	onCancel?: () => void;
	isConfirming?: boolean;
	children?: ReactNode;
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

const ModalFooter = ({
	onConfirm,
	onCancel,
	isConfirming = false,
	children,
}: Props) => {
	const confirm = () => {
		return onConfirm && onConfirm();
	};
	const cancel = () => {
		return onCancel && onCancel();
	};

	return (
		<section className={styles.ModalFooter}>
			<div className={styles.ModalFooter_inner}>
				{!children && (
					<>
						<CancelButton onClick={cancel} />
						<ConfirmButton onClick={confirm} isConfirming={isConfirming} />
					</>
				)}
				{children && children}
			</div>
		</section>
	);
};

export default ModalFooter;
