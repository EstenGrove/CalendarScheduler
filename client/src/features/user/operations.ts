import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserByID } from "../../utils/utils_user";
import { AwaitedResponse } from "../types";
import { CurrentUser } from "./types";

const getUserByID = createAsyncThunk(
	"user/getUserByID",
	async (userID: string) => {
		const response = (await fetchUserByID(userID)) as AwaitedResponse<{
			user: CurrentUser;
		}>;
		const data = response.Data;

		return data.user as CurrentUser;
	}
);

export { getUserByID };
