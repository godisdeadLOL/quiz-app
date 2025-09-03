from pydantic import BaseModel


class TokenPayload(BaseModel):
    name: str


class RegisterBody(BaseModel):
    name: str
    mail: str
    password: str


class ConfirmBody(BaseModel):
    confirm_code: str


class LoginForm(BaseModel):
    username: str
    password: str
