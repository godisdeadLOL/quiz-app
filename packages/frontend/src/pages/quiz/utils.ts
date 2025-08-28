import type { QuestionFeedback, QuizPublic, QuizFeedback, QuizSessionPublic } from "shared/types";

export function generateSession(quiz: QuizPublic) {
	const session: QuizSessionPublic = {
		quizId: 0,
		status: "in-progress",
		answers: quiz.questions.map(() => []),
	};

	return session;
}

export function calculateFeedback(quiz: QuizPublic, session: QuizSessionPublic) {
	const quizFeedback: QuizFeedback = {
		score: 0,
		scoreMax: 0,
		questions: [],
	};

	for (let i = 0; i < quiz.questions.length; i++) {
		const rightAnswer = quiz.questions[i].answer;
		const currentAnswer = session.answers[i];

		const questionFeedback: QuestionFeedback = {
			score: 0,
			scoreMax: quiz.questions[i].score,
			rightAnswer: [...rightAnswer],
			currentAnswer: [...currentAnswer],
			comment: "",
		};

		quizFeedback.questions.push(questionFeedback);

		// проверка ответа на правильность
		let isCorrect = true;
		for (const val of rightAnswer) {
			if (!currentAnswer.includes(val)) {
				isCorrect = false;
				break;
			}
		}

		// подсчет счета и максимального счета
		if (isCorrect) {
			questionFeedback.score = questionFeedback.scoreMax;
			quizFeedback.score += questionFeedback.score;
		}
		quizFeedback.scoreMax += questionFeedback.scoreMax;
	}

	return quizFeedback;
}
