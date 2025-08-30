from typing import Literal
from pydantic import BaseModel

from schemas.shared import QuestionAnswer


class QuestionOption(BaseModel):
    description: str


class QuestionModel(BaseModel):
    description: str
    options: list[QuestionOption]
    answer: QuestionAnswer
    score: int
    mode: Literal["single", "multiple"]


class QuizModel(BaseModel):
    id: str
    title: str
    description: str
    questions: list[QuestionModel]
    duration: int | None


class QuestionPublic(BaseModel):
    description: str
    options: list[QuestionOption]
    mode: Literal["single", "multiple"]


class QuizPreview(BaseModel):
    id: str
    title: str
    description: str


class QuizDetailed(QuizPreview):
    questions: list[QuestionPublic]
