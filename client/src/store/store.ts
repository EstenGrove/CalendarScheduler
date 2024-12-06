import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import goalsReducer from "../features/goals/goalsSlice";
import eventsReducer from "../features/events/eventsSlice";
import currentUserReducer from "../features/user/userSlice";
import workoutsReducer from "../features/workouts/workoutsSlice";
import historyReducer from "../features/workoutHistory/historySlice";
import summaryReducer from "../features/summary/summarySlice";

const store = configureStore({
	reducer: {
		events: eventsReducer,
		goals: goalsReducer,
		workouts: workoutsReducer,
		history: historyReducer,
		summary: summaryReducer,
		currentUser: currentUserReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// ALWAYS USE THIS VIA: const dispatch = useAppDispatch();
export const useAppDispatch: () => AppDispatch = useDispatch;

export { store };
