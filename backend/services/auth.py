from db import DatabaseContext
from errors import AppError, WrongConfirmCodeError, UserNameTakenError, UserNotExistError
from errors.auth import AlreadyConfirmedError, LoginError, UnauthorizedError, WrongRefreshToken
from schemas.auth import TokenPayload
from schemas.user import UserConfirmation, UserModel

from security.utils import generate_access_token, generate_confirm_code, generate_refresh_token, hash_password, validate_refresh_token
import services.user as user_service


from config import config


async def register(db_context: DatabaseContext, name: str, email: str, password: str):
    (db, _) = db_context
    collection = db.get_collection(UserModel.__collection_name__)

    if await user_service.check_exist_by_name(db_context, name):
        raise AppError(UserNameTakenError)

    user = UserModel(
        name=name,
        email=email,
        password_hash=hash_password(password),
        confirmation=UserConfirmation(confirm_code=generate_confirm_code()),
    )
    await collection.insert_one(user.model_dump())

    return user


async def confirm(db_context: DatabaseContext, name: str, confirm_code: str):
    (db, _) = db_context
    collection = db.get_collection(UserModel.__collection_name__)

    user_raw = await collection.find_one({"name": name})
    if not user_raw:
        raise AppError(UserNotExistError)

    user = UserModel.model_validate(user_raw)
    if user.confirmation.is_confirmed:
        raise AppError(AlreadyConfirmedError)

    result = await collection.update_one(
        {"name": name, "confirmation.confirm_code": confirm_code},
        {"$set": {"confirmation.is_confirmed": True, "confirmation.confirm_code": ""}},
    )

    if result.modified_count == 0:
        raise AppError(WrongConfirmCodeError)


def generate_tokens(user: UserModel):
    payload = TokenPayload(name=user.name)

    access_token = generate_access_token(payload)
    refresh_token = generate_refresh_token(payload)

    return (access_token, refresh_token)


async def login(db_context: DatabaseContext, name: str, password: str):
    (db, _) = db_context
    collection = db.get_collection(UserModel.__collection_name__)

    password_hash = hash_password(password)

    user_raw = await collection.find_one({"name": name, "password_hash": password_hash})
    if not user_raw:
        raise AppError(LoginError)

    user = UserModel.model_validate(user_raw)
    return generate_tokens(user)


async def refresh(db_context: DatabaseContext, refresh_token: str):
    (db, _) = db_context
    collection = db.get_collection(UserModel.__collection_name__)

    payload = validate_refresh_token(refresh_token)
    if not payload:
        raise AppError(WrongRefreshToken)

    user_raw = await collection.find_one({"name": payload.name})
    if not user_raw:
        raise AppError(UserNotExistError)

    user = UserModel.model_validate(user_raw)
    return generate_tokens(user)
