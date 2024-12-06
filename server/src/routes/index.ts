import eventRoutes from "./eventRoutes";
import workoutRoutes from "./workoutRoutes";
import historyRoutes from "./historyRoutes";
import summaryRoutes from "./summaryRoutes";

const allRoutes = {
	events: eventRoutes,
	workouts: workoutRoutes,
	history: historyRoutes,
	summary: summaryRoutes,
};

export { allRoutes };
