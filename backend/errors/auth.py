from pydantic import BaseModel


class WrongConfirmCodeError(BaseModel):
    status: int = 400
    details: str = "wrong_confirm_code"


class AlreadyConfirmedError(BaseModel):
    status: int = 400
    details: str = "user_already_confirmed"


class LoginError(BaseModel):
    status: int = 401
    details: str = "wrong_credentials"


class WrongRefreshToken(BaseModel):
    status: int = 401
    details: str = "wrong_refresh_token"


class UnauthorizedError(BaseModel):
    status: int = 401
    details: str = "unauthorized"
