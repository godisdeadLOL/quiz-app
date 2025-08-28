import { SessionDisplay } from "@/components/SessionDisplay";
import { useSessions } from "@/hooks/useSessions";
import { useCreateSessionMutation } from "@/pages/quiz/mutations";
import { useQuizPreviewQuery } from "@/pages/quiz/queries";
import { LuArrowRight } from "react-icons/lu";
import { useNavigate, useParams } from "react-router";

export default function Intro() {
	const params = useParams();
	const quizId = Number(params["quizId"]);

	const { data: quiz } = useQuizPreviewQuery(quizId);
	const { mutateAsync, isPending } = useCreateSessionMutation();

	const navigate = useNavigate();
	const handleContinue = async () => {
		const result = await mutateAsync({ quizId });
		addSession({ ...result, id: result.key });

		// navigate("./0");
	};

	const { sessions, addSession, removeSession } = useSessions(quizId);

	return (
		<>
			<h1 className="text-center text-xl font-bold text-white">{quiz.title}</h1>
			<p className="mt-8">{quiz.description}</p>

			{sessions && (
				<div className="mt-8">
					<h2 className="text-lg text-text-accent font-bold">Сессии:</h2>

					<div className="flex flex-col gap-2 mt-2 -mx-2">
						{sessions.map((session) => (
							<SessionDisplay
								key={session.id}
								session={session}
								actions={{
									onSelect: () => {
										sessionStorage.setItem("quiz-app_sessionKey", session.key);
										navigate("./0");
									},
									onDelete: () => removeSession(session.id),
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
}
