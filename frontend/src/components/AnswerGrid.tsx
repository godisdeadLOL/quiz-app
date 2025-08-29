import type { QuizSessionDetailed } from "@/api/types";
import classNames from "classnames";

type AnswerGridProps = {
	session: QuizSessionDetailed;

	actions?: {
		onSelect: (index: number) => void;
	};
};

const style = {
	filled: "bg-surface-2",
	empty: "outline-2 -outline-offset-2 outline-surface-2",
};
export function AnswerGrid({ session, actions }: AnswerGridProps) {
	// const state = answer.length > 0 ? "filled" : "empty";

	return (
		<div className="grid grid-cols-5 xs:grid-cols-8 sm:grid-cols-12 gap-2">
			{session.answers.map((answer, index) => {
				const state = answer.length > 0 ? "filled" : "empty";

				return (
					<button
						onClick={() => actions?.onSelect?.(index)}
						className={classNames("button relative w-full aspect-square flex items-center justify-center rounded-md", style[state])}
					>
						{index + 1}
						{/* { && <div className="absolute left-0 right-0 bottom-0 h-[10%] rounded-b-md bg-neutral-500" />} */}
					</button>
				);
			})}
		</div>
	);
}
