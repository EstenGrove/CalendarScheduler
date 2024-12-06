import { ComponentPropsWithoutRef } from "react";
import styles from "../../css/summary/SummaryTotal.module.scss";

type TotalProps = {
	total: string | number;
	label: string;
};

interface Props extends TotalProps, ComponentPropsWithoutRef<"div"> {}

const SummaryTotal = ({ total, label, ...rest }: Props) => {
	return (
		<div className={styles.SummaryTotal}>
			<div className={styles.SummaryTotal_total} {...rest}>
				{total}
			</div>
			<div className={styles.SummaryTotal_label}>{label}</div>
		</div>
	);
};

export default SummaryTotal;
