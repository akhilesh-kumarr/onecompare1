from datetime import datetime, timezone
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.core.database import get_database
from app.data.mock_data import MOCK_CAB_RIDES
from app.models.schemas import CabRideCreate, CabRideOut, CabRideUpdate
from app.utils.mongo import object_id, serialize_doc

router = APIRouter(prefix="/cab-rides", tags=["Cab Rides"])


@router.post("", response_model=CabRideOut, status_code=status.HTTP_201_CREATED)
async def create_cab_ride(payload: CabRideCreate, db: AsyncIOMotorDatabase = Depends(get_database)):
    now = datetime.now(timezone.utc)
    document = payload.model_dump()
    document.update({"created_at": now, "updated_at": now})
    result = await db.cab_rides.insert_one(document)
    created = await db.cab_rides.find_one({"_id": result.inserted_id})
    return serialize_doc(created)


@router.get("", response_model=List[CabRideOut])
async def list_cab_rides(
    source: Optional[str] = None,
    destination: Optional[str] = None,
    limit: int = Query(default=20, ge=1, le=100),
    db: Optional[AsyncIOMotorDatabase] = Depends(get_database),
):
    if db is None:
        rides = MOCK_CAB_RIDES
        if source:
            rides = [ride for ride in rides if source.lower() in ride["source"].lower()]
        if destination:
            rides = [ride for ride in rides if destination.lower() in ride["destination"].lower()]
        return sorted(rides, key=lambda ride: ride["estimated_price"])[:limit]

    query: dict = {}
    if source:
        query["source"] = {"$regex": source, "$options": "i"}
    if destination:
        query["destination"] = {"$regex": destination, "$options": "i"}

    cursor = db.cab_rides.find(query).sort("estimated_price", 1).limit(limit)
    return [serialize_doc(document) async for document in cursor]


@router.patch("/{ride_id}", response_model=CabRideOut)
async def update_cab_ride(
    ride_id: str,
    payload: CabRideUpdate,
    db: AsyncIOMotorDatabase = Depends(get_database),
):
    updates = payload.model_dump(exclude_unset=True)
    if not updates:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No fields to update.")

    updates["updated_at"] = datetime.now(timezone.utc)
    await db.cab_rides.update_one({"_id": object_id(ride_id)}, {"$set": updates})
    ride = await db.cab_rides.find_one({"_id": object_id(ride_id)})
    if ride is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cab ride not found.")
    return serialize_doc(ride)


@router.delete("/{ride_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_cab_ride(ride_id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    result = await db.cab_rides.delete_one({"_id": object_id(ride_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cab ride not found.")

