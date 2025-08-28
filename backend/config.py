from pydantic import BaseModel, Field
from dotenv import load_dotenv, dotenv_values

load_dotenv()


class Config(BaseModel):
    mongodb_url: str = Field(alias="MONGODB_URL")


config = Config.model_validate(dotenv_values(".env"))