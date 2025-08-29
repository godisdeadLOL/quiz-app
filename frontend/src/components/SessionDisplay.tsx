import { LuArrowRight, LuClock, LuDot, LuTrash } from "react-icons/lu";
import type { QuizSessionPreview } from "@/api/types";

type SessionDisplayProps = {
	session: QuizSessionPreview;

	actions?: {
		onDelete?: (sessionId: string) => void;
		onSelect?: (sessionId: string) => void;
	};
};

export function SessionDisplay({ session, actions }: SessionDisplayProps) {
	const statusMessage = {
		"in-progress": "в процессе",
		finished: "завершена",
	};

	return (
		<div className="flex gap-4 items-center py-1 px-2 rounded-sm  transition-colors hover:bg-surface-2">
			<div>
				<div className="flex gap-1 items-center">
					<div>#{session.id}</div>
					<LuDot className="text-text-faded" />
					<div className="text-text-faded text-sm">{statusMessage[session.status]}</div>
				</div>

				<div className="flex items-center gap-1 text-sm text-text-faded">
					<LuClock />5 минут назад
				</div>
			</div>

			<div className="ml-auto flex gap-1">
				<button onClick={() => actions?.onDelete?.(session.id)} className="button flex items-center p-2 rounded-md gap-2">
					<LuTrash />
				</button>

				<button onClick={() => actions?.onSelect?.(session.id)} className="button flex items-center p-2 rounded-md gap-2">
					<LuArrowRight />
				</button>
			</div>
		</div>
	);
}
