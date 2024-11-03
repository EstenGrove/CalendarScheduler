import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import DashboardCalendar from "./pages/DashboardCalendar";
import DashboardCalendarEvent from "./pages/DashboardCalendarEvent";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
	return (
		<Router>
			<Provider store={store}>
				<div className="App">
					<div className="App_main">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/dashboard" element={<Dashboard />}>
								<Route path="calendar/*" element={<DashboardCalendar />}>
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
