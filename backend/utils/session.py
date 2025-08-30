import nanoid
from schemas.quiz import QuizModel
from schemas.session import QuestionFeedback, QuizFeedback, QuizSessionModel
from schemas.shared import QuestionAnswer


def generate_session(quiz: QuizModel):
    sessionId = nanoid.generate(size=8)
    sessionKey = nanoid.generate()

    answers = [[]] * len(quiz.questions)

    quiz_session = QuizSessionModel(
        quiz_id=quiz.id,
        id=sessionId,
        key=sessionKey,
        answers=answers,
        feedback=None,
        duration=quiz.duration,
    )

    return quiz_session


def calculate_feedback(session: QuizSessionModel, quiz: QuizModel):
    quiz_feedback = QuizFeedback(questions=[], score=0, score_max=0)

    for i in range(len(quiz.questions)):
        right_answer = quiz.questions[i].answer
        current_answer = session.answers[i]

        question_feedback = QuestionFeedback(
            score=0,
            score_max=quiz.questions[i].score,
            right_answer=right_answer,
            current_answer=current_answer,
            comment="",
        )
        quiz_feedback.questions.append(question_feedback)

        # проверка ответа на правильность
        isRight = True
        for val in right_answer:
            if not val in current_answer:
                isRight = False
                break

        # подсчет счета и максимального счета
        if isRight:
            question_feedback.score += question_feedback.score_max
            quiz_feedback.score += question_feedback.score
        quiz_feedback.score_max += question_feedback.score_max

    session.feedback = quiz_feedback

    return quiz_feedback


async def validate_answer(session: QuizSessionModel, quiz: QuizModel, answer_index: int, answer: QuestionAnswer):
    question = quiz.questions[answer_index]

    if question.mode == "single" and len(answer) > 1:
        return False

    if len(answer) > len(question.options):
        return False

    if len([value for value in answer if value < 0 or value >= len(question.options)]) > 0:
        return False

    return True
