import { OptionDisplay } from "./OptionDisplay";
import type { QuestionPublic, QuestionAnswer } from "@/api/types";

type QuestionDisplayProps = {
	question: QuestionPublic;
	answer: QuestionAnswer;

	onChangeAnswer?: (answer: QuestionAnswer) => void;
};

export function QuestionDisplay({ answer, question, onChangeAnswer }: QuestionDisplayProps) {
	return (
		<div>
			<p>{question.description}</p>

			<div className="mt-4 select-none flex flex-col gap-2">
				{question.options.map((_, i) => (
					<OptionDisplay key={i} question={question} index={i} isPicked={answer.includes(i)} onChangePicked={(value) => onChangePicked(i, value)} />
				))}
			</div>
		</div>
	);

	function onChangePicked(index: number, value: boolean) {
		if (!onChangeAnswer) return;

		if (question.mode === "multiple") {
			if (value) {
				if (!answer.includes(index)) onChangeAnswer([...answer, index]);
			} else onChangeAnswer(answer.filter((a) => a !== index));
		} else {
			onChangeAnswer([index]);
		}
	}
}
