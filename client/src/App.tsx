import "./App.scss";
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
// components
import Home from "./pages/Home";
import DashboardWorkoutWeek from "./pages/DashboardWorkoutWeek";
import DashboardWorkoutPlans from "./pages/DashboardWorkoutPlans";
import Loader from "./components/ui/Loader";
import SummaryWeekView from "./views/SummaryWeekView";
import SummaryDayView from "./views/SummaryDayView";
import SummaryMonthView from "./views/SummaryMonthView";
import SummaryYearView from "./views/SummaryYearView";
import SummaryRangeView from "./views/SummaryRangeView";
import PageNotFound from "./pages/PageNotFound";

const routePaths = {
	dashboard: "./pages/Dashboard",
	dashboardLayout: "./pages/DashboardLayout",
	calendarLayout: "./pages/DashboardCalendarLayout",
	calendarEvent: "./pages/DashboardCalendarEvent",
	workouts: "./pages/DashboardWorkouts",
	health: "./pages/DashboardHealthProfile",
	tracker: "./pages/DashboardWorkoutTracker",
	settings: "./pages/DashboardSettings.tsx",
	summary: "./pages/DashboardSummary.tsx",
	history: "./pages/DashboardWorkoutHistory",
	logs: "./pages/DashboardWorkoutLogs.tsx",
	userSettings: "./views/UserSettings.tsx",
	workoutTypeSettings: "./views/WorkoutTypeSettings.tsx",
	workoutSettings: "./views/WorkoutSettings.tsx",
};

const LazyDashboard = lazy(() => import(routePaths.dashboard));
const LazyDashboardWorkouts = lazy(() => import(routePaths.workouts));
const LazyDashboardWorkoutHistory = lazy(() => import(routePaths.history));
const LazyDashboardWorkoutLogs = lazy(() => import(routePaths.logs));
const LazyDashboardLayout = lazy(() => import(routePaths.dashboardLayout));
const LazyDashboardCalendarEvent = lazy(() => import(routePaths.calendarEvent));
const LazyDashboardCalendarLayout = lazy(
	() => import(routePaths.calendarLayout)
);
const LazyDashboardHealthProfile = lazy(() => import(routePaths.health));
const LazyDashboardWorkoutTracker = lazy(() => import(routePaths.tracker));
const LazyDashboardSettings = lazy(() => import(routePaths.settings));
const LazyDashboardSummary = lazy(() => import(routePaths.summary));
const LazyUserSettings = lazy(() => import(routePaths.userSettings));
const LazyWorkoutTypeSettings = lazy(
	() => import(routePaths.workoutTypeSettings)
);
const LazyWorkoutSettings = lazy(() => import(routePaths.workoutSettings));

const Fallback = () => {
	return (
		<div className="Fallback">
			<Loader />
			<div>Loading data...</div>
		</div>
	);
};

function App() {
	return (
		<Router>
			<Provider store={store}>
				<div className="App">
					<div className="App_main">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route
								path="/dashboard"
								element={
									<Suspense fallback={<Fallback />}>
										<LazyDashboard />
									</Suspense>
								}
							>
								<Route
									index={true}
									element={
										<Suspense fallback={<Fallback />}>
											<LazyDashboardLayout />
										</Suspense>
									}
								/>
								<Route
									path="workouts"
									element={
										<Suspense fallback={<Fallback />}>
											<LazyDashboardWorkouts />
										</Suspense>
									}
								>
									<Route path="week" element={<DashboardWorkoutWeek />} />
									<Route path="plans" element={<DashboardWorkoutPlans />} />
									<Route
										path="history"
										element={
											<Suspense>
												<LazyDashboardWorkoutHistory />
											</Suspense>
										}
									/>
									<Route
										path="logs"
										element={
											<Suspense>
												<LazyDashboardWorkoutLogs />
											</Suspense>
										}
									/>
								</Route>
								<Route
									path="calendar"
									element={
										<Suspense fallback={<Fallback />}>
											<LazyDashboardCalendarLayout />
										</Suspense>
									}
								>
									<Route path=":id" element={<LazyDashboardCalendarEvent />} />
								</Route>
								<Route
									path="health"
									element={
										<Suspense fallback={<Fallback />}>
											<LazyDashboardHealthProfile />
										</Suspense>
									}
								/>
								<Route
									path="tracker"
									element={
										<Suspense fallback={<Fallback />}>
											<LazyDashboardWorkoutTracker />
										</Suspense>
									}
								/>
								<Route
									path="settings"
									element={
										<Suspense fallback={<Fallback />}>
											<LazyDashboardSettings />
										</Suspense>
									}
								>
									<Route
										path="user"
										element={
											<Suspense fallback={<Fallback />}>
												<LazyUserSettings />
											</Suspense>
										}
									/>
									<Route
										path="types"
										element={
											<Suspense fallback={<Fallback />}>
												<LazyWorkoutTypeSettings />
											</Suspense>
										}
									/>
									<Route
										path="workouts"
										element={
											<Suspense fallback={<Fallback />}>
												<LazyWorkoutSettings />
											</Suspense>
										}
									/>
								</Route>
								<Route
									path="summary"
									element={
										<Suspense fallback={<Fallback />}>
											<LazyDashboardSummary />
										</Suspense>
									}
								>
									<Route path="day" element={<SummaryDayView />} />
									<Route path="week" element={<SummaryWeekView />} />
									<Route path="month" element={<SummaryMonthView />} />
									<Route path="year" element={<SummaryYearView />} />
									<Route path="range" element={<SummaryRangeView />} />
								</Route>
							</Route>
							<Route path="*" element={<PageNotFound />} />
						</Routes>
					</div>
				</div>
			</Provider>
		</Router>
	);
}

export default App;
