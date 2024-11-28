import "./App.scss";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
// components
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./pages/DashboardLayout";
import DashboardWorkouts from "./pages/DashboardWorkouts";
import DashboardWorkoutWeek from "./pages/DashboardWorkoutWeek";
import DashboardWorkoutPlans from "./pages/DashboardWorkoutPlans";
import DashboardCalendarEvent from "./pages/DashboardCalendarEvent";
import DashboardCalendarLayout from "./pages/DashboardCalendarLayout";
import DashboardWorkoutHistory from "./pages/DashboardWorkoutHistory";
import Loader from "./components/ui/Loader";

const LazyDashboard = React.lazy(() => import("./pages/Dashboard"));
const LazyDashboardLayout = React.lazy(() => import("./pages/DashboardLayout"));
// const LazyDashboardCalendar = React.lazy(
// 	() => import("./pages/DashboardCalendar")
// );
const LazyDashboardCalendarLayout = React.lazy(
	() => import("./pages/DashboardCalendarLayout")
);
const LazyDashboardCalendarEvent = React.lazy(
	() => import("./pages/DashboardCalendarEvent")
);
const LazyDashboardWorkouts = React.lazy(
	() => import("./pages/DashboardWorkouts")
);
const LazyDashboardWorkoutHistory = React.lazy(
	() => import("./pages/DashboardWorkoutHistory")
);

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
							</Route>
						</Routes>
					</div>
				</div>
			</Provider>
		</Router>
	);
}

export default App;
