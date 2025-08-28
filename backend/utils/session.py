import nanoid
from schemas.quiz import QuizModel
from schemas.session import SessionModel


def generate_session(quiz: QuizModel):
    sessionId = nanoid.generate(size=8)
    sessionKey = nanoid.generate()

    answers = [[]] * len(quiz.questions)

    quiz_session = SessionModel(quiz_id=quiz.id, id=sessionId, key=sessionKey, status="in-progress", answers=answers, feedback=None)

    return quiz_session
