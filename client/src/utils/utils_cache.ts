const getFromLocalStorage = (key: string) => {
	try {
		const data = localStorage.getItem(key);
		return JSON.parse(data as string);
	} catch (error) {
		if (error) {
			return null;
		}
	}
};

export { getFromLocalStorage };
