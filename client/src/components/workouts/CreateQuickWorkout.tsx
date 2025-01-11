import { useRef, useState } from "react";
import { QuickWorkoutValues } from "../../utils/types";
import sprite from "../../assets/icons/calendar2.svg";
import styles from "../../css/workouts/CreateQuickWorkout.module.scss";
import TextInput from "../shared/TextInput";
import TimePicker from "../shared/TimePicker";
import MinutesSelector from "../shared/MinutesSelector";
import CounterInput from "../shared/CounterInput";
import { ActivityType } from "../../utils/utils_activity";

// REQUIREMENTS:
// - NAME (WORKOUT NAME)
// - ACTIVITY TYPE
// - TAG COLOR
// - WORKOUT LENGTH (IN MINS)

type Props = {
	values: QuickWorkoutValues;
	handleChange: (name: string, value: string | number) => void;
	selectTag: (value: string) => void;
};

const tagColors = [
	"var(--accent)",
	"var(--accent-purple)",
	"var(--accent-green)",
	"var(--accent-red)",
	"var(--accent-blue)",
	"var(--accent-yellow)",
	"var(--blueGrey800)",
];

type MoreProps = {
	handleChange: (name: string, value: string | number) => void;
	values: QuickWorkoutValues;
};
type ExtraOptsProps = {
	values: QuickWorkoutValues;
	handleChange: (name: string, value: string | number) => void;
};

const enableExtra = false;

const ExtraOptionsByType = ({ values, handleChange }: ExtraOptsProps) => {
	const type = values.activityType as ActivityType;
	return (
		<div className={styles.ExtraOptionsByType}>
			{/* WEIGHT TYPES */}
			{type === "Lift" && (
				<>
					<div className={styles.MoreOptions_row}>
						<label htmlFor="reps">Reps</label>
						<CounterInput
							name="reps"
							id="reps"
							value={values.reps}
							onChange={handleChange}
						/>
					</div>
					<div className={styles.MoreOptions_row}>
						<label htmlFor="sets">Sets</label>
						<CounterInput
							name="sets"
							id="sets"
							value={values.sets}
							onChange={handleChange}
						/>
					</div>
					<div className={styles.MoreOptions_row}>
						<label htmlFor="weight">Weight</label>
						<CounterInput
							name="weight"
							id="weight"
							value={values.weight}
							onChange={handleChange}
						/>
					</div>
				</>
			)}
			{/* STEP TYPES */}
			{(type === "Walk" || type === "Run") && (
				<>
					<div className={styles.MoreOptions_row}>
						<label htmlFor="steps">Steps</label>
						<CounterInput
							name="steps"
							id="steps"
							value={values.steps}
							onChange={handleChange}
						/>
					</div>
					<div className={styles.MoreOptions_row}>
						<label htmlFor="miles">Miles</label>
						<CounterInput
							name="miles"
							id="miles"
							value={values.miles}
							onChange={handleChange}
						/>
					</div>
				</>
			)}
			{/* STRETCH & CARDIO TYPES */}
			{(type === "Stretch" || type === "Cardio") && (
				<>
					<div className={styles.MoreOptions_row}>
						<label htmlFor="reps">Repetitions</label>
						<CounterInput
							name="reps"
							id="reps"
							value={values.reps}
							onChange={handleChange}
						/>
					</div>
				</>
			)}
		</div>
	);
};

const MoreOptions = ({ values, handleChange }: MoreProps) => {
	return (
		<div className={styles.MoreOptions}>
			<div className={styles.MoreOptions_row}>
				<label
					htmlFor="mins"
					style={{ display: "block", marginBottom: ".5rem" }}
				>
					Length of workout
				</label>
				<MinutesSelector
					name="mins"
					minutes={values.mins}
					onSelect={handleChange}
				/>
			</div>
			{enableExtra && (
				<ExtraOptionsByType values={values} handleChange={handleChange} />
			)}
		</div>
	);
};

type TagProps = {
	onClick: () => void;
	color: string;
};
const TagColor = ({ onClick, color }: TagProps) => {
	const css = { backgroundColor: color };
	return <div className={styles.TagColor} onClick={onClick} style={css}></div>;
};
type ActivityProps = {
	icon: string;
	color: string;
	label: string;
	onClick: () => void;
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

type QuickSummaryProps = {
	values: QuickWorkoutValues;
};

const icons = {
	Lift: "fitness_center",
	Walk: "directions_walk",
	Run: "directions_run",
	Stretch: "accessibility",
	Cardio: "grass",
	More: "dots-three-horizontal",
	default: "timer",
};

const QuickSummary = ({ values }: QuickSummaryProps) => {
	const mainColor = values.tagColor;
	return (
		<div className={styles.QuickSummary}>
			<div className={styles.QuickSummary_title}>Quick Summary</div>
			<div className={styles.QuickSummary_name}>
				<svg
					className={styles.QuickSummary_name_icon}
					style={{ fill: mainColor }}
				>
					<use xlinkHref={`${sprite}#icon-bolt`}></use>
				</svg>
				<div>{values.name}</div>
			</div>
			<div className={styles.QuickSummary_time}>
				<svg className={styles.QuickSummary_time_icon}>
					<use xlinkHref={`${sprite}#icon-timer`}></use>
				</svg>
				<div>Starts at {values.time}</div>
			</div>
			<div className={styles.QuickSummary_type}>
				<svg className={styles.QuickSummary_type_icon}>
					<use
						xlinkHref={`${sprite}#icon-${
							icons[values.activityType as keyof object] || icons.default
						}`}
					></use>
				</svg>
				<div>{values.activityType || "Activity"}</div>
			</div>
			{/*  */}
			{/*  */}
		</div>
	);
};

const showType = true;

const CreateQuickWorkout = ({ values, handleChange, selectTag }: Props) => {
	const nameRef = useRef<HTMLInputElement>(null);
	const [showMore, setShowMore] = useState<boolean>(false);

	const toggleMore = () => {
		setShowMore(!showMore);
	};

	return (
		<div className={styles.CreateQuickWorkout}>
			<div className={styles.CreateQuickWorkout_title}>Create a workout</div>
			<div className={styles.CreateQuickWorkout_inner}>
				{showType && (
					<div className={styles.CreateQuickWorkout_inner_list}>
						<Activity
							label="Lift"
							icon="fitness_center"
							color="var(--accent-blue)"
							onClick={() => handleChange("activityType", "Lift")}
						/>
						<Activity
							label="Walk"
							icon="directions_walk"
							color="var(--accent-green)"
							onClick={() => handleChange("activityType", "Walk")}
						/>
						<Activity
							label="Run"
							icon="directions_run"
							color="var(--blueGrey800)"
							onClick={() => handleChange("activityType", "Run")}
						/>
						<Activity
							label="Stretch"
							icon="accessibility"
							color="var(--accent-red)"
							onClick={() => handleChange("activityType", "Stretch")}
						/>
						<Activity
							label="Cardio"
							icon="grass"
							color="var(--accent-purple)"
							onClick={() => handleChange("activityType", "Cardio")}
						/>
						<Activity
							label="More"
							icon="dots-three-horizontal"
							color="var(--blueGrey900)"
							onClick={() => handleChange("activityType", "More")}
						/>
					</div>
				)}
				<div className={styles.CreateQuickWorkout_inner_row}>
					<label htmlFor="name">Name of the workout</label>
					<TextInput
						name="name"
						id="name"
						value={values.name}
						onChange={handleChange}
						inputRef={nameRef}
						onFocus={() => nameRef?.current?.select()}
					/>
				</div>
				<div className={styles.CreateQuickWorkout_inner_row}>
					<label htmlFor="name">Start Time</label>
					<TimePicker
						name="time"
						id="time"
						value={values.time}
						onChange={handleChange}
					/>
				</div>
				<label htmlFor="tagColor">Pick a color label</label>
				<div className={styles.CreateQuickWorkout_inner_tags}>
					{tagColors &&
						tagColors.map((tag, idx) => (
							<TagColor
								key={idx + tag}
								color={tag}
								onClick={() => selectTag(tag)}
							/>
						))}
				</div>
				<div
					onClick={toggleMore}
					className={styles.CreateQuickWorkout_inner_showMore}
				>
					More options
				</div>
				{showMore && (
					<div className={styles.CreateQuickWorkout_inner_moreOptions}>
						<MoreOptions values={values} handleChange={handleChange} />
					</div>
				)}
			</div>
			<QuickSummary values={values} />
		</div>
	);
};

export default CreateQuickWorkout;
