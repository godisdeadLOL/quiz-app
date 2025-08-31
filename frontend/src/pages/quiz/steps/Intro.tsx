import { SessionDisplay } from "@/components/SessionDisplay";
import { useSessions } from "@/hooks/useSessions";
import { useCreateSessionMutation } from "@/pages/quiz/api/mutations";
import { useQuizPreviewQuery, useSessionsPreviewQuery } from "@/pages/quiz/api/queries";
import { LuArrowRight } from "react-icons/lu";
import { useNavigate, useParams } from "react-router";

export default function Intro() {
	const params = useParams();
	const quizId = params["quizId"]!;

	const { data: quiz } = useQuizPreviewQuery(quizId);
	const { mutateAsync, isPending } = useCreateSessionMutation(quizId);

	const navigate = useNavigate();
	const handleContinue = async () => {
		const session = await mutateAsync();
		addSession(session.id, session.key);

		navigate(`${session.id}/1`);
	};

	const { sessions, addSession, removeSession } = useSessions(quizId);
	const sessionIds = sessions ? Object.keys(sessions) : [];

	const { data: sessionsPreview } = useSessionsPreviewQuery(sessionIds);

	return (
		<>
			<h1 className="text-center text-xl font-bold text-white">{quiz.title}</h1>
			<p className="mt-8">{quiz.description}</p>

			{sessionsPreview.length > 0 && (
				<div className="mt-8">
					<h2 className="text-lg text-text-accent font-bold">Сессии:</h2>

					<div className="flex flex-col gap-2 mt-2 -mx-2">
						{sessionsPreview.map((session) => (
							<SessionDisplay
								key={session.id}
								session={session}
								actions={{
									onSelect: handleSessionSelect,
									onDelete: handleSessionDelete,
								}}
							/>
						))}
					</div>
				</div>
			)}

			<button
				disabled={isPending}
				onClick={handleContinue}
				className="button text-white bg-green-500 px-4 py-2 rounded-md flex items-center justify-center gap-4 mt-8 w-full"
			>
				Начать <LuArrowRight />
			</button>
		</>
	);

	function handleSessionSelect(sessionId: string) {
		const session = sessionsPreview.find((session) => session.id === sessionId)!;

		if (session.is_expired) navigate(`${sessionId}`);
		else navigate(`${sessionId}/1`);
	}

	function handleSessionDelete(sessionId: string) {
		// todo: запрос на удаление сессии
		removeSession(sessionId);
	}
}
