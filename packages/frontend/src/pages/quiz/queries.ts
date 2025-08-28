import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Quiz, Session } from "@/api";

export function useQuizesQuery() {
	return useSuspenseQuery({
		queryKey: ["quizes"],
		queryFn: async () => {
			const result = await Quiz.listQuizes();
			return result.data!;
		},
	});
}

export function useQuizPreviewQuery(id: number) {
	return useSuspenseQuery(
		queryOptions({
			queryKey: ["quizPreview", id],
			queryFn: async () => {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				const result = await Quiz.getQuiz({ path: { index: id } });
				return result.data!;
			},
		})
	);
}

export function useQuizDetailedQuery(id: number) {
	return useSuspenseQuery(
		queryOptions({
			queryKey: ["quizDetailed", id],
			queryFn: async () => {
				const result = await Quiz.getQuiz({ path: { index: id } });
				return result.data!;
			},
		})
	);
}

export function useResolveSessionQuery(sessionKey: string) {
	return useSuspenseQuery(
		queryOptions({
			queryKey: ["session"],
			queryFn: async () => {
				const result = await Session.resolveSession({
					headers: { "x-session-key": sessionKey },
				});
				return result.data!;
			},
		})
	);
}
