from datetime import datetime, timezone
from enum import Enum
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


class ItemType(str, Enum):
    product = "product"
    cab_ride = "cab_ride"


class ProductBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    brand: str = Field(..., min_length=1, max_length=80)
    category: str = Field(..., examples=["electronics"])
    price: float = Field(..., gt=0)
    rating: float = Field(..., ge=0, le=5)
    delivery_days: int = Field(..., ge=0, le=30)
    platform: str = Field(..., examples=["Amazon", "Flipkart"])
    product_url: Optional[str] = None
    image_url: Optional[str] = None
    specs: Dict[str, Any] = Field(default_factory=dict)


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = Field(default=None, min_length=2, max_length=120)
    brand: Optional[str] = Field(default=None, min_length=1, max_length=80)
    category: Optional[str] = None
    price: Optional[float] = Field(default=None, gt=0)
    rating: Optional[float] = Field(default=None, ge=0, le=5)
    delivery_days: Optional[int] = Field(default=None, ge=0, le=30)
    platform: Optional[str] = None
    product_url: Optional[str] = None
    image_url: Optional[str] = None
    specs: Optional[Dict[str, Any]] = None


class ProductOut(ProductBase):
    id: str
    created_at: datetime
    updated_at: datetime


class CabRideBase(BaseModel):
    provider: str = Field(..., examples=["Uber", "Ola", "Rapido"])
    source: str
    destination: str
    estimated_price: float = Field(..., gt=0)
    estimated_time_minutes: int = Field(..., gt=0)
    rating: float = Field(..., ge=0, le=5)
    vehicle_type: str = Field(..., examples=["Mini", "Sedan", "Bike"])
    deep_link: Optional[str] = None


class CabRideCreate(CabRideBase):
    pass


class CabRideUpdate(BaseModel):
    provider: Optional[str] = None
    source: Optional[str] = None
    destination: Optional[str] = None
    estimated_price: Optional[float] = Field(default=None, gt=0)
    estimated_time_minutes: Optional[int] = Field(default=None, gt=0)
    rating: Optional[float] = Field(default=None, ge=0, le=5)
    vehicle_type: Optional[str] = None
    deep_link: Optional[str] = None


class CabRideOut(CabRideBase):
    id: str
    created_at: datetime
    updated_at: datetime


class UserCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    firebase_uid: Optional[str] = None
    preferences: Dict[str, Any] = Field(default_factory=dict)


class UserOut(UserCreate):
    id: str
    created_at: datetime
    updated_at: datetime


class FavoriteCreate(BaseModel):
    user_id: str
    item_type: ItemType
    item_id: str
    notes: Optional[str] = Field(default=None, max_length=300)


class FavoriteOut(FavoriteCreate):
    id: str
    created_at: datetime


class SearchHistoryCreate(BaseModel):
    user_id: str
    query: str = Field(..., min_length=1, max_length=200)
    module: ItemType
    filters: Dict[str, Any] = Field(default_factory=dict)
    compared_item_ids: List[str] = Field(default_factory=list)


class SearchHistoryOut(SearchHistoryCreate):
    id: str
    created_at: datetime


class RecommendationOption(BaseModel):
    id: str
    title: str
    platform: str
    price: float = Field(..., gt=0)
    rating: float = Field(..., ge=0, le=5)
    delivery_time: int = Field(..., ge=0)
    metadata: Dict[str, Any] = Field(default_factory=dict)


class RecommendationRequest(BaseModel):
    user_id: Optional[str] = None
    module: ItemType = ItemType.product
    options: List[RecommendationOption] = Field(..., min_length=2)
    preferences: Dict[str, Any] = Field(default_factory=dict)

    @field_validator("options")
    @classmethod
    def require_unique_option_ids(cls, options: List[RecommendationOption]) -> List[RecommendationOption]:
        ids = [option.id for option in options]
        if len(ids) != len(set(ids)):
            raise ValueError("Recommendation option ids must be unique.")
        return options


class RecommendationResponse(BaseModel):
    best_deal_id: str
    best_deal_title: str
    score: float
    reasoning: str
    ranked_options: List[Dict[str, Any]]
    used_ai: bool

