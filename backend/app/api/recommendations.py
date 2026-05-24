from fastapi import APIRouter, status

from app.models.schemas import RecommendationRequest, RecommendationResponse
from app.services.recommendation_service import RecommendationService

router = APIRouter(prefix="/recommendations", tags=["AI Recommendations"])


@router.post("/best-deal", response_model=RecommendationResponse, status_code=status.HTTP_200_OK)
async def get_best_deal(payload: RecommendationRequest):
    service = RecommendationService()
    return await service.recommend(payload)

