import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import DashboardCalendar from "./pages/DashboardCalendar";
import DashboardCalendarEvent from "./pages/DashboardCalendarEvent";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { getEventsInRange } from "./utils/utils_http";
import { endOfMonth, startOfMonth } from "date-fns";
import { formatDate } from "./utils/utils_dates";
import DashboardWorkouts from "./pages/DashboardWorkouts";

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
								<Route path="workouts" element={<DashboardWorkouts />} />
								<Route path="calendar" element={<DashboardCalendar />}>
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
