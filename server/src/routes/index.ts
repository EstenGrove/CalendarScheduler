import eventRoutes from "./eventRoutes";
import workoutRoutes from "./workoutRoutes";
import historyRoutes from "./historyRoutes";
import summaryRoutes from "./summaryRoutes";
import planRoutes from "./workoutPlanRoutes";

const allRoutes = {
	events: eventRoutes,
	workouts: workoutRoutes,
	history: historyRoutes,
	summary: summaryRoutes,
	plans: planRoutes,
};

export { allRoutes };
