import { renderHook } from "@testing-library/react";
import { useLocalStorage } from "./useLocalStorage";
import { act, use, useState } from "react";

describe("useLocalStorage", () => {
	test("Установка значения", () => {
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

	test("Значение есть, корректное", () => {
		window.localStorage.setItem("key", JSON.stringify({ value: 144 }));

		const hook = renderHook(() => useLocalStorage("key", { value: 15 }));
		expect(hook.result.current[0]).toEqual({ value: 144 });
	});

	test("Значение есть, некорректное", () => {
		window.localStorage.setItem("key", "{ aste ");

		const hook = renderHook(() => useLocalStorage("key", { value: 15 }));
		expect(hook.result.current[0]).toEqual({ value: 15 });
	});

	test("cross-hook передача данных", () => {
		const hookA = renderHook(() => useLocalStorage("key", "default"));
		const hookB = renderHook(() => useLocalStorage("key", "default"));

		expect(hookA.result.current[0]).toBe(hookB.result.current[0]);

		act(() => {
			const [valueA, setValueA] = hookA.result.current;
			const [valueB, setValueB] = hookB.result.current;

			setValueB("kek");
			setValueA("lol");
		});

		expect(hookA.result.current[0]).toBe(hookB.result.current[0]);
	});

	afterEach(() => {
		window.localStorage.removeItem("key");
	});
});
