import { ReactNode, useState } from "react";
import sprite from "../../assets/icons/calendar.svg";
import styles from "../../css/ui/Steps.module.scss";

type Props = { children?: ReactNode };

type StepProps = {
	children?: ReactNode;
	isActive: boolean;
	showForwardArrow?: boolean;
	showBackArrow?: boolean;
};

const Step = ({
	children,
	isActive = false,
	showForwardArrow = false,
	showBackArrow = false,
}: StepProps) => {
	if (!isActive) {
		return null;
	}
	return (
		<div className={styles.Step}>
			<div className={styles.Step_nav}>
				{showBackArrow && (
					<div className={styles.Step_nav_back}>
						<svg className={styles.Step_nav_back_icon}>
							<use xlinkHref={`${sprite}#icon-arrow_back`}></use>
						</svg>
						<span>Back</span>
					</div>
				)}
				{showForwardArrow && (
					<div className={styles.Step_nav_forward}>
						<span>Next</span>
						<svg className={styles.Step_nav_forward_icon}>
							<use xlinkHref={`${sprite}#icon-arrow_forward`}></use>
						</svg>
					</div>
				)}
			</div>
			<div className={styles.Step_main}>{children}</div>
		</div>
	);
};

const Steps = ({ children }: Props) => {
	return (
		<div className={styles.Steps}>
			<div className={styles.Steps_main}>
				{children}
				{/*  */}
				{/*  */}
			</div>
		</div>
	);
};

export { Steps, Step };
