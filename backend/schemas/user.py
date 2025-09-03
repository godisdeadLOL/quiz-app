from pydantic import BaseModel, computed_field


class UserConfirmation(BaseModel):
    is_confirmed: bool = False
    confirm_code: str


class UserModel(BaseModel):
    __collection_name__ = "users"

    email: str
    name: str
    password_hash: str

    confirmation: UserConfirmation

    @computed_field
    @property
    def is_active(self) -> bool:
        return self.confirmation.is_confirmed
