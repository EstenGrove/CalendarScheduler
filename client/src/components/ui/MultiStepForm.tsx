import { ReactNode } from "react";
import styles from "../../css/ui/MultiStepForm.module.scss";

type Props = {
	children?: ReactNode;
};

const MultiStepForm = ({ children }: Props) => {
	return (
		<div className={styles.MultiStepForm}>
			<div className={styles.MultiStepForm_main}>{children}</div>
		</div>
	);
};

export default MultiStepForm;
