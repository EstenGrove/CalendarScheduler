import { ReactNode } from "react";
import styles from "../../css/ui/MultiStepFormStep.module.scss";

type Props = {
	title: string;
	children?: ReactNode;
	isActiveStep: boolean;
	header?: ReactNode;
	footer?: ReactNode;
};

const MultiStepFormStep = ({
	title,
	header,
	footer,
	isActiveStep,
	children,
}: Props) => {
	if (!isActiveStep) {
		return null;
	}
	return (
		<div className={styles.MultiStepFormStep}>
			{!!header && (
				<div className={styles.MultiStepFormStep_header}>{header}</div>
			)}
			<div className={styles.MultiStepFormStep_title}>{title}</div>
			<div className={styles.MultiStepFormStep_inner}>{children}</div>
			{!!footer && (
				<div className={styles.MultiStepFormStep_footer}>{footer}</div>
			)}
		</div>
	);
};

export default MultiStepFormStep;
