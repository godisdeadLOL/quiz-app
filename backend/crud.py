from typing import List, Literal, Type, TypeVar

from pydantic import BaseModel, TypeAdapter
from db import DatabaseContext

T = TypeVar("T", bound=BaseModel)
type CollectionName = Literal["sessions"]


async def get_by_id(db_context: DatabaseContext, name: CollectionName, Model: Type[T], id: str):
    (db, _) = db_context
    collection = db.get_collection(name)

    entry_raw = await collection.find_one({"id": id})
    if not entry_raw:
        return None

    return Model.model_validate(entry_raw)


async def get_many_by_ids(db_context: DatabaseContext, name: CollectionName, Model: Type[T], session_ids: list[str]) -> list[T]:
    (db, _) = db_context
    collection = db.get_collection("sessions")

    quiz_sessions_raw = await collection.find({"id": {"$in": session_ids}}).to_list()

    type_adapter = TypeAdapter(list[Model])
    quiz_sessions: list[T] = type_adapter.validate_python(quiz_sessions_raw)

    return quiz_sessions
