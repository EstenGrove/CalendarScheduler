import { useState } from "react";
import styles from "../../css/workouts/CreateWorkout.module.scss";
import { CurrentUser } from "../../features/user/types";
import { WithNewPlan } from "./CreateWorkoutSteps";
import { formatDate } from "../../utils/utils_dates";
import {
	CreateScheduleValues,
	CreateWorkoutValues,
	NewWorkoutValues,
} from "./types";
import { WeekDayToken } from "../../utils/utils_options";

type Props = {
	currentUser: CurrentUser;
	closeModal: () => void;
};

// Steps for Workout w/ NEW plan

// Steps for Workout w/ EXISTING plan

const flowTypes = {
	New: [],
	Existing: [],
};

const initialWorkoutState: CreateWorkoutValues = {
	workoutType: "",
	planName: "",
	planDesc: "",
	notes: "",
	mins: 30, // mins
	// weighted
	weight: 0,
	reps: 0,
	sets: 0,
	// distance
	steps: 0,
	miles: 0,
	// scheduled time
	startTime: "",
	endTime: "",
	date: "",
	// recurring schedule event
	isRecurring: false,
};

const initialScheduleState: CreateScheduleValues = {
	startDate: formatDate(new Date().toString(), "input"),
	endDate: formatDate(new Date().toString(), "input"),
	interval: 0,
	frequency: "Never",
	byDay: [],
	byMonthDay: new Date().getDate(),
	byMonth: 0,
	// optional
	location: "",
	url: "",
	notes: "",
};

type PlanType = "New" | "Existing" | null;

const initialState: NewWorkoutValues = {
	...initialWorkoutState,
	...initialScheduleState,
};

const CreateWorkout = ({ currentUser, closeModal }: Props) => {
	const [workoutValues, setWorkoutValues] =
		useState<NewWorkoutValues>(initialState);
	// dictates which step's set to use: 'New' or 'Existing' (plan)
	const [planType, setPlanType] = useState<PlanType>(null);

	const choosePlanType = (type: PlanType) => {
		setPlanType(type);
	};

	const handleSelect = (name: string, value: string | number) => {
		// set a default name according to workout type selection
		if (name === "workoutType") {
			const plan = !workoutValues.planName ? value : workoutValues.planName;
			setWorkoutValues({
				...workoutValues,
				planName: plan as string,
				workoutType: value as string,
			});
		} else {
			setWorkoutValues({
				...workoutValues,
				[name]: value,
			});
		}
	};
	const handleChange = (name: string, value: string | number) => {
		setWorkoutValues({
			...workoutValues,
			[name]: value,
		});
	};

	const handleCheckbox = (name: string, value: boolean) => {
		setWorkoutValues({
			...workoutValues,
			[name]: value,
		});

		if (name === "isRecurring") {
			toggleIsRecurring(value);
		}
	};

	const handleDays = (day: WeekDayToken) => {
		const { byDay } = workoutValues;

		if (byDay.includes(day)) {
			const newByDay = [...byDay].filter((current) => current !== day);
			setWorkoutValues({
				...workoutValues,
				byDay: newByDay,
			});
		} else {
			setWorkoutValues({
				...workoutValues,
				byDay: [...byDay, day],
			});
		}
	};

	const toggleIsRecurring = (isRecurring: boolean) => {
		if (isRecurring) {
			setWorkoutValues({
				...workoutValues,
				isRecurring: true,
				frequency: "Daily",
				interval: 1,
			});
		} else {
			setWorkoutValues({
				...workoutValues,
				isRecurring: false,
				byDay: [],
				byMonth: 0,
				byMonthDay: 0,
				frequency: "Never",
				interval: 0,
			});
		}
	};

	// save the workout w/ a newly created workout plan
	const saveNewWorkoutPlan = () => {
		// do stuff
	};

	// saves a new workout using an existing workout plan
	const saveNewWorkout = () => {
		// do stuff
	};

	return (
		<div className={styles.CreateWorkout}>
			{!planType && (
				<div className={styles.CreateWorkout_planTypes}>
					<div className={styles.CreateWorkout_planTypes_title}>
						Would you like to use an existing workout plan or create a new one?
					</div>
					<div className={styles.CreateWorkout_planTypes_options}>
						<div
							onClick={() => choosePlanType("Existing")}
							className={styles.CreateWorkout_planTypes_options_plan}
						>
							Use existing plan
						</div>
						<div
							onClick={() => choosePlanType("New")}
							className={styles.CreateWorkout_planTypes_options_plan}
						>
							Create new plan
						</div>
					</div>
				</div>
			)}

			{/* NEW PLAN FORM */}
			{planType === "New" && (
				<WithNewPlan
					planType={planType}
					workoutValues={workoutValues}
					handleChange={handleChange}
					handleSelect={handleSelect}
					handleDays={handleDays}
					handleCheckbox={handleCheckbox}
					changePlanType={choosePlanType}
					saveNewWorkoutPlan={saveNewWorkoutPlan}
					saveNewWorkout={saveNewWorkout}
				/>
			)}
			{/* EXISTING PLAN FORM */}

			{/*  */}
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default CreateWorkout;
