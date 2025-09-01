import { act, renderHook } from "@testing-library/react";
import { useSessions } from "./useSessions";

const quizId = "quiz-id";

describe("useSessions", () => {
	test("Добавление/удаление ключей", () => {
		const hook = renderHook(() => useSessions(quizId));

		act(() => {
			const { addSession } = hook.result.current;
			addSession("session-1", "key-1");
		});

		act(() => {
			const { addSession } = hook.result.current;
			addSession("session-2", "key-2");
		});

		expect(hook.result.current.sessions).toEqual({ "session-1": "key-1", "session-2": "key-2" });
		expect(hook.result.current.sessionIds).toEqual(["session-1", "session-2"]);

		act(() => {
			const { removeSession } = hook.result.current;
			removeSession("session-1");
		});

		expect(hook.result.current.sessions).toEqual({ "session-2": "key-2" });
		expect(hook.result.current.sessionIds).toEqual(["session-2"]);
	});
});
