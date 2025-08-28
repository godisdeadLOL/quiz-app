import { QuestionFeedbackDisplay } from "@/components/QuestionFeedbackDisplay";
import { CircularProgress } from "@/ui/CircularProgress";
import { useQuizDetailedQuery, useResolveSessionQuery } from "@/pages/quiz/queries";
import { useParams } from "react-router";
import { useState, useEffect } from "react";

export default function Result() {
	const sessionKey = sessionStorage.getItem("quiz-app_sessionKey");
	if (!sessionKey) throw new Error("No session key");

	const params = useParams();
	const quizId = Number(params["quizId"]);

	const { data: quiz } = useQuizDetailedQuery(quizId);
	const { data: session } = useResolveSessionQuery(sessionKey);
	const quizFeedback = session.feedback!;

	const [started, setStarted] = useState(false);
	useEffect(() => setStarted(true), []);

	return (
		<div>
			<div className="flex justify-center items-center p-8">
				<CircularProgress value={started ? Math.floor((quizFeedback.score / quizFeedback.scoreMax) * 100) : 0}>
					<div className="text-white text-2xl">{quizFeedback.score}</div>
					<div>из {quizFeedback.scoreMax}</div>
				</CircularProgress>
			</div>

			<div className="flex flex-col gap-6 mt-8">
				{quiz.questions.map((question, i) => {
					const feedback = quizFeedback.questions[i];
					return <QuestionFeedbackDisplay key={i} index={i} question={question} feedback={feedback} />;
				})}
			</div>
		</div>
	);
}
