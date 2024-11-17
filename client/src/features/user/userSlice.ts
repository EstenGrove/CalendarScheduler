import { createSlice } from "@reduxjs/toolkit";
import { TStatus } from "../types";
import { CurrentSession, CurrentUser } from "./types";
import { RootState } from "../../store/store";

export interface CurrentUserSlice {
	status: TStatus;
	currentUser: CurrentUser | null;
	currentSession: CurrentSession | null;
}

const currentUser: CurrentUser = {
	userID: "af666794-212f-49b6-96d8-658d49194367",
	username: "estengrove99@gmail.com",
	password: "1234",
	firstName: "Esten",
	lastName: "Grove",
	isActive: true,
	createdDate: "2024-11-16 07:48:38.137292",
	lastLoginDate: null,
	token: "MY-TOKEN",
};

const initialState: CurrentUserSlice = {
	status: "IDLE",
	currentUser: currentUser,
	currentSession: null,
};

const userSlice = createSlice({
	name: "currentUser",
	initialState: initialState,
	reducers: {},
});

export const selectCurrentUser = (state: RootState) => {
	return state.currentUser.currentUser as CurrentUser;
};

export default userSlice.reducer;
