import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Quiz, Session } from "@/api";

export function useQuizPreviewQuery(quizId: string) {
	return useSuspenseQuery(
		queryOptions({
			queryKey: ["quizPreview", quizId],
			queryFn: async () => {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				const result = await Quiz.getQuizPreview({ path: { quiz_id: quizId } });
				return result.data!;
			},
		})
	);
}

export function useQuizDetailedQuery(quizId: string, sessionKey: string) {
	return useSuspenseQuery(
		queryOptions({
			queryKey: ["quizDetailed", quizId],
			queryFn: async () => {
				const result = await Quiz.getQuizDetailed({ path: { quiz_id: quizId }, headers: { "x-session-key": sessionKey } });
				return result.data!;
			},
		})
	);
}

export function useSessionQuery(sessionId: string, sessionKey: string) {
	return useSuspenseQuery(
		queryOptions({
			queryKey: ["session", sessionId],
			queryFn: async () => {
				const result = await Session.getSession({
					path: {
						session_id: sessionId,
					},
					headers: { "x-session-key": sessionKey },
				});
				return result.data!;
			},
		})
	);
}

export function useSessionsPreviewQuery(sessionIds: string[]) {
	return useSuspenseQuery(
		queryOptions({
			queryKey: ["sessions", sessionIds],
			queryFn: async () => {
				if (sessionIds.length === 0) return [];

				const result = await Session.getManySessions({
					query: {
						ids: sessionIds,
					},
				});
				return result.data!;
			},
		})
	);
}
