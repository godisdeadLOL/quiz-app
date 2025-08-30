import classNames from "classnames";
import type { QuizFeedback } from "generated/api/types.gen";

type FeedbackQuestionsGridProps = {
	feedback: QuizFeedback;

	actions?: {
		onSelect?: (index: number) => void;
	};
};

const baseClass = {
	wrong: "bg-red-900 text-red-300",
	semi: "bg-yellow-900 text-yellow-300",
	right: "bg-green-900 text-green-300",
};

const underlineClass = {
	wrong: "bg-red-500",
	semi: "bg-yellow-500",
	right: "bg-green-500",
};

export function FeedbackQuestionsGrid({ feedback, actions }: FeedbackQuestionsGridProps) {
	return (
		<div className="grid grid-cols-5 xs:grid-cols-8 sm:grid-cols-12 gap-2">
			{feedback.questions.map((feedback, index) => {
				const state = feedback.score === 0 ? "wrong" : feedback.score === feedback.score_max ? "right" : "semi";

				return (
					<button
						onClick={() => actions?.onSelect?.(index)}
						className={classNames("button relative w-full aspect-square flex items-center justify-center rounded-md", baseClass[state])}
					>
						{index + 1}
						<div className={classNames("absolute left-0 right-0 bottom-0 h-[10%] rounded-b-md", underlineClass[state])} />
					</button>
				);
			})}
		</div>
	);
}
