import { QuestionDisplay } from "@/components/QuestionDisplay";
import type { QuestionAnswer } from "@/api/types";
import { useEffect, useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import { useParams } from "react-router";
import { useQuizDetailedQuery, useSessionQuery } from "@/pages/quiz/api/queries";
import { useSetSessionAnswerMutation } from "@/pages/quiz/api/mutations";
import { useSessionKey } from "@/hooks/useSessionKey";
import { useQuestionsLayout } from "./context";

export default function Questions() {
	const { navigateNext } = useQuestionsLayout();

	// параметры
	const params = useParams();
	const quizId = params["quizId"]!;
	const sessionId = params["sessionId"]!;
	const questionIndex = Number(params["questionIndex"]) - 1;

	const sessionKey = useSessionKey(quizId, sessionId);

	// данные
	const { data: quiz } = useQuizDetailedQuery(quizId, sessionKey);
	const { data: session } = useSessionQuery(sessionId, sessionKey);

	// мутации
	const setAnswerMutation = useSetSessionAnswerMutation(sessionId, sessionKey);
	const isPending = setAnswerMutation.isPending;

	const [answer, setAnswer] = useState<QuestionAnswer>(session.answers[questionIndex]);
	useEffect(() => {
		setAnswer(session.answers[questionIndex]);
	}, [questionIndex]);

	return (
		<>
			<QuestionDisplay onChangeAnswer={setAnswer} question={quiz.questions[questionIndex]} answer={answer} />

			<button
				onClick={handleSubmitAnswer}
				disabled={answer.length === 0 || isPending}
				className="button text-white bg-surface-2 px-4 py-2 rounded-md flex items-center justify-center gap-4 mt-8 w-full"
			>
				Ответить <LuArrowRight />
			</button>
		</>
	);

	function handleSubmitAnswer() {
		setAnswerMutation.mutateAsync({ index: questionIndex, answer: answer }).then(() => navigateNext());
	}
}
