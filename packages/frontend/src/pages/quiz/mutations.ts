import { Session } from "@/api";
import { queryClient } from "@/app/queryClient";
import { updateAtIndex } from "@/utils";
import { useMutation } from "@tanstack/react-query";

import type { CreateQuizSession, QuestionAnswer, QuizSessionPublic } from "shared/types";

export function useCreateSessionMutation() {
	return useMutation({
		mutationFn: async (body: CreateQuizSession) => {
			const result = await Session.createSession({ body: body });

			sessionStorage.setItem("quiz-app_sessionKey", result.data!.key);
			return result.data!;
		},

		onSuccess: (session) => {
			queryClient.setQueryData(["session"], session);
		},
	});
}

export function useSetSessionAnswerMutation(index: number, sessionKey: string) {
	return useMutation({
		onMutate: (body: QuestionAnswer) => {
			queryClient.setQueryData<QuizSessionPublic>(
				["session"],
				(session) => session && { ...session, answers: updateAtIndex(session.answers, index, body) }
			);
		},
		mutationFn: async (body: QuestionAnswer) => {
			const result = await Session.setSessionAnswer({
				path: { index },
				body,
				headers: { "x-session-key": sessionKey },
			});
			return result.data!;
		},
	});
}

export function useFinishSessionMutation(sessionKey: string) {
	return useMutation({
		mutationFn: async () => {
			const result = await Session.finishSession({
				headers: { "x-session-key": sessionKey },
			});
			return result.data!;
		},
		onSuccess: (session) => {
			queryClient.setQueryData<QuizSessionPublic>(["session"], () => session);
		},
	});
}
