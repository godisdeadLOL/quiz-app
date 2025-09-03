from fastapi import APIRouter, Depends, HTTPException

import crud
from db import DatabaseContext, get_db_context
from schemas.quiz import QuizDetailed, QuizModel, QuizPreview

from security.deps import session_key_scheme
import services.quiz as quiz_service


router = APIRouter()


@router.get("/detailed/{quiz_id}", response_model=QuizDetailed)
async def get_quiz_detailed(quiz_id: str, session_key: str = Depends(session_key_scheme), db_context: DatabaseContext = Depends(get_db_context)):
    isAccessible = await quiz_service.check_access(db_context, quiz_id, session_key)
    if not isAccessible:
        raise HTTPException(401)

    quiz = await quiz_service.get_by_id(db_context, quiz_id)
    if not quiz:
        raise HTTPException(404)

    return quiz


@router.get("/preview/{quiz_id}", response_model=QuizPreview)
async def get_quiz_preview(quiz_id: str, db_context: DatabaseContext = Depends(get_db_context)):
    quiz = await quiz_service.get_by_id(db_context, quiz_id)
    if not quiz:
        raise HTTPException(404)

    return quiz


@router.get("", response_model=list[QuizPreview])
async def list_quizes(db_context: DatabaseContext = Depends(get_db_context)):
    return await quiz_service.list(db_context)
