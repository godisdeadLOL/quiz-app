import { useLocalStorage } from "@/hooks/useLocalStorage";

type Sessions = {
	[quizId: string]: {
		[sessionId: string]: string;
	};
};

export function useSessions(quizId: string) {
	const [sessions, setSessions] = useLocalStorage<Sessions>("sessions", {});

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

	return { sessions: sessions[quizId], addSession, removeSession };
}
