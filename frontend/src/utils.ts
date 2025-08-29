import { createContext, useContext } from "react";

export function makeContext<T>(displayName: string) {
	const currentContext = createContext<T | undefined>(undefined);
	currentContext.displayName = displayName;

	const useCurrentContext = () => {
		const value = useContext(currentContext);
		if (!value) throw new Error("context is undefined");

		return value;
	};

	return [currentContext.Provider, useCurrentContext] as const;
}

export function updateAtIndex<T>(arr: T[], index: number, newValue: T): T[] {
	return arr.map((item, i) => (i === index ? newValue : item));
}
