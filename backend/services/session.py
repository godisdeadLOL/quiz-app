import nanoid
from pydantic import TypeAdapter
import crud
from db import DatabaseContext
from schemas.session import SessionModel
from utils.session import generate_session

import services.quiz as quiz_service


async def create(db_context: DatabaseContext, quiz_id: str):
    (db, _) = db_context
    collection = db.get_collection("sessions")

    quiz = await quiz_service.get_by_id(db_context, quiz_id)
    assert quiz

    quiz_session = generate_session(quiz)
    await collection.insert_one(quiz_session.model_dump())

    return quiz_session


async def get_by_id(db_context: DatabaseContext, session_id: str):
    return await crud.get_by_id(db_context, "sessions", SessionModel, session_id)


async def get_many_by_ids(db_context: DatabaseContext, session_ids: list[str]):
    return await crud.get_many_by_ids(db_context, "sessions", SessionModel, session_ids)
