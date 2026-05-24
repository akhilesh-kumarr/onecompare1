import json
import logging
from typing import Any, Dict, List

import google.generativeai as genai

from app.core.config import get_settings
from app.models.schemas import RecommendationRequest, RecommendationResponse

logger = logging.getLogger(__name__)


class RecommendationService:
    """Ranks options locally, then asks Gemini for richer explanation when configured."""

    def __init__(self) -> None:
        self.settings = get_settings()

    def _score_options(self, request: RecommendationRequest) -> List[Dict[str, Any]]:
        options = request.options
        max_price = max(option.price for option in options)
        min_price = min(option.price for option in options)
        max_delivery = max(option.delivery_time for option in options)
        min_delivery = min(option.delivery_time for option in options)

        price_weight = float(request.preferences.get("price_weight", 0.50))
        rating_weight = float(request.preferences.get("rating_weight", 0.30))
        speed_weight = float(request.preferences.get("speed_weight", 0.20))

        ranked = []
        for option in options:
            price_score = 1 if max_price == min_price else (max_price - option.price) / (max_price - min_price)
            rating_score = option.rating / 5
            speed_score = 1 if max_delivery == min_delivery else (max_delivery - option.delivery_time) / (max_delivery - min_delivery)
            final_score = (price_score * price_weight) + (rating_score * rating_weight) + (speed_score * speed_weight)

            ranked.append(
                {
                    "id": option.id,
                    "title": option.title,
                    "platform": option.platform,
                    "price": option.price,
                    "rating": option.rating,
                    "delivery_time": option.delivery_time,
                    "score": round(final_score * 100, 2),
                }
            )

        return sorted(ranked, key=lambda item: item["score"], reverse=True)

    def _fallback_response(self, request: RecommendationRequest, ranked: List[Dict[str, Any]]) -> RecommendationResponse:
        best = ranked[0]
        reasoning = (
            f"{best['title']} from {best['platform']} is the best deal because it has the strongest combined "
            f"score for price, rating, and delivery time. It costs {best['price']}, has a {best['rating']}/5 "
            f"rating, and takes about {best['delivery_time']} day/minute units depending on the module."
        )
        return RecommendationResponse(
            best_deal_id=best["id"],
            best_deal_title=best["title"],
            score=best["score"],
            reasoning=reasoning,
            ranked_options=ranked,
            used_ai=False,
        )

    def _build_prompt(self, request: RecommendationRequest, ranked: List[Dict[str, Any]]) -> str:
        return f"""
You are the deal advisor for oneCompare, a price comparison app.

Choose the best deal from the ranked options. Consider:
- Lowest practical price, not only the cheapest label.
- Customer rating and reliability.
- Delivery time for electronics or pickup/travel time for cab rides.
- User preferences, if present.
- Any suspicious trade-off, such as very low price but poor rating.

Return strict JSON with these keys:
best_deal_id, best_deal_title, score, reasoning, ranked_options.

Module: {request.module}
User preferences: {json.dumps(request.preferences, indent=2)}
Computed ranking: {json.dumps(ranked, indent=2)}
Original options: {request.model_dump_json(indent=2)}
"""

    async def recommend(self, request: RecommendationRequest) -> RecommendationResponse:
        ranked = self._score_options(request)

        if not self.settings.gemini_api_key:
            return self._fallback_response(request, ranked)

        try:
            genai.configure(api_key=self.settings.gemini_api_key)
            model = genai.GenerativeModel(self.settings.gemini_model)
            response = await model.generate_content_async(self._build_prompt(request, ranked))
            parsed = json.loads(response.text.strip().removeprefix("```json").removesuffix("```").strip())
            return RecommendationResponse(
                best_deal_id=parsed["best_deal_id"],
                best_deal_title=parsed["best_deal_title"],
                score=float(parsed["score"]),
                reasoning=parsed["reasoning"],
                ranked_options=parsed.get("ranked_options", ranked),
                used_ai=True,
            )
        except Exception:
            logger.exception("Gemini recommendation failed. Falling back to local scoring.")
            return self._fallback_response(request, ranked)

