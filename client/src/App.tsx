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

const routePaths = {
	dashboard: "./pages/Dashboard",
	dashboardLayout: "./pages/DashboardLayout",
	calendarLayout: "./pages/DashboardCalendarLayout",
	calendarEvent: "./pages/DashboardCalendarEvent",
	workouts: "./pages/DashboardWorkouts",
	history: "./pages/DashboardWorkoutHistory",
	health: "./pages/DashboardHealthProfile",
};

const LazyDashboard = lazy(() => import(routePaths.dashboard));
const LazyDashboardWorkouts = lazy(() => import(routePaths.workouts));
const LazyDashboardWorkoutHistory = lazy(() => import(routePaths.history));
const LazyDashboardLayout = lazy(() => import(routePaths.dashboardLayout));
const LazyDashboardCalendarEvent = lazy(() => import(routePaths.calendarEvent));
const LazyDashboardCalendarLayout = lazy(
	() => import(routePaths.calendarLayout)
);
const LazyDashboardHealthProfile = lazy(() => import(routePaths.health));

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
										<Suspense>
											<LazyDashboardHealthProfile />
										</Suspense>
									}
								/>
							</Route>
						</Routes>
					</div>
				</div>
			</Provider>
		</Router>
	);
}

export default App;
