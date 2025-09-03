from pydantic import BaseModel

class UserNameTakenError(BaseModel):
    status: int = 409
    details: str = "user_name_taken"


class UserNotExistError(BaseModel):
    status: int = 404
    details: str = "user_not_exist"