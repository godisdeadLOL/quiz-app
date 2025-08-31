import { Quiz } from "@/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useQuizesQuery() {
	return useSuspenseQuery({
		queryKey: ["quizes"],
		queryFn: async () => {
			const result = await Quiz.listQuizes();
			return result.data!;
		},
	});
}