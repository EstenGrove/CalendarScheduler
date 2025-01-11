import styles from "../../css/workouts/StartWorkout.module.scss";
import sprite from "../../assets/icons/calendar2.svg";
import { CurrentUser } from "../../features/user/types";
import { useBackgroundBlur } from "../../hooks/useBackgroundBlur";
import { useRef, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { ActivityType } from "../../utils/utils_activity";

type Props = {
	currentUser: CurrentUser;
	closeModal: () => void;
};
type ActivityProps = {
	icon: string;
	color: string;
	label: string;
	onClick: () => void;
};
type StartActivityProps = {
	startActivity: (activity: ActivityType) => void;
};
type StartPlanProps = {
	startPlan: (plan: string) => void;
	plans: Array<string>;
};
type ExistingPlanProps = {
	startPlan: () => void;
	plan: string;
};

const Activity = ({ icon, color, label, onClick }: ActivityProps) => {
	return (
		<div className={styles.Activity}>
			<button
				onClick={onClick}
				className={styles.Activity_btn}
				style={{ backgroundColor: color }}
			>
				<svg className={styles.Activity_btn_icon}>
					<use xlinkHref={`${sprite}#icon-${icon}`}></use>
				</svg>
			</button>
			<div>{label}</div>
		</div>
	);
};

const StartActivity = ({ startActivity }: StartActivityProps) => {
	return (
		<div className={styles.StartActivity}>
			<div className={styles.StartActivity_top}>
				<h4>Start new activity</h4>
			</div>
			<div className={styles.StartActivity_list}>
				<Activity
					label="Lift"
					icon="fitness_center"
					color="var(--accent-blue)"
					onClick={() => startActivity("Lift")}
				/>
				<Activity
					label="Walk"
					icon="directions_walk"
					color="var(--accent-green)"
					onClick={() => startActivity("Walk")}
				/>
				<Activity
					label="Run"
					icon="directions_run"
					color="var(--blueGrey800)"
					onClick={() => startActivity("Run")}
				/>
				<Activity
					label="Stretch"
					icon="accessibility"
					color="var(--accent-red)"
					onClick={() => startActivity("Stretch")}
				/>
				<Activity
					label="Cardio"
					icon="grass"
					color="var(--accent-purple)"
					onClick={() => startActivity("Cardio")}
				/>
				<Activity
					label="More"
					icon="dots-three-horizontal"
					color="var(--blueGrey900)"
					onClick={() => startActivity("More")}
				/>
			</div>
		</div>
	);
};

const ExistingPlan = ({ plan = "My Plan", startPlan }: ExistingPlanProps) => {
	return (
		<div onClick={startPlan} className={styles.ExistingPlan}>
			<div>{plan}</div>
		</div>
	);
};

const StartPlan = ({ startPlan, plans = [] }: StartPlanProps) => {
	return (
		<div className={styles.StartPlan}>
			<div className={styles.StartPlan_top}>
				<h4>Start workout plan</h4>
			</div>
			<div className={styles.StartPlan_plans}>
				{plans &&
					plans.map((plan, idx) => (
						<ExistingPlan
							key={plan + idx}
							plan={plan}
							startPlan={() => startPlan(plan)}
						/>
					))}
			</div>
		</div>
	);
};

const fakePlans = [
	"My Plan",
	"Weekly Curls (3x/week)",
	"Planked Pull-ups",
	"5 Minute Stretch",
];

const StartWorkout = ({ currentUser, closeModal }: Props) => {
	const elRef = useRef<HTMLDivElement>(null);
	const [activity, setActivity] = useState<ActivityType | null>(null);
	const [plan, setPlan] = useState<string | null>(null);
	useBackgroundBlur();
	useOutsideClick(elRef, closeModal);

	const selectNewActivity = (type: ActivityType) => {
		setActivity(type);
		console.log("type", type);
	};

	const selectPlan = (plan: string) => {
		setPlan(plan);
	};

	return (
		<div ref={elRef} className={styles.StartWorkout}>
			<div className={styles.StartWorkout_new}>
				<StartActivity startActivity={selectNewActivity} />
			</div>
			<div className={styles.StartWorkout_or}>OR</div>
			<div className={styles.StartWorkout_existing}>
				<StartPlan startPlan={selectPlan} plans={fakePlans} />
			</div>
			{/*  */}
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default StartWorkout;
