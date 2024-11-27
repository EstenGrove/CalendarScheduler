import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TStatus } from "../types";
import { CurrentSession, CurrentUser } from "./types";
import { RootState } from "../../store/store";
import { getUserByID } from "./operations";

export interface UserHealthProfile {
	age: number;
	height: number;
	weight: number;
	strideLength: number; // steps x strideLength(in feet) = distance(in feet)/ 5280(feet per mile)
	bodyMassIndex: number;
}

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
	reducers: {
		resetUserState() {
			return initialState;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(getUserByID.pending, (state: CurrentUserSlice) => {
				state.status = "PENDING";
			})
			.addCase(
				getUserByID.fulfilled,
				(state: CurrentUserSlice, action: PayloadAction<CurrentUser>) => {
					state.status = "FULFILLED";
					state.currentUser = action.payload as CurrentUser;
				}
			);
	},
});

export const { resetUserState } = userSlice.actions;

export const selectCurrentUser = (state: RootState) => {
	return state.currentUser.currentUser as CurrentUser;
};

export default userSlice.reducer;
