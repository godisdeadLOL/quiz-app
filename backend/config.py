from typing import Optional
from pydantic import BaseModel, Field
from dotenv import load_dotenv, dotenv_values

load_dotenv()


class Config(BaseModel):
    mongodb_url: str = Field(alias="MONGODB_URL")
    openapi_export_path: Optional[str] = Field(default=None, alias="OPENAPI_EXPORT_PATH")


config = Config.model_validate(dotenv_values(".env"))
