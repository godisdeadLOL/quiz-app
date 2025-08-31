import { Session } from "@/api";
import { queryClient } from "@/app/queryClient";
import { updateAtIndex } from "@/utils";
import { useMutation } from "@tanstack/react-query";

import type { QuestionAnswer, QuizSessionDetailed } from "@/api/types";

export function useCreateSessionMutation(quizId: string) {
	return useMutation({
		mutationFn: async () => {
			const result = await Session.createSession({ query: { quiz_id: quizId } });
			return result.data!;
		},

		onSuccess: (session) => {
			queryClient.setQueryData(["session"], session);
		},
	});
}

export function useSetSessionAnswerMutation(sessionId: string, sessionKey: string) {
	return useMutation({
		onMutate: (params: { index: number; answer: QuestionAnswer }) => {
			const { index, answer } = params;

			queryClient.setQueryData<QuizSessionDetailed>(
				["session", sessionId],
				(session) => session && { ...session, answers: updateAtIndex(session.answers, index, answer) }
			);
		},
		mutationFn: async (params) => {
			const { index, answer } = params;

			const result = await Session.updateSessionAnswer({
				path: {
					session_id: sessionId,
					answer_index: index,
				},
				body: answer,
				headers: { "x-session-key": sessionKey },
			});
			return result.data!;
		},
	});
}

export function useFinishSessionMutation(sessionId: string, sessionKey: string) {
	return useMutation({
		mutationFn: async () => {
			const result = await Session.finishSession({
				path: { session_id: sessionId },
				headers: { "x-session-key": sessionKey },
			});
			return result.data!;
		},
		onSuccess: (session) => {
			queryClient.setQueryData<QuizSessionDetailed>(["session", sessionId], () => session);
		},
	});
}
