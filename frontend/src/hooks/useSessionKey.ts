import { useSessions } from "./useSessions";

export function useSessionKey(quizId: string, sessionId: string) {
	const { sessions } = useSessions(quizId);

	const key = sessions[sessionId];
	if (!key) throw new Error(`No key for session ${sessionId}`);

	return key;
}
