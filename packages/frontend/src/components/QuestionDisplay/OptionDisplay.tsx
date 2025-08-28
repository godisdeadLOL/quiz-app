import { Checkable } from "@/ui/Checkable";
import classNames from "classnames";
import type { QuestionPublic } from "shared/types";

type QuestionOptionDisplayProps = {
	question: QuestionPublic;
	index: number;
	isPicked: boolean;
	onChangePicked?: (value: boolean) => void;
};

export function OptionDisplay({ question, index, isPicked, onChangePicked: onPick }: QuestionOptionDisplayProps) {
	return (
		<label className={classNames("button flex gap-4 px-4 py-2 rounded-lg", isPicked ? "bg-surface-2" : "bg-surface-1")}>
			<div className="flex-1">{question.options[index].description}</div>
			<Checkable value={isPicked} type={question.mode === "single" ? "radio" : "checkbox"} onChangeValue={onPick} />
		</label>
	);
}
