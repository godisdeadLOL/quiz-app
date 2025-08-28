from pydantic import BaseModel

from schemas.shared import QuestionAnswer


class QuestionOption(BaseModel):
    description: str


class QuestionModel(BaseModel):
    description: str
    options: list[QuestionOption]
    answer: QuestionAnswer


class QuizModel(BaseModel):
    id: str
    title: str
    description: str
    questions: list[QuestionModel]

class QuestionPublic(BaseModel):
    description: str
    options: list[QuestionOption]

class QuizPreview(BaseModel):
    id: str
    title: str
    description: str


class QuizDetailed(QuizPreview):
    questions: list[QuestionPublic]
