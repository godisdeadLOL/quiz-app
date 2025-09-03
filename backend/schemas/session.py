import time
from typing import Literal, Optional
from pydantic import BaseModel, Field, computed_field, field_validator, model_validator

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
    __collection_name__ = "sessions"
    
    id: str
    key: str
    quiz_id: str

    answers: list[QuestionAnswer]

    created_at: float = Field(default_factory=lambda: time.time())
    feedback: Optional[QuizFeedback]

    duration: int | None

    @computed_field
    @property
    def is_expired(self) -> bool:
        now = time.time()

        if not self.duration:
            return False
        return now - self.created_at > self.duration

    @computed_field
    @property
    def is_finished(self) -> bool:
        return self.is_expired or self.feedback != None


class QuizSessionPreview(BaseModel):
    id: str
    quiz_id: str

    created_at: float
    duration: int | None
    
    is_expired: bool
    is_finished: bool


class QuizSessionDetailed(QuizSessionPreview):
    answers: list[QuestionAnswer]
    feedback: Optional[QuizFeedback]


class QuizSessionSecure(QuizSessionDetailed):
    key: str


class QuizSessionGetManyParams(BaseModel):
    ids: list[str]
