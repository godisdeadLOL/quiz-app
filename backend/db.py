from pymongo import AsyncMongoClient
from config import config

from pymongo.asynchronous.client_session import AsyncClientSession
from pymongo.asynchronous.database import AsyncDatabase

client = AsyncMongoClient(config.mongodb_url)
db = client["quiz-app"]


async def get_db_context():
    session = client.start_session()
    try:
        yield (db, session)
    finally:
        await session.end_session()


type DatabaseContext = tuple[AsyncDatabase, AsyncClientSession]
