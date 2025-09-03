from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.routing import APIRoute
from fastapi.middleware.cors import CORSMiddleware

from errors import AppError
from routers.session import router as session_router
from routers.quiz import router as quiz_router
from routers.auth import router as auth_router

import json
from config import config
from schemas.quiz import QuizModel
from utils import to_camel_case


def id_generator(route: APIRoute):
    return to_camel_case(route.name)


app = FastAPI(generate_unique_id_function=id_generator)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(session_router, prefix="/sessions", tags=["Session"])
app.include_router(quiz_router, prefix="/quizes", tags=["Quiz"])
app.include_router(auth_router, prefix="/auth", tags=["Auth"])


@app.exception_handler(AppError)
def habdle_app_error(_, exc: AppError):
    return JSONResponse(status_code=exc.body.status, content={"details": exc.body.details})


if config.openapi_export_path:
    openapi = app.openapi()

    openapi_raw = json.dumps(app.openapi())
    with open(config.openapi_export_path, mode="w", encoding="utf-8") as f:
        f.write(openapi_raw)