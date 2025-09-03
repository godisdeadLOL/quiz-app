from db import DatabaseContext
from schemas.user import UserModel


async def check_exist_by_name(db_context: DatabaseContext, name: str):
    (db, session) = db_context
    collection = db.get_collection(UserModel.__collection_name__)

    return await collection.count_documents({"name": name}, limit=1, session=session) > 0
