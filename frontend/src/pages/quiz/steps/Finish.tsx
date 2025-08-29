import { useSessionKey } from "@/hooks/useSessionKey";
import { LuCheck } from "react-icons/lu";
import { useParams } from "react-router";
import { useSessionQuery } from "../queries";
import { useFinishSessionMutation } from "../mutations";
import { useNavigate } from "react-router";
import { AnswerGrid } from "@/components/AnswerGrid";

export default function Finish() {
	const navigate = useNavigate();

	// параметры
	const params = useParams();
	const quizId = params["quizId"]!;
	const sessionId = params["sessionId"]!;

	const sessionKey = useSessionKey(quizId, sessionId);

	// данные
	const { data: session } = useSessionQuery(sessionId, sessionKey);

	// мутации
	const finishSessionMutation = useFinishSessionMutation(sessionId, sessionKey);
	const isPending = finishSessionMutation.isPending;

	return (
		<>
			<AnswerGrid actions={{ onSelect: (index) => navigate(`../${index}`, { relative: "path" }) }} session={session} />

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
		await finishSessionMutation.mutateAsync();
		navigate("../result", { relative: "path" });
	}
}
