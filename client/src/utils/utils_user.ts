import { AsyncResponse } from "../features/types";
import { CurrentUser } from "../features/user/types";
import { currentEnv, userApis } from "./utils_env";

const fetchUserByLogin = async (
	username: string,
	password: string
): AsyncResponse<{ user: CurrentUser }> => {
	const url = currentEnv.base + userApis.getUserByLogin;

	try {
		const request = await fetch(url, {
			method: "POST",
			body: JSON.stringify({ username, password }),
		});
		const response = await request.json();
		return response as AsyncResponse<{ user: CurrentUser }>;
	} catch (error) {
		return error;
	}
};
const fetchUserByID = async (
	userID: string
): AsyncResponse<{ user: CurrentUser }> => {
	let url = currentEnv.base + userApis.getUserByID;
	url += "?" + new URLSearchParams({ userID });

	try {
		const request = await fetch(url);
		const response = await request.json();
		return response as AsyncResponse<{ user: CurrentUser }>;
	} catch (error) {
		return error;
	}
};

export { fetchUserByID, fetchUserByLogin };
