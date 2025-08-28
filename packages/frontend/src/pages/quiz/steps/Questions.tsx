import { QuestionDisplay } from "@/components/QuestionDisplay";
import type { QuestionAnswer } from "shared/types";
import { useEffect, useState } from "react";
import { LuArrowLeft, LuArrowRight, LuCheck } from "react-icons/lu";
import { useNavigate, useNavigation, useParams } from "react-router";
import { useQuizDetailedQuery, useResolveSessionQuery } from "@/pages/quiz/queries";
import { useFinishSessionMutation, useSetSessionAnswerMutation } from "@/pages/quiz/mutations";

export default function Questions() {
	const sessionKey = sessionStorage.getItem("quiz-app_sessionKey");
	if (!sessionKey) throw new Error("No session key");

	const params = useParams();
	const quizId = Number(params["quizId"]);
	const index = Number(params["index"]);

	const { data: quiz } = useQuizDetailedQuery(quizId);
	const { data: session } = useResolveSessionQuery(sessionKey);

	const setAnswerMutation = useSetSessionAnswerMutation(index, sessionKey);
	const finishSessionMutation = useFinishSessionMutation(sessionKey);

	const [answer, setAnswer] = useState<QuestionAnswer>(session.answers[index]);
	useEffect(() => {
		setAnswer(session.answers[index]);
	}, [index]);

	const navigate = useNavigate();
	const handleSubmitAnswer = async () => {
		await setAnswerMutation.mutateAsync(answer);
		navigate(`../${index + 1}`);
	};

	const handleComplete = async () => {
		await setAnswerMutation.mutateAsync(answer);
		await finishSessionMutation.mutateAsync();
		navigate("../result");
	};

	const isPending = setAnswerMutation.isPending || finishSessionMutation.isPending;

	return (
		<>
			<div className="flex justify-between mb-8">
				<button disabled={index === 0} onClick={() => navigate(`../${index - 1}`)} className="button p-2 rounded-full">
					<LuArrowLeft />
				</button>

				<div>вопрос {index + 1}</div>

				<button
					disabled={index === quiz.questions.length - 1}
					onClick={() => navigate(`../${index + 1}`)}
					className="button p-2 rounded-full"
				>
					<LuArrowRight />
				</button>
			</div>

			<QuestionDisplay onChangeAnswer={setAnswer} question={quiz.questions[index]} answer={answer} />

			{index < quiz.questions.length - 1 && (
				<button
					onClick={handleSubmitAnswer}
					disabled={answer.length === 0 || isPending}
					className="button text-white bg-surface-2 px-4 py-2 rounded-md flex items-center justify-center gap-4 mt-8 w-full"
				>
					Ответить <LuArrowRight />
				</button>
			)}

			{index === quiz.questions.length - 1 && (
				<button
					onClick={handleComplete}
					disabled={isPending}
					className="button text-white bg-green-500 px-4 py-2 rounded-md flex items-center justify-center gap-4 mt-8 w-full"
				>
					Завершить <LuCheck />
				</button>
			)}
		</>
	);
}
