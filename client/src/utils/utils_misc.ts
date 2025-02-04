export type TKey<T> = keyof T;
export type TRecord<T> = Record<string, T[]>;

const groupBy = <T extends object>(key: TKey<T>, list: T[]) => {
	const grouped = {} as TRecord<T>;
	for (let i = 0; i < list.length; i++) {
		const item = list[i] as T;
		const mapKey = item[key] as TKey<T>;

		if (!grouped[mapKey as keyof object]) {
			grouped[mapKey as keyof TRecord<T>] = [];
		}
		grouped[mapKey as keyof TRecord<T>].push(item as T);
	}
	return grouped;
};

// Example fn: groupByFn([...someData], (x) => x.name);
const groupByFn = <T extends object>(
	list: T[],
	fn: (item: T) => string | number
) => {
	const grouped = {} as TRecord<T>;

	for (let i = 0; i < list.length; i++) {
		const current = list[i] as T;
		const iteratee = fn(current);

		if (!grouped[iteratee as keyof object]) {
			grouped[iteratee as keyof object] = [];
		}

		grouped[iteratee as keyof object].push(current);
	}

	return grouped;
};

const formatLargeNumber = (value: number) => {
	if (!value) return 0;
	return value?.toLocaleString() || 0;
};

const formatThousand = (value: number): string => {
	if (Number(value) >= 1000) {
		const newStr = Math.floor(value / 100) / 10.0;
		return newStr + "k";
	} else {
		return String(value);
	}
};

const sleep = (ms: number = 500) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(ms);
		}, ms);
	});
};

const addEllipsis = (str: string, maxLength: number = 30) => {
	if (str.length <= maxLength) return str;
	const newStr = str.slice(0, maxLength - 3);
	return newStr + "...";
};

const sortObjByDateAsc = <T extends object>(key: keyof T, list: T[]): T[] => {
	if (!list || !list.length) return [];

	return [...list].sort((a, b) => {
		const dateA: Date = new Date(a[key as keyof object]);
		const dateB: Date = new Date(b[key as keyof object]);

		return dateA.getTime() - dateB.getTime();
	});
};
const sortObjByDateDesc = <T extends object>(key: keyof T, list: T[]): T[] => {
	if (!list || !list.length) return [];

	return [...list].sort((a, b) => {
		const dateA: Date = new Date(a[key as keyof object]);
		const dateB: Date = new Date(b[key as keyof object]);

		return dateB.getTime() - dateA.getTime();
	});
};

export {
	sleep,
	groupBy,
	groupByFn,
	formatThousand,
	formatLargeNumber,
	addEllipsis,
	sortObjByDateAsc,
	sortObjByDateDesc,
};
