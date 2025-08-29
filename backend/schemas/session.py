from typing import Literal, Optional
from pydantic import BaseModel

from schemas.shared import QuestionAnswer


class QuestionFeedback(BaseModel):
    current_answer: QuestionAnswer
    right_answer: QuestionAnswer

    score: int
    score_max: int

    comment: str


class QuizFeedback(BaseModel):
    questions: list[QuestionFeedback]

    score: int
    score_max: int


class SessionModel(BaseModel):
    id: str
    key: str
    quiz_id: str

    answers: list[QuestionAnswer]

    status: Literal["in-progress", "finished"]
    feedback: Optional[QuizFeedback]


class SessionPreview(BaseModel):
    id: str
    quiz_id: str
    status: Literal["in-progress", "finished"]


class SessionDetailed(SessionPreview):
    answers: list[QuestionAnswer]
    feedback: Optional[QuizFeedback]


class SessionSecure(SessionDetailed):
    key: str


class SessionGetManyParams(BaseModel):
    ids: list[str]
