import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import eventsReducer from "../features/events/eventsSlice";

const store = configureStore({
	reducer: {
		events: eventsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// ALWAYS USE THIS VIA: const dispatch = useAppDispatch();
export const useAppDispatch: () => AppDispatch = useDispatch;

export { store };
