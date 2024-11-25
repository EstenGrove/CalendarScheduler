import { ReactNode } from "react";
import styles from "../../css/history/LogWorkoutStep.module.scss";

type Props = {
	children?: ReactNode;
	isActiveStep: boolean;
	title: string;
};

const LogWorkoutStep = ({ title, children, isActiveStep }: Props) => {
	if (!isActiveStep) {
		return null;
	}
	return (
		<div className={styles.LogWorkoutStep}>
			<div className={styles.LogWorkoutStep_title}>{title}</div>
			<div className={styles.LogWorkoutStep_inner}>{children}</div>
		</div>
	);
};

type FooterProps = {
	children?: ReactNode;
};

const LogWorkoutFooter = ({ children }: FooterProps) => {
	return <div className={styles.LogWorkoutFooter}>{children}</div>;
};

export { LogWorkoutStep, LogWorkoutFooter };
