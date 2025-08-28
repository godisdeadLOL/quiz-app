from fastapi import FastAPI

from routers.session import router as session_router
from routers.quiz import router as quiz_router

app = FastAPI()

app.include_router(session_router, prefix="/sessions", tags=["Session"])
app.include_router(quiz_router, prefix="/quizes", tags=["Quiz"])
