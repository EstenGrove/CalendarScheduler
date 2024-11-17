import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import goalsReducer from "../features/goals/goalsSlice";
import eventsReducer from "../features/events/eventsSlice";
import currentUserReducer from "../features/user/userSlice";

const store = configureStore({
	reducer: {
		events: eventsReducer,
		goals: goalsReducer,
		currentUser: currentUserReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// ALWAYS USE THIS VIA: const dispatch = useAppDispatch();
export const useAppDispatch: () => AppDispatch = useDispatch;

export { store };
