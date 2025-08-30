import { QuestionDisplay } from "@/components/QuestionDisplay";
import type { QuestionAnswer } from "@/api/types";
import { useEffect, useState } from "react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { useNavigate, useParams } from "react-router";
import { useQuizDetailedQuery, useSessionQuery } from "@/pages/quiz/queries";
import { useSetSessionAnswerMutation } from "@/pages/quiz/mutations";
import { useSessionKey } from "@/hooks/useSessionKey";

export default function Questions() {
	const navigate = useNavigate();

	// параметры
	const params = useParams();
	const quizId = params["quizId"]!;
	const sessionId = params["sessionId"]!;
	const questionIndex = Number(params["questionIndex"])-1;

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
			<div className="flex justify-between mb-8">
				<button disabled={questionIndex === 0} onClick={handlePrev} className="button p-2 rounded-full">
					<LuArrowLeft />
				</button>

				<div className="text-text-accent">Вопрос {questionIndex + 1}</div>

				<button onClick={handleNext} className="button p-2 rounded-full">
					<LuArrowRight />
				</button>
			</div>

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

	function handleNext() {
		if (questionIndex === quiz.questions.length - 1) navigate("../finish", { relative: "path" });
		else navigate(`../${questionIndex + 2}`, { relative: "path" });
	}

	function handlePrev() {
		navigate(`../${questionIndex}`, { relative: "path" });
	}

	async function handleSubmitAnswer() {
		await setAnswerMutation.mutateAsync({ index: questionIndex, answer: answer });
		handleNext();
	}
}
