import styles from "../../css/workout-logs/LogWeightedEntry.module.scss";
import CounterInput from "../shared/CounterInput";
import { CreateLogValues } from "./types";

type Props = {
	values: CreateLogValues;
	handleChange: (name: string, value: string | number) => void;
};

const LogWeightedEntry = ({ values, handleChange }: Props) => {
	return (
		<div className={styles.LogWeightedEntry}>
			<div className={styles.LogWeightedEntry_row}>
				<div className={styles.LogWeightedEntry_row_label}>How many reps?</div>
				<CounterInput
					id="reps"
					name="reps"
					value={values.reps}
					onChange={handleChange}
				/>
			</div>
			<div className={styles.LogWeightedEntry_row}>
				<div className={styles.LogWeightedEntry_row_label}>How many sets?</div>
				<CounterInput
					id="sets"
					name="sets"
					value={values.sets}
					onChange={handleChange}
				/>
			</div>
			<div className={styles.LogWeightedEntry_row}>
				<div className={styles.LogWeightedEntry_row_label}>
					How much weight per rep?
				</div>
				<CounterInput
					id="weight"
					name="weight"
					value={values.weight}
					onChange={handleChange}
				/>
			</div>
		</div>
	);
};

export default LogWeightedEntry;
