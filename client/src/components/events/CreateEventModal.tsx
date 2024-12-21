import { useState } from "react";
import Modal from "../shared/Modal";
import CreateEvent from "./CreateEvent";
import { CreateEventVals, WeekDayToken } from "../../utils/utils_options";
import { formatDate } from "../../utils/utils_dates";
import { useAppDispatch } from "../../store/store";
import { createNewEvent } from "../../features/events/operations";
import { CurrentUser } from "../../features/user/types";

type Props = {
	currentUser: CurrentUser;
	closeModal: () => void;
};

const initialValues: CreateEventVals = {
	title: "Untitled Event",
	desc: "",
	startDate: formatDate(new Date().toString(), "input"),
	endDate: formatDate(new Date().toString(), "input"),
	interval: 0,
	frequency: "Never",
	isRecurring: false,
	byDay: [],
	byMonthDay: new Date().getDate(),
	byMonth: 0,
	// optional
	location: "",
	url: "",
	notes: "",
};

const CreateEventModal = ({ currentUser, closeModal }: Props) => {
	const dispatch = useAppDispatch();

	const [newEventValues, setNewEventValues] =
		useState<CreateEventVals>(initialValues);

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

	const handleMonth = (name: string, value: number | string) => {
		setNewEventValues({
			...newEventValues,
			[name]: value,
		});
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
		closeModal();
	};
	const cancelNewEvent = () => {
		closeModal();
	};

	return (
		<Modal title="Create Event" closeModal={closeModal}>
			<CreateEvent
				values={newEventValues}
				handleDays={handleDays}
				handleMonth={handleMonth}
				handleChange={handleChange}
				handleCheckbox={handleCheckbox}
				handleFrequency={handleFrequency}
				createNewEvent={saveNewEvent}
				cancelNewEvent={cancelNewEvent}
			/>
		</Modal>
	);
};

export default CreateEventModal;
