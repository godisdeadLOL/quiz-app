import time
import nanoid
from pydantic import TypeAdapter
from pymongo import ReturnDocument
import crud
from db import DatabaseContext
from schemas.session import QuizSessionModel
from schemas.shared import QuestionAnswer

import utils.session as session_utils

import services.quiz as quiz_service


async def check_access(db_context: DatabaseContext, session_id: str, session_key: str):
    (db, _) = db_context
    collection = db.get_collection("sessions")

    return not not await collection.find_one({"id": session_id, "key": session_key})


async def create(db_context: DatabaseContext, quiz_id: str):
    (db, session) = db_context
    collection = db.get_collection("sessions")

    quiz = await quiz_service.get_by_id(db_context, quiz_id)
    assert quiz

    quiz_session = session_utils.generate_session(quiz)
    await collection.insert_one(quiz_session.model_dump(), session=session)

    return quiz_session


async def get_by_id(db_context: DatabaseContext, session_id: str):
    quiz_session = await crud.get_by_id(db_context, "sessions", QuizSessionModel, session_id)
    return quiz_session


async def get_many_by_ids(db_context: DatabaseContext, session_ids: list[str]):
    return await crud.get_many_by_ids(db_context, "sessions", QuizSessionModel, session_ids)


async def validate_answer(db_context: DatabaseContext, session_id: str, answer_index: int, answer: QuestionAnswer):
    quiz_session = await get_by_id(db_context, session_id)
    assert quiz_session

    quiz = await quiz_service.get_by_id(db_context, quiz_session.quiz_id)
    assert quiz

    return await session_utils.validate_answer(quiz_session, quiz, answer_index, answer)


async def update_answer(db_context: DatabaseContext, session_id: str, answer_index: int, answer: QuestionAnswer):
    (db, session) = db_context
    collection = db.get_collection("sessions")

    quiz_session_raw = await collection.find_one_and_update(
        {"id": session_id},
        {"$set": {f"answers.{answer_index}": answer}},
        session=session,
        return_document=ReturnDocument.AFTER,
    )
    quiz_session = QuizSessionModel.model_validate(quiz_session_raw)

    return quiz_session


async def finish(db_context: DatabaseContext, session_id: str):
    await try_finish(db_context, [session_id], True)

    quiz_session = await get_by_id(db_context, session_id)
    assert quiz_session

    return quiz_session


# todo: оптимизировать
async def try_finish(db_context: DatabaseContext, session_id: str, force: bool = False):
    (db, session) = db_context
    collection = db.get_collection("sessions")

    quiz_session = await get_by_id(db_context, session_id)
    if not quiz_session:
        return

    # Условия завершения сессии
    is_expired = quiz_session.duration and time.time() - quiz_session.created_at > quiz_session.duration
    if not is_expired and not force:
        return

    quiz = await quiz_service.get_by_id(db_context, quiz_session.quiz_id)
    if not quiz:
        return

    feedback = session_utils.calculate_feedback(quiz_session, quiz)
    await collection.update_one(
        {"id": quiz_session.id},
        {"$set": {"status": "finished", "feedback": feedback.model_dump()}},
        session=session,
    )


async def check_expired(db_context: DatabaseContext, session_id: str):
    (db, session) = db_context
    collection = db.get_collection("sessions")
