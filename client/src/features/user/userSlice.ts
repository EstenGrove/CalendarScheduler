import { createSlice } from "@reduxjs/toolkit";
import { TStatus } from "../types";
import { CurrentSession, CurrentUser } from "./types";

export interface CurrentUserSlice {
	status: TStatus;
	currentUser: CurrentUser | null;
	currentSession: CurrentSession | null;
}

const initialState: CurrentUserSlice = {
	status: "IDLE",
	currentUser: null,
	currentSession: null,
};

const userSlice = createSlice({
	name: "currentUser",
	initialState: initialState,
	reducers: {},
});

export default userSlice.reducer;
