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
	events: {
		getByRange: "/events/getEventsByRange",
		createEvent: "/events/createEvent",
		getMonthlySummary: "/events/getMonthlySummary",
		getByDate: "/events/getEventsByDate",
		getDetails: "/events/getEventDetails",
	},
	plans: {},
	workouts: {},
	workoutHistory: {
		createLog: "/history/createLog",
	},
} as const;

export const {
	events: eventApis,
	plans: planApis,
	workouts: workoutApis,
	workoutHistory: historyApis,
} = API_ENDPOINTS;

export {
	API_AUTH,
	BASE_URL,
	CURRENT_ENV_AUTH as currentEnv,
	CURRENT_ENV_NAME as currentEnvName,
};
