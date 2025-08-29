from fastapi import FastAPI
from fastapi.routing import APIRoute

from routers.session import router as session_router
from routers.quiz import router as quiz_router

import json
from config import config
from utils import to_camel_case


def id_generator(route: APIRoute):
    return to_camel_case(route.name)


app = FastAPI(generate_unique_id_function=id_generator)

app.include_router(session_router, prefix="/sessions", tags=["Session"])
app.include_router(quiz_router, prefix="/quizes", tags=["Quiz"])


if config.openapi_export_path:
    openapi = app.openapi()

    openapi_raw = json.dumps(app.openapi())
    with open(config.openapi_export_path, mode="w", encoding="utf-8") as f:
        f.write(openapi_raw)

    print("openapi exported")
