import { useEffect, useState } from "react";

const changeStorageEvent = "app_changeStorage";
const prefix = "quiz-app";

const getStorageValue = <T>(key: string, defaultValue: T) => {
	const valueRaw = localStorage.getItem(key);
	if (valueRaw === null) return defaultValue;

	try {
		return JSON.parse(valueRaw);
	} catch {
		return defaultValue;
	}
};

export function useLocalStorage<T>(key: string, defaultValue: T) {
	const prefixedKey = `${prefix}_${key}`;

	const [value, setValue] = useState<T>(() => getStorageValue(prefixedKey, defaultValue));
	useEffect(() => {
		const handleChangeStorage = () => {
			setValue(getStorageValue(prefixedKey, defaultValue));
		};

		window.addEventListener(changeStorageEvent, handleChangeStorage);
		window.addEventListener("storage", handleChangeStorage);
		return () => {
			window.removeEventListener(changeStorageEvent, handleChangeStorage);
			window.removeEventListener("storage", handleChangeStorage);
		};
	}, []);

	const handleChangeValue = (next: ((prev: T) => T) | T) => {
		if (typeof next === "function") next = (next as (prev: T) => T)(value);

		const currentValue = localStorage.getItem(prefixedKey);
		const nextValue = JSON.stringify(next);
		if (currentValue === nextValue) return;

		localStorage.setItem(prefixedKey, nextValue);
		window.dispatchEvent(new Event(changeStorageEvent));
	};

	return [value, handleChangeValue] as const;
}
