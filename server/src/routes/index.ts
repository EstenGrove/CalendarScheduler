import eventRoutes from "./eventRoutes";
import workoutRoutes from "./workoutRoutes";
import historyRoutes from "./historyRoutes";
import summaryRoutes from "./summaryRoutes";
import planRoutes from "./workoutPlanRoutes";
import metricsRoutes from "./metricsRoutes";

const allRoutes = {
	events: eventRoutes,
	workouts: workoutRoutes,
	history: historyRoutes,
	summary: summaryRoutes,
	plans: planRoutes,
	metrics: metricsRoutes,
};

export { allRoutes };
