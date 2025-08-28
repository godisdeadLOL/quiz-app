import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { QuizSessionPublic, QuizSessionSecure } from "shared/types";

type Session = QuizSessionSecure & { id: string };

type Sessions = {
	[quizId: number]: Session[];
};

export function useSessions(quizId: number) {
	const [sessions, setSessions] = useLocalStorage<Sessions>("sessions", {});

	const addSession = (session: Session) => {
		setSessions((sessions) => ({ ...sessions, [quizId]: [...(sessions[quizId] ?? []), session] }));
	};
	const removeSession = (sessionId: string) => {
		setSessions((sessions) => ({ ...sessions, [quizId]: [...(sessions[quizId] ?? []).filter((session) => session.id !== sessionId)] }));
	};

	return { sessions: sessions[quizId], addSession, removeSession };
}
