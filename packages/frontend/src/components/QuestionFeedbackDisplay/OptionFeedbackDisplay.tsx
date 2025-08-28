import type { QuestionPublic, QuestionFeedback } from "shared/types";
import classNames from "classnames";
import { LuCheck, LuX } from "react-icons/lu";

type OptionFeedbackDisplay = {
	question: QuestionPublic;
	feedback: QuestionFeedback;
	index: number;
};

export function OptionFeedbackDisplay({ question, feedback, index }: OptionFeedbackDisplay) {
	const isChecked = feedback.currentAnswer.includes(index);
	const isRight = feedback.rightAnswer.includes(index);

	const state = isChecked ? (isRight ? "picked-right" : "picked-wrong") : isRight ? "right" : "empty";

	const style = {
		"picked-right": "bg-green-800 text-green-200 outline-1",
		"picked-wrong": "bg-red-800 text-red-200 outline-1",
		right: "bg-green-900 text-green-400",
		empty: "",
	};

	return (
		<div className={classNames("flex items-center px-4 py-1 rounded-md gap-2", style[state])}>
			<div>{index + 1}.</div>

			{question.options[index].description}

			{isChecked && isRight && <LuCheck className="ml-auto" />}
			{isChecked && !isRight && <LuX className="ml-auto" />}
		</div>
	);
}
