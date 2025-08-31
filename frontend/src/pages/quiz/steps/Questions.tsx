import { QuestionDisplay } from "@/components/QuestionDisplay";
import type { QuestionAnswer } from "@/api/types";
import { useEffect, useState } from "react";
import { LuArrowLeft, LuArrowRight, LuClock, LuDrill, LuFlag } from "react-icons/lu";
import { useNavigate, useParams } from "react-router";
import { useQuizDetailedQuery, useSessionQuery } from "@/pages/quiz/queries";
import { useSetSessionAnswerMutation } from "@/pages/quiz/mutations";
import { useSessionKey } from "@/hooks/useSessionKey";
import { IconButton } from "@/ui/IconButton";
import { Timer } from "@/components/Timer";
import { useQueryClient } from "@tanstack/react-query";
import { StatusBar } from "../ui/StatusBar";

export default function Questions() {
	const navigate = useNavigate();
	const client = useQueryClient();

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
			<StatusBar value={questionIndex / quiz.questions.length} />

			<div className="flex gap-4 items-center mb-8">
				{/* Навигация по вопросам */}
				<IconButton disabled={questionIndex === 0} onClick={handlePrev}>
					<LuArrowLeft />
				</IconButton>

				<div>
					<span className="text-green-500 text-2xl">0{questionIndex + 1}</span>/<span>0{quiz.questions.length}</span>
				</div>

				<IconButton onClick={handleNext}>
					<LuArrowRight />
				</IconButton>

				{/* Таймер */}
				{session.duration && (
					<div className="ml-auto flex gap-2 items-center">
						<LuClock />
						<Timer onComplete={handleTimeout} startedAt={session.created_at} duration={session.duration} />
					</div>
				)}
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

	function handleTimeout() {
		client.removeQueries({ queryKey: ["session", sessionId] });
		navigate(`../`, { relative: "path" });
	}

	function handleSubmitAnswer() {
		setAnswerMutation.mutateAsync({ index: questionIndex, answer: answer }).then(() => handleNext());
	}
}
