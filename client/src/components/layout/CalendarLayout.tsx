import { ReactNode, useState } from "react";
import styles from "../../css/layout/CalendarLayout.module.scss";
import FloatingButton from "../dashboard/FloatingButton";
import Modal from "../shared/Modal";
import CreateEvent from "../events/CreateEvent";
import { createNewEvent } from "../../features/events/operations";
import { CreateEventVals, WeekDayToken } from "../../utils/utils_options";
import { useAppDispatch } from "../../store/store";
import { CurrentUser } from "../../features/user/types";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/user/userSlice";
import { formatDate } from "../../utils/utils_dates";

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
	// optional
	location: "",
	url: "",
	notes: "",
};

type Props = {
	children?: ReactNode;
};

const CalendarLayout = ({ children }: Props) => {
	const dispatch = useAppDispatch();
	const currentUser: CurrentUser = useSelector(selectCurrentUser);

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
			userID: currentUser.userID,
		};
		console.log("Values:", eventValues);

		dispatch(createNewEvent(eventValues));
	};
	const cancelNewEvent = () => {
		setShowCreateModal(false);
	};
	return (
		<div className={styles.CalendarLayout}>
			<div className={styles.CalendarLayout}>{children}</div>

			<FloatingButton onClick={openCreateModal} />

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

export default CalendarLayout;
