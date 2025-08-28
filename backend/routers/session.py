from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, Path, Query
from db import DatabaseContext, get_db_context
from schemas.session import SessionGetManyParams, SessionDetailed, SessionPreview, SessionSecure
import services.session as session_service
from security import session_key_scheme

router = APIRouter()


@router.get("/{session_id}", response_model=SessionDetailed)
async def get(session_id: str = Path(), session_key: str = Depends(session_key_scheme), db_context: DatabaseContext = Depends(get_db_context)):
    quiz_session = await session_service.get_by_id(db_context, session_id)
    
    if not quiz_session:
        raise HTTPException(404)

    if quiz_session.key != session_key:
        raise HTTPException(401)

    return quiz_session


@router.get("", response_model=list[SessionPreview])
async def get_many(filters: Annotated[SessionGetManyParams, Query()], db_context: DatabaseContext = Depends(get_db_context)):
    quiz_sessions = await session_service.get_many_by_ids(db_context, filters.ids)
    return quiz_sessions


@router.post("/", response_model=SessionSecure)
async def create(quiz_id: str = Query(), db_context: DatabaseContext = Depends(get_db_context)):
    quiz_session = await session_service.create(db_context, quiz_id)
    return quiz_session
