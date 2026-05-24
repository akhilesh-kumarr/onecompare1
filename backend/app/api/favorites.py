from datetime import datetime, timezone
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from pymongo.errors import DuplicateKeyError

from app.core.database import get_database
from app.models.schemas import FavoriteCreate, FavoriteOut, ItemType
from app.utils.mongo import object_id, serialize_doc

router = APIRouter(prefix="/favorites", tags=["Favorites"])


async def ensure_item_exists(db: AsyncIOMotorDatabase, item_type: ItemType, item_id: str) -> None:
    collection = db.products if item_type == ItemType.product else db.cab_rides
    item = await collection.find_one({"_id": object_id(item_id)})
    if item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Favorite item not found.")


@router.post("", response_model=FavoriteOut, status_code=status.HTTP_201_CREATED)
async def add_favorite(payload: FavoriteCreate, db: AsyncIOMotorDatabase = Depends(get_database)):
    user = await db.users.find_one({"_id": object_id(payload.user_id)})
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")
    await ensure_item_exists(db, payload.item_type, payload.item_id)

    document = payload.model_dump()
    document["created_at"] = datetime.now(timezone.utc)

    try:
        result = await db.favorites.insert_one(document)
    except DuplicateKeyError as exc:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Item already saved.") from exc

    favorite = await db.favorites.find_one({"_id": result.inserted_id})
    return serialize_doc(favorite)


@router.get("/{user_id}", response_model=List[FavoriteOut])
async def list_user_favorites(user_id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    cursor = db.favorites.find({"user_id": user_id}).sort("created_at", -1)
    return [serialize_doc(document) async for document in cursor]


@router.delete("/{favorite_id}", status_code=status.HTTP_204_NO_CONTENT)
async def remove_favorite(favorite_id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    result = await db.favorites.delete_one({"_id": object_id(favorite_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Favorite not found.")

