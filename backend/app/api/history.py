from datetime import datetime, timezone
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.core.database import get_database
from app.models.schemas import SearchHistoryCreate, SearchHistoryOut
from app.utils.mongo import object_id, serialize_doc

router = APIRouter(prefix="/history", tags=["Search History"])


@router.post("", response_model=SearchHistoryOut, status_code=status.HTTP_201_CREATED)
async def add_search_history(payload: SearchHistoryCreate, db: AsyncIOMotorDatabase = Depends(get_database)):
    user = await db.users.find_one({"_id": object_id(payload.user_id)})
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")

    document = payload.model_dump()
    document["created_at"] = datetime.now(timezone.utc)
    result = await db.search_history.insert_one(document)
    created = await db.search_history.find_one({"_id": result.inserted_id})
    return serialize_doc(created)


@router.get("/{user_id}", response_model=List[SearchHistoryOut])
async def list_user_history(
    user_id: str,
    limit: int = 20,
    db: AsyncIOMotorDatabase = Depends(get_database),
):
    cursor = db.search_history.find({"user_id": user_id}).sort("created_at", -1).limit(limit)
    return [serialize_doc(document) async for document in cursor]


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def clear_user_history(user_id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    await db.search_history.delete_many({"user_id": user_id})
