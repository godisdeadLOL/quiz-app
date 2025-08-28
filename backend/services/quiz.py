from pydantic import TypeAdapter
from db import DatabaseContext
from schemas.quiz import QuizModel

with open("quizes.json", encoding="utf-8") as f:
    type_adapter = TypeAdapter(list[QuizModel])
    quizes_data = type_adapter.validate_json(f.read())


async def get_by_id(db_context: DatabaseContext, quiz_id: str):
    quiz = next((quiz for quiz in quizes_data if quiz.id == quiz_id), None)
    return quiz


async def check_access(db_context: DatabaseContext, quiz_id: str, session_key: str):
    (db, _) = db_context
    collection = db.get_collection("sessions")

    return not not await collection.find_one({"quiz_id": quiz_id, "key": session_key})


async def list(db_context: DatabaseContext):
    return quizes_data
