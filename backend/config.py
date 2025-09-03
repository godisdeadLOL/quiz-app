from typing import Optional
from pydantic import BaseModel, Field
from dotenv import load_dotenv, dotenv_values

load_dotenv()


class Config(BaseModel):
    mongodb_url: str = Field(alias="MONGODB_URL")
    openapi_export_path: Optional[str] = Field(default=None, alias="OPENAPI_EXPORT_PATH")

    jwt_access_secret: str = Field(alias="JWT_ACCESS_SECRET")
    jwt_refresh_secret: str = Field(alias="JWT_REFRESH_SECRET")
    jwt_algo: str = Field(alias="JWT_ALGO")
    
    jwt_access_duration : int = Field(alias="JWT_ACCESS_DURATION")
    jwt_refresh_duration : int = Field(alias="JWT_REFRESH_DURATION")

    smtp_host: str = Field(alias="SMTP_HOST")
    smtp_port: int = Field(alias="SMTP_PORT")
    smtp_user: str = Field(alias="SMTP_USER")
    smtp_password: str = Field(alias="SMTP_PASSWORD")


config = Config.model_validate(dotenv_values(".env"))
