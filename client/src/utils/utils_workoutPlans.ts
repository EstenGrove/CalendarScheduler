export interface CreatePlanValues {
	workoutType: string;
	workoutPlanName: string;
	workoutPlanDesc: string;
	workoutPlanLength: number;
	workoutPlanSets: number;
	workoutPlanReps: number;
	workoutPlanWeight: number;
}

export interface WorkoutType {
	workoutTypeID: number;
	workoutType: string;
	workoutTypeDesc: string;
	isActive: boolean;
	createdDate: string;
}

const workoutTypes: WorkoutType[] = [
	{
		workoutTypeID: 2,
		workoutType: "Planked Pull-ups",
		workoutTypeDesc:
			"Plank your back horizontally, like picking something up & pull the dumbell up and down beneath you.",
		isActive: true,
		createdDate: "2024-11-19 07:28:47.097325",
	},
	{
		workoutTypeID: 3,
		workoutType: "Lateral Butterflys",
		workoutTypeDesc:
			"Stand upright w/ arms wide open & bring them together like a butterflys wings.",
		isActive: true,
		createdDate: "2024-11-19 07:28:47.097325",
	},
	{
		workoutTypeID: 4,
		workoutType: "Overhead Press",
		workoutTypeDesc:
			"Stand upright & perform an overhead bench press w/ the dumbells above your head.",
		isActive: true,
		createdDate: "2024-11-19 07:28:47.097325",
	},
	{
		workoutTypeID: 5,
		workoutType: "Pushups",
		workoutTypeDesc:
			"Perform push-ups from the ground lowering your body & face as close to the ground as possible.",
		isActive: true,
		createdDate: "2024-11-19 07:28:47.097325",
	},
	{
		workoutTypeID: 6,
		workoutType: "Situps",
		workoutTypeDesc:
			"Lay down w/ your legs folded at the knees & your arms behind your head and bring your face to your knees for a situp",
		isActive: true,
		createdDate: "2024-11-19 07:28:47.097325",
	},
	{
		workoutTypeID: 1,
		workoutType: "Curls",
		workoutTypeDesc: "Perform curls standing or sitting w/ dumbells",
		isActive: true,
		createdDate: "2024-11-19 07:28:47.097325",
	},
	{
		workoutTypeID: 7,
		workoutType: "Timed Walk",
		workoutTypeDesc:
			"Walking for a specified amount of time via Pomodoro or other timer.",
		isActive: true,
		createdDate: "2024-11-22 07:05:48.301667",
	},
	{
		workoutTypeID: 8,
		workoutType: "Free Walk",
		workoutTypeDesc:
			"Walking for an un-specified amount of time. Record the time walking.",
		isActive: true,
		createdDate: "2024-11-22 07:05:48.301667",
	},
];

const getPlanIDFromType = (type: string, planTypes: WorkoutType[]) => {
	const planRecord = planTypes.find((plan) => plan.workoutType === type);

	const id: number = planRecord?.workoutTypeID || 0;

	return id;
};

export { workoutTypes, getPlanIDFromType };
