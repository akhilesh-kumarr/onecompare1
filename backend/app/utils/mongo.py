from datetime import datetime
from typing import Any, Dict

from bson import ObjectId
from fastapi import HTTPException, status


def object_id(id_value: str) -> ObjectId:
    if not ObjectId.is_valid(id_value):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid MongoDB id.")
    return ObjectId(id_value)


def serialize_doc(document: Dict[str, Any] | None) -> Dict[str, Any] | None:
    if document is None:
        return None

    result = dict(document)
    result["id"] = str(result.pop("_id"))

    for key, value in result.items():
        if isinstance(value, ObjectId):
            result[key] = str(value)
        if isinstance(value, datetime):
            result[key] = value

    return result

