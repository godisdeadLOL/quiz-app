import { QuestionFeedbackDisplay } from "@/components/QuestionFeedbackDisplay";
import { CircularProgress } from "@/ui/CircularProgress";
import { useQuizDetailedQuery, useSessionQuery } from "@/pages/quiz/api/queries";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { useSessionKey } from "@/hooks/useSessionKey";
import { FeedbackQuestionsGrid } from "@/components/FeedbackQuestionsGrid";

export default function Result() {
	// параметры
	const params = useParams();
	const quizId = params["quizId"]!;
	const sessionId = params["sessionId"]!;

	const sessionKey = useSessionKey(quizId, sessionId);

	// данные
	const { data: quiz } = useQuizDetailedQuery(quizId, sessionKey);
	const { data: session } = useSessionQuery(sessionId, sessionKey);

	const quizFeedback = session.feedback!;

	// проигрыш анимации
	const [started, setStarted] = useState(false);
	useEffect(() => setStarted(true), []);

	return (
		<div>
			<div className="flex justify-center items-center p-8">
				<CircularProgress value={started ? Math.floor((quizFeedback.score / quizFeedback.score_max) * 100) : 0}>
					<div className="text-white text-2xl">{quizFeedback.score}</div>
					<div>из {quizFeedback.score_max}</div>
				</CircularProgress>
			</div>

			<FeedbackQuestionsGrid feedback={quizFeedback} actions={{ onSelect: handleGoToQuestion }} />

			<div className="flex flex-col gap-6 mt-8">
				{quiz.questions.map((question, i) => {
					const feedback = quizFeedback.questions[i];
					return <QuestionFeedbackDisplay id={`question-${i + 1}`} key={i} index={i} question={question} feedback={feedback} />;
				})}
			</div>
		</div>
	);

	function handleGoToQuestion(index: number) {
		window.location.hash = `question-${index + 1}`;
	}
}
