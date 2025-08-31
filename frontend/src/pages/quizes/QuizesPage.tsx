import { QuizPreviewDisplay } from "@/components/QuizPreviewDisplay";
import { useQuizesQuery } from "./api/queries";

export default function QuizesPage() {
	const { data: quizes } = useQuizesQuery();

	return (
		<div className="px-4 py-8 flex flex-col gap-4">
			{quizes.map((quiz) => (
				<QuizPreviewDisplay key={quiz.id} quiz={quiz} />
			))}
		</div>
	);
}
