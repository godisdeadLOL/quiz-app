from typing import Annotated, Optional
from fastapi import APIRouter, Cookie, Depends, Form, HTTPException, Request, Response
from fastapi.security import OAuth2PasswordRequestForm
from db import DatabaseContext, get_db_context
from errors import AppError
from errors.user import UserNotExistError
from schemas.auth import ConfirmBody, LoginForm, RegisterBody, TokenPayload

from security.deps import get_auth_payload
from security.utils import validate_refresh_token
import services.auth as auth_service

router = APIRouter()


@router.post("/register")
async def register(body: RegisterBody, db_context: DatabaseContext = Depends(get_db_context)):
    await auth_service.register(db_context, body.name, body.mail, body.password)
    pass


@router.post("/confirm")
async def confirm(name: str, body: ConfirmBody, db_context: DatabaseContext = Depends(get_db_context)):
    await auth_service.confirm(db_context, name, body.confirm_code)


@router.post("/login")
async def login(
    response: Response,
    form_data: LoginForm = Form(),
    db_context: DatabaseContext = Depends(get_db_context),
):
    access_token, refresh_token = await auth_service.login(db_context, form_data.username, form_data.password)

    response.set_cookie("refresh_token", refresh_token, httponly=True)
    return {"access_token": access_token}


@router.post("/refresh")
async def refresh(
    response: Response,
    refresh_token: str = Cookie(include_in_schema=False),
    db_context: DatabaseContext = Depends(get_db_context),
):
    print(refresh_token)
    
    access_token, refresh_token = await auth_service.refresh(db_context, refresh_token)

    response.set_cookie("refresh_token", refresh_token, httponly=True)
    return {"access_token": access_token}


@router.get("/current", responses={404: {"model": UserNotExistError}})
def get_current_user(payload: TokenPayload = Depends(get_auth_payload)):
    return payload
