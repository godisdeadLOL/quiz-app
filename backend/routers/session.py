from typing import Annotated
from fastapi import APIRouter, Body, Depends, HTTPException, Path, Query
from db import DatabaseContext, get_db_context
from schemas.session import QuizSessionGetManyParams, QuizSessionDetailed, QuizSessionPreview, QuizSessionSecure
from schemas.shared import QuestionAnswer
from security import session_key_scheme

import services.session as session_service

router = APIRouter()


@router.get("/{session_id}", response_model=QuizSessionDetailed)
async def get_session(
    session_id: str = Path(),
    session_key: str = Depends(session_key_scheme),
    db_context: DatabaseContext = Depends(get_db_context),
):
    if not await session_service.check_access(db_context, session_id, session_key):
        raise HTTPException(401)

    quiz_session = await session_service.get_by_id(db_context, session_id)
    if not quiz_session:
        raise HTTPException(404)

    if quiz_session.is_expired:
        return await session_service.fill_feedback(db_context, session_id)

    return quiz_session


@router.get("", response_model=list[QuizSessionPreview])
async def get_many_sessions(
    filters: Annotated[QuizSessionGetManyParams, Query()],
    db_context: DatabaseContext = Depends(get_db_context),
):
    quiz_sessions = await session_service.get_many_by_ids(db_context, filters.ids)
    return quiz_sessions


@router.post("/", response_model=QuizSessionSecure)
async def create_session(quiz_id: str = Query(), db_context: DatabaseContext = Depends(get_db_context)):
    # todo: quiz_service.exists

    quiz_session = await session_service.create(db_context, quiz_id)
    return quiz_session


@router.put("/{session_id}/answers/{answer_index}", response_model=QuizSessionDetailed)
async def update_session_answer(
    session_id: str,
    answer_index: int,
    answer: QuestionAnswer = Body(),
    session_key: str = Depends(session_key_scheme),
    db_context: DatabaseContext = Depends(get_db_context),
):
    if not await session_service.check_access(db_context, session_id, session_key):
        raise HTTPException(401)

    if await session_service.check_expired(db_context, session_id):
        raise HTTPException(423)

    answer = list(set(answer))  # убрать дубликаты
    if not await session_service.validate_answer(db_context, session_id, answer_index, answer):
        raise HTTPException(422)

    return await session_service.update_answer(db_context, session_id, answer_index, answer)


@router.post("/{session_id}/finish", response_model=QuizSessionDetailed)
async def finish_session(
    session_id: str,
    session_key: str = Depends(session_key_scheme),
    db_context: DatabaseContext = Depends(get_db_context),
):
    if not await session_service.check_access(db_context, session_id, session_key):
        raise HTTPException(401)

    if await session_service.check_expired(db_context, session_id):
        raise HTTPException(423)

    session = await session_service.fill_feedback(db_context, session_id)
    return session
