from datetime import datetime, timezone
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.core.database import get_database
from app.data.mock_data import MOCK_PRODUCTS
from app.models.schemas import ProductCreate, ProductOut, ProductUpdate
from app.utils.mongo import object_id, serialize_doc

router = APIRouter(prefix="/products", tags=["Products"])


@router.post("", response_model=ProductOut, status_code=status.HTTP_201_CREATED)
async def create_product(payload: ProductCreate, db: AsyncIOMotorDatabase = Depends(get_database)):
    now = datetime.now(timezone.utc)
    document = payload.model_dump()
    document.update({"created_at": now, "updated_at": now})
    result = await db.products.insert_one(document)
    created = await db.products.find_one({"_id": result.inserted_id})
    return serialize_doc(created)


@router.get("", response_model=List[ProductOut])
async def list_products(
    category: Optional[str] = None,
    search: Optional[str] = None,
    limit: int = Query(default=20, ge=1, le=100),
    db: Optional[AsyncIOMotorDatabase] = Depends(get_database),
):
    if db is None:
        products = MOCK_PRODUCTS
        if category:
            products = [product for product in products if product["category"] == category]
        if search:
            normalized = search.lower()
            products = [
                product
                for product in products
                if normalized in product["name"].lower()
                or normalized in product["brand"].lower()
                or normalized in " ".join(str(value) for value in product["specs"].values()).lower()
            ]
        return products[:limit]

    query: dict = {}
    if category:
        query["category"] = category
    if search:
        query["$text"] = {"$search": search}

    cursor = db.products.find(query).sort("price", 1).limit(limit)
    return [serialize_doc(document) async for document in cursor]


@router.get("/{product_id}", response_model=ProductOut)
async def get_product(product_id: str, db: Optional[AsyncIOMotorDatabase] = Depends(get_database)):
    if db is None:
        product = next((item for item in MOCK_PRODUCTS if item["id"] == product_id), None)
        if product is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found.")
        return product

    product = await db.products.find_one({"_id": object_id(product_id)})
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found.")
    return serialize_doc(product)


@router.patch("/{product_id}", response_model=ProductOut)
async def update_product(
    product_id: str,
    payload: ProductUpdate,
    db: AsyncIOMotorDatabase = Depends(get_database),
):
    updates = payload.model_dump(exclude_unset=True)
    if not updates:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No fields to update.")

    updates["updated_at"] = datetime.now(timezone.utc)
    await db.products.update_one({"_id": object_id(product_id)}, {"$set": updates})
    product = await db.products.find_one({"_id": object_id(product_id)})
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found.")
    return serialize_doc(product)


@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(product_id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    result = await db.products.delete_one({"_id": object_id(product_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found.")

