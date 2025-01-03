const BASE_URL: string = import.meta.env.VITE_API_BASE;

const API_AUTH = {
	development: {
		assets: import.meta.env.VITE_APP_ASSETS_URL,
		base: import.meta.env.VITE_API_BASE,
		user: import.meta.env.VITE_API_USER,
		password: import.meta.env.VITE_API_USER_PASSWORD,
	},
	production: {
		assets: import.meta.env.VITE_APP_ASSETS_URL,
		base: import.meta.env.VITE_API_BASE,
		user: import.meta.env.VITE_API_USER,
		password: import.meta.env.VITE_API_USER_PASSWORD,
	},
	testing: {
		assets: import.meta.env.VITE_APP_ASSETS_URL,
		base: import.meta.env.VITE_API_BASE,
		user: import.meta.env.VITE_API_USER,
		password: import.meta.env.VITE_API_USER_PASSWORD,
	},
	local: {
		assets: import.meta.env.VITE_APP_ASSETS_URL,
		base: import.meta.env.VITE_API_BASE,
		user: import.meta.env.VITE_API_USER,
		password: import.meta.env.VITE_API_USER_PASSWORD,
	},
	// USED FOR TESTING ON LOCAL NETWORK
	network: {
		assets: import.meta.env.VITE_TEST_ASSETS_URL,
		base: import.meta.env.VITE_TEST_API_BASE,
		user: import.meta.env.VITE_TEST_API_USER,
		password: import.meta.env.VITE_TEST_API_USER_PASSWORD,
	},
};

const CURRENT_ENV_NAME = "network";
const CURRENT_ENV_AUTH = API_AUTH[CURRENT_ENV_NAME];

const API_ENDPOINTS = {
	user: {
		getUserByLogin: "/user/getUserByLogin",
		getUserByID: "/user/getUserByID",
		login: "/user/login",
		logout: "/user/logout",
	},
	events: {
		getByRange: "/events/getEventsByRange",
		createEvent: "/events/createEvent",
		getMonthlySummary: "/events/getMonthlySummary",
		getByDate: "/events/getEventsByDate",
		getDetails: "/events/getEventDetails",
		deleteEvent: "/events/deleteEvent",
	},
	plans: {
		getPlans: "/plans/getWorkoutPlans",
	},
	workouts: {
		createWorkout: "/workouts/createWorkout",
		createNewWorkout: "/workouts/createNewWorkout", // w/ plan
		getWorkouts: "/workouts/getWorkouts",
		getWorkoutsByDate: "/workouts/getWorkoutsByDate",
		markWorkoutsAsDone: "/workouts/markWorkoutsAsDone",
	},
	workoutHistory: {
		createLog: "/history/createLog",
		getLogs: "/history/getWorkoutLogs",
	},
	summary: {
		getDailyMins: "/summary/getDailyMinsSummary",
		getWeeklyTotals: "/summary/getWeeklyTotals",
		getRangeSummary: "/summary/getRangeSummary",
		getSummaryByDay: "/summary/getSummaryByDay",
		getSummaryByWeek: "/summary/getSummaryByWeek",
		getSummaryByMonth: "/summary/getSummaryByMonth",
		getSummaryByYear: "/summary/getSummaryByYear",
	},
} as const;

export const {
	user: userApis,
	events: eventApis,
	plans: planApis,
	workouts: workoutApis,
	workoutHistory: historyApis,
	summary: summaryApis,
} = API_ENDPOINTS;

export {
	API_AUTH,
	BASE_URL,
	CURRENT_ENV_AUTH as currentEnv,
	CURRENT_ENV_NAME as currentEnvName,
};
