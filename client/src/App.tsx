import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { getEventsInRange } from "./utils/utils_http";
import { endOfMonth, startOfMonth } from "date-fns";
import { formatDate } from "./utils/utils_dates";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import DashboardWorkouts from "./pages/DashboardWorkouts";
import DashboardWorkoutWeek from "./pages/DashboardWorkoutWeek";
import DashboardWorkoutPlans from "./pages/DashboardWorkoutPlans";
import DashboardCalendarEvent from "./pages/DashboardCalendarEvent";
import DashboardCalendarLayout from "./pages/DashboardCalendarLayout";
import DashboardWorkoutHistory from "./pages/DashboardWorkoutHistory";
import DashboardLayout from "./pages/DashboardLayout";

const start = formatDate(startOfMonth(new Date()), "db");
const end = formatDate(endOfMonth(new Date()), "db");
getEventsInRange(start, end);

function App() {
	return (
		<Router>
			<Provider store={store}>
				<div className="App">
					<div className="App_main">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/dashboard" element={<Dashboard />}>
								<Route index={true} element={<DashboardLayout />} />
								<Route path="workouts" element={<DashboardWorkouts />}>
									<Route path="week" element={<DashboardWorkoutWeek />} />
									<Route path="plans" element={<DashboardWorkoutPlans />} />
									<Route path="history" element={<DashboardWorkoutHistory />} />
								</Route>
								<Route path="calendar" element={<DashboardCalendarLayout />}>
									<Route path=":id" element={<DashboardCalendarEvent />} />
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
