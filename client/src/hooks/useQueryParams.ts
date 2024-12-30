import { useState } from "react";

export type TParams = Record<string, string>;

const upsertQueryParams = (paramsObj: TParams) => {
	const url = new URL(window.location.href);
	for (const [key, val] of Object.entries(paramsObj)) {
		url.searchParams.set(key, val);
	}
	history.pushState({}, "", url);
};

const getQueryParams = (paramKey?: string): TParams => {
	const raw = new URLSearchParams(window.location.search);
	// if no key provided, return all query params
	if (!paramKey) {
		const params = Object.fromEntries([...raw]);
		return params;
	} else {
		// return only param for given key, must normalize the key since urls will make all keys lowercase
		const param = raw.get(paramKey.toLowerCase());
		const params = { [paramKey]: param };

		return params as TParams;
	}
};

const removeQueryParams = (keysToRemove: string[]) => {
	const url = new URL(window.location.href);
	for (let i = 0; i < keysToRemove.length; i++) {
		const key = keysToRemove[i];
		url.searchParams.delete(key);
	}
	window.history.pushState({}, "", url);
};

const getAllQueryParams = () => {
	const raw = new URLSearchParams(window.location.search);
	const params = Object.fromEntries([...raw]);
	return params;
};

const useQueryParams = () => {
	const [queryParams, setQueryParams] = useState<TParams>(getAllQueryParams);

	const getParams = (key: string) => {
		const params = getQueryParams(key);

		return params;
	};
	const setParams = (newParams: TParams) => {
		upsertQueryParams(newParams);
		setQueryParams(newParams);
	};

	const removeParams = (keys: string[]) => {
		removeQueryParams(keys);
		const newParams = getAllQueryParams();
		setQueryParams(newParams);
	};
	const removeAllParams = () => {
		const newUrl = new URL(window.location.href);
		newUrl.search = "";
		setQueryParams({});
		return newUrl.toString();
	};

	return {
		params: queryParams,
		getParams,
		setParams,
		removeParams,
		removeAllParams,
	};
};

export {
	// Utils
	upsertQueryParams,
	getQueryParams,
	removeQueryParams,
	getAllQueryParams,
	// Stateful Hook Wrapper
	useQueryParams,
};
