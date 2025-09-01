import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useMemo } from "react";

type SessionStorage = {
	[quizId: string]: {
		[sessionId: string]: string;
	};
};

export function useSessions(quizId: string) {
	const [storage, setSessions] = useLocalStorage<SessionStorage>("sessions", {});

	const addSession = (id: string, key: string) => {
		setSessions((sessions) => ({ ...sessions, [quizId]: { ...(sessions[quizId] ?? {}), [id]: key } }));
	};
	const removeSession = (id: string) => {
		setSessions((sessions) => {
			sessions = { ...sessions, [quizId]: { ...(sessions[quizId] ?? {}) } };
			delete sessions[quizId][id];

			return sessions;
		});
	};

	const sessionIds = useMemo(() => (storage[quizId] ? Object.keys(storage[quizId]) : []), [storage]);

	return { sessionIds, sessions: storage[quizId], addSession, removeSession };
}
