import styles from "../css/pages/Dashboard.module.scss";
import { useState } from "react";
import { formatDate } from "../utils/utils_dates";
import { Outlet } from "react-router-dom";
import { CreateEventVals, WeekDayToken } from "../utils/utils_options";
import Modal from "../components/shared/Modal";
import CreateEvent from "../components/events/CreateEvent";
import FloatingButton from "../components/dashboard/FloatingButton";
import { createNewEvent } from "../features/events/operations";
import { useAppDispatch } from "../store/store";

const initialValues: CreateEventVals = {
	title: "Untitled Event",
	desc: "",
	startDate: formatDate(new Date().toString(), "input"),
	endDate: formatDate(new Date().toString(), "input"),
	interval: 0,
	frequency: "Never",
	isRecurring: false,
	byDay: [],
	byMonthDay: 0,
	byMonth: 0,
};

const Dashboard = () => {
	const dispatch = useAppDispatch();
	const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
	const [newEventValues, setNewEventValues] =
		useState<CreateEventVals>(initialValues);

	const openCreateModal = () => {
		setShowCreateModal(true);
	};

	const handleChange = (name: string, value: string | number) => {
		setNewEventValues({
			...newEventValues,
			[name]: value,
		});
	};
	const handleCheckbox = (name: string, value: boolean) => {
		setNewEventValues({
			...newEventValues,
			[name]: value,
		});

		if (name === "isRecurring") {
			toggleIsRecurring(value);
		}
	};

	const handleFrequency = (name: string, value: string) => {
		if (value !== "Weekly") {
			setNewEventValues({
				...newEventValues,
				[name]: value,
				byDay: [],
			});
		} else {
			setNewEventValues({
				...newEventValues,
				[name]: value,
			});
		}
	};

	const handleDays = (day: WeekDayToken) => {
		const { byDay } = newEventValues;

		if (byDay.includes(day)) {
			const newByDay = [...byDay].filter((current) => current !== day);
			setNewEventValues({
				...newEventValues,
				byDay: newByDay,
			});
		} else {
			setNewEventValues({
				...newEventValues,
				byDay: [...byDay, day],
			});
		}
	};

	const toggleIsRecurring = (isRecurring: boolean) => {
		if (isRecurring) {
			setNewEventValues({
				...newEventValues,
				isRecurring: true,
				frequency: "Daily",
				interval: 1,
			});
		} else {
			setNewEventValues({
				...newEventValues,
				byDay: [],
				byMonth: 0,
				byMonthDay: 0,
				isRecurring: false,
				frequency: "Never",
				interval: 0,
			});
		}
	};

	const saveNewEvent = () => {
		const eventValues = {
			newEvent: {
				...newEventValues,
				interval: Number(newEventValues.interval),
			},
			userID: "af666794-212f-49b6-96d8-658d49194367",
		};
		console.log("Values:", eventValues);

		dispatch(createNewEvent(eventValues));
	};
	const cancelNewEvent = () => {
		setShowCreateModal(false);
	};

	return (
		<div className={styles.Dashboard}>
			<main className={styles.Dashboard_main}>
				<Outlet />

				<FloatingButton onClick={openCreateModal} />
			</main>

			{showCreateModal && (
				<Modal
					title="Create Event"
					closeModal={() => setShowCreateModal(false)}
				>
					<CreateEvent
						values={newEventValues}
						handleDays={handleDays}
						handleChange={handleChange}
						handleCheckbox={handleCheckbox}
						handleFrequency={handleFrequency}
						createNewEvent={saveNewEvent}
						cancelNewEvent={cancelNewEvent}
					/>
				</Modal>
			)}
		</div>
	);
};

export default Dashboard;
