import { LuArrowRight, LuClock, LuDot, LuTrash } from "react-icons/lu";
import type { QuizSessionPreview } from "@/api/types";
import type { ComponentProps } from "react";
import classNames from "classnames";

type SessionDisplayProps = {
	session: QuizSessionPreview;

	actions?: {
		onDelete?: (sessionId: string) => void;
		onSelect?: (sessionId: string) => void;
	};
} & ComponentProps<"div">;

export function SessionDisplay({ session, actions, className, ...other }: SessionDisplayProps) {
	const statusMessage = {
		"in-progress": "в процессе",
		finished: "завершена",
	};

	return (
		<div className={classNames("flex gap-4 items-center py-1 px-2 rounded-sm  transition-colors hover:bg-surface-2", className)} {...other}>
			<div>
				<div className="flex gap-1 items-center">
					<div>#{session.id}</div>
					<LuDot className="text-text-faded" />
					<div className="text-text-faded text-sm">{statusMessage[session.is_finished ? "finished" : "in-progress"]}</div>
				</div>

				<div className="flex items-center gap-1 text-sm text-text-faded">
					<LuClock /> время
				</div>
			</div>

			<div className="ml-auto flex gap-1">
				<button data-testid="button-delete" onClick={() => actions?.onDelete?.(session.id)} className="button flex items-center p-2 rounded-md gap-2">
					<LuTrash />
				</button>

				<button data-testid="button-continue" onClick={() => actions?.onSelect?.(session.id)} className="button flex items-center p-2 rounded-md gap-2">
					<LuArrowRight />
				</button>
			</div>
		</div>
	);
}
