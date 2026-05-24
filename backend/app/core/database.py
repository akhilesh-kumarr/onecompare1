import logging

from typing import Optional

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase

from app.core.config import get_settings


client: AsyncIOMotorClient | None = None
database: AsyncIOMotorDatabase | None = None
logger = logging.getLogger(__name__)


async def connect_to_mongo() -> None:
    """Create a MongoDB connection and indexes when the API starts."""
    global client, database
    settings = get_settings()

    if settings.testing:
        return

    if not settings.mongodb_uri:
        logger.warning("MONGODB_URI is missing. Docs and health check will work, but database APIs need MongoDB Atlas.")
        return

    client = AsyncIOMotorClient(settings.mongodb_uri)
    database = client[settings.mongodb_db_name]
    await create_indexes(database)


async def close_mongo_connection() -> None:
    global client, database
    if client is not None:
        client.close()
    client = None
    database = None


def get_database() -> Optional[AsyncIOMotorDatabase]:
    if database is None:
        return None
    return database


async def create_indexes(db: AsyncIOMotorDatabase) -> None:
    await db.products.create_index("category")
    await db.products.create_index([("name", "text"), ("brand", "text")])
    await db.cab_rides.create_index([("source", 1), ("destination", 1)])
    await db.users.create_index("email", unique=True)
    await db.favorites.create_index([("user_id", 1), ("item_type", 1), ("item_id", 1)], unique=True)
    await db.search_history.create_index([("user_id", 1), ("created_at", -1)])
