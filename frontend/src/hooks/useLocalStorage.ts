import { useEffect, useMemo, useState } from "react";

function getStorageValue<T>(key: string, defaultValue: T) {
	return window.localStorage.getItem(key) ?? JSON.stringify(defaultValue);
}

const changeStorageEvent = "app-storage";
export function useLocalStorage<T>(key: string, defaultValue: T) {
	const [valueRaw, setValueRaw] = useState(() => getStorageValue(key, defaultValue));

	useEffect(() => {
		const handleChangeStorage = () => {
			setValueRaw(getStorageValue(key, defaultValue));
		};

		window.addEventListener(changeStorageEvent, handleChangeStorage);
		window.addEventListener("storage", handleChangeStorage);
		return () => {
			window.removeEventListener(changeStorageEvent, handleChangeStorage);
			window.removeEventListener("storage", handleChangeStorage);
		};
	}, []);

	const value = useMemo(() => {
		try {
			return JSON.parse(valueRaw) as T;
		} catch {
			return defaultValue;
		}
	}, [valueRaw]);

	const setValue = (next: ((prev: T) => T) | T) => {
		if (typeof next === "function") next = (next as (prev: T) => T)(value);
		localStorage.setItem(key, JSON.stringify(next));

		window.dispatchEvent(new Event(changeStorageEvent));
	};

	return [value, setValue] as const;
}
