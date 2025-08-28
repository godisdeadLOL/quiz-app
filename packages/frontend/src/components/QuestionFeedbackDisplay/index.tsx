import { OptionFeedbackDisplay } from "./OptionFeedbackDisplay";
import type { QuestionPublic, QuestionFeedback } from "shared/types";

type QuestionFeedbackProps = {
	index: number;
	question: QuestionPublic;
	feedback: QuestionFeedback;
};

export function QuestionFeedbackDisplay({ index, question, feedback }: QuestionFeedbackProps) {
	return (
		<div>
			<div className="flex items-center">
				<div className="text-text-accent text-lg">{index + 1}.</div>

				<div className="text-text-faded ml-auto text-sm">{feedback.score} из {feedback.scoreMax}</div>
			</div>
			<p>{question.description}</p>

			<div className="flex flex-col gap-2 mt-4">
				{question.options.map((_, index) => (
					<OptionFeedbackDisplay question={question} feedback={feedback} index={index} />
				))}
			</div>
		</div>
	);
}
