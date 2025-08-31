import { useSessionKey } from "@/hooks/useSessionKey";
import { LuCheck } from "react-icons/lu";
import { useParams } from "react-router";
import { useSessionQuery } from "../../api/queries";
import { useFinishSessionMutation } from "../../api/mutations";
import { useNavigate } from "react-router";
import { SessionAnswersGrid } from "@/components/SessionAnswersGrid";
import { useQuestionsLayout } from "./context";

export default function Finish() {
	const navigate = useNavigate();
	const { navigateResult } = useQuestionsLayout();

	// параметры
	const params = useParams();
	const quizId = params["quizId"]!;
	const sessionId = params["sessionId"]!;

	const sessionKey = useSessionKey(quizId, sessionId);

	// данные
	const { data: session } = useSessionQuery(sessionId, sessionKey);
	const isAnsweredAll = !session.answers.some((answer) => answer.length === 0);

	// мутации
	const finishSessionMutation = useFinishSessionMutation(sessionId, sessionKey);
	const isPending = finishSessionMutation.isPending;

	return (
		<>
			<SessionAnswersGrid actions={{ onSelect: (index) => navigate(`../${index + 1}`) }} session={session} />

			{!isAnsweredAll && <div className="mt-4 text-text-faded">Вы ответили не на все вопросы</div>}

			<button
				onClick={handleComplete}
				disabled={isPending}
				className="button text-white bg-green-500 px-4 py-2 rounded-md flex items-center justify-center gap-4 mt-8 w-full"
			>
				Завершить <LuCheck />
			</button>
		</>
	);

	async function handleComplete() {
		await finishSessionMutation.mutateAsync().then(navigateResult)
		// navigate("../", { relative: "path", replace: true });
	}
}
