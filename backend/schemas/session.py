import time
from typing import Literal, Optional
from pydantic import BaseModel, Field, field_validator, model_validator

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


type SessionStatus = Literal["in-progress", "finished"]


class QuizSessionModel(BaseModel):
    id: str
    key: str
    quiz_id: str

    answers: list[QuestionAnswer]

    created_at: float = Field(default_factory=lambda: time.time())
    status: SessionStatus
    feedback: Optional[QuizFeedback]

    duration: int | None


class QuizSessionPreview(BaseModel):
    id: str
    quiz_id: str
    status: SessionStatus

    created_at: float
    duration: int | None

    # @model_validator(mode="after")
    # @classmethod
    # def validate_status(cls, value):
    #     now = time.time()
    #     if value.duration and now - value.created_at > value.duration:
    #         value.status = "finished"

    #     return value


class QuizSessionDetailed(QuizSessionPreview):
    answers: list[QuestionAnswer]
    feedback: Optional[QuizFeedback]


class QuizSessionSecure(QuizSessionDetailed):
    key: str


class QuizSessionGetManyParams(BaseModel):
    ids: list[str]
