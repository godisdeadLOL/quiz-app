import time
from typing import Optional
import nanoid
import jwt
from config import config
from schemas.auth import TokenPayload


def hash_password(password: str):
    return password


def generate_confirm_code():
    return nanoid.generate(size=8)


def generate_jwt_token(payload: TokenPayload, key: str, duration: int):
    exp = int(time.time()) + duration
    access_token = jwt.encode({**payload.model_dump(), "exp": exp}, key, config.jwt_algo)

    return access_token


def validate_jwt_token(token: str, key: str):
    try:
        payload_raw = jwt.decode(token, key, config.jwt_algo)
        return TokenPayload.model_validate(payload_raw)
    except:
        return None


def generate_access_token(payload: TokenPayload):
    return generate_jwt_token(payload, config.jwt_access_secret, config.jwt_access_duration)


def generate_refresh_token(payload: TokenPayload):
    return generate_jwt_token(payload, config.jwt_refresh_secret, config.jwt_refresh_duration)


def validate_access_token(token: str):
    return validate_jwt_token(token, config.jwt_access_secret)


def validate_refresh_token(token: str):
    return validate_jwt_token(token, config.jwt_refresh_secret)
