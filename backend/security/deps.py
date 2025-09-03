from fastapi import Depends, HTTPException, Header
from fastapi.security import OAuth2PasswordBearer

from errors import AppError
from errors.auth import UnauthorizedError
from security.utils import validate_access_token


def session_key_scheme(x_session_key: str = Header()):
    return x_session_key


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login", refreshUrl="auth/refresh", auto_error=False)


def get_auth_payload(token: str = Depends(oauth2_scheme)):
    payload = validate_access_token(token)

    if not payload:
        raise AppError(UnauthorizedError)

    return payload
