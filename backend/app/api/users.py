from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from pymongo.errors import DuplicateKeyError

from app.core.database import get_database
from app.models.schemas import UserCreate, UserOut
from app.utils.mongo import object_id, serialize_doc

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("", response_model=UserOut, status_code=status.HTTP_201_CREATED)
async def create_user(payload: UserCreate, db: AsyncIOMotorDatabase = Depends(get_database)):
    now = datetime.now(timezone.utc)
    document = payload.model_dump()
    document.update({"created_at": now, "updated_at": now})

    try:
        result = await db.users.insert_one(document)
    except DuplicateKeyError as exc:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already exists.") from exc

    created = await db.users.find_one({"_id": result.inserted_id})
    return serialize_doc(created)


@router.get("/{user_id}", response_model=UserOut)
async def get_user(user_id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    user = await db.users.find_one({"_id": object_id(user_id)})
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")
    return serialize_doc(user)

