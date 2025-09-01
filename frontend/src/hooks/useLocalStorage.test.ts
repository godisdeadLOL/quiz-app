import { renderHook } from "@testing-library/react";
import { useLocalStorage } from "./useLocalStorage";
import { act, useState } from "react";

describe("useLocalStorage", () => {
	test("Установка примитивного значения", () => {
		const hook = renderHook(() => useLocalStorage("key", 0));

		act(() => {
			const [_, setValue] = hook.result.current;
			setValue(15);
		});

		expect(hook.result.current[0]).toBe(15);
		expect(window.localStorage.getItem("key")).toBe("15");
	});

	test("Установка ссылочного значения", () => {
		const hook = renderHook(() => useLocalStorage("key", { value: 42 }));

		act(() => {
			const [_, setValue] = hook.result.current;
			setValue({ value: 44 });
		});

		expect(hook.result.current[0]).toEqual({ value: 44 });
		expect(window.localStorage.getItem("key")).toBe(JSON.stringify({ value: 44 }));
	});

	test("Сохранение ссылки между ререндерами", () => {
		const hook = renderHook(() => useLocalStorage("key", { value: 15 }));

		const prevValue = hook.result.current[0];
		hook.rerender();

		expect(hook.result.current[0]).toBe(prevValue);
	});

	test("Сохранение ссылки при установке идентичного значения", () => {
		const hook = renderHook(() => useLocalStorage("key", { value: 15 }));

		const prevValue = hook.result.current[0];
		act(() => {
			const [_, setValue] = hook.result.current;
			setValue({ value: 15 });
		});

		expect(hook.result.current[0]).toBe(prevValue);
	});

	afterEach(() => {
		window.localStorage.removeItem("key");
	});
});
