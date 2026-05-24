# oneCompare Backend

FastAPI backend for the oneCompare price comparison app. It supports electronics products, cab ride comparisons, user favorites, search history, and AI-assisted best deal recommendations.

## Tech Stack

- FastAPI
- MongoDB Atlas
- Motor async MongoDB driver
- Gemini API for AI recommendations
- Postman for API testing
- Firebase-compatible user records through `firebase_uid`

## Database Collections

### `products`

Stores electronics offers from different platforms.

```json
{
  "name": "Noise Buds X",
  "brand": "Noise",
  "category": "electronics",
  "price": 1299,
  "rating": 4.3,
  "delivery_days": 2,
  "platform": "Amazon",
  "product_url": "https://example.com",
  "specs": { "battery": "40h" }
}
```

### `cab_rides`

Stores cab fare options.

```json
{
  "provider": "Uber",
  "source": "College Gate",
  "destination": "City Mall",
  "estimated_price": 220,
  "estimated_time_minutes": 18,
  "rating": 4.5,
  "vehicle_type": "Sedan"
}
```

### `users`

Stores app users and optional Firebase identity.

### `favorites`

Stores saved products or cab rides for each user.

### `search_history`

Stores recent searches and compared item ids.

## Local Setup

Use Python 3.12 for this project. Python 3.14 can force packages such as `pydantic-core` to build from source on Windows, which requires Visual Studio C++ Build Tools.

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```

Update `.env` with your MongoDB Atlas connection string.

Run the API:

```bash
uvicorn app.main:app --reload
```

Open:

- API docs: `http://localhost:8000/docs`
- Health check: `http://localhost:8000/health`

## Key Endpoints

| Feature | Method | Endpoint |
| --- | --- | --- |
| Health | GET | `/health` |
| Create product | POST | `/api/v1/products` |
| List products | GET | `/api/v1/products` |
| Create cab ride | POST | `/api/v1/cab-rides` |
| Create user | POST | `/api/v1/users` |
| Add favorite | POST | `/api/v1/favorites` |
| List favorites | GET | `/api/v1/favorites/{user_id}` |
| Add history | POST | `/api/v1/history` |
| List history | GET | `/api/v1/history/{user_id}` |
| Best deal | POST | `/api/v1/recommendations/best-deal` |

## AI Recommendation Logic

The recommendation service first calculates a practical score:

- Price: cheaper options score higher.
- Rating: higher ratings score higher.
- Speed: faster delivery or travel time scores higher.
- Preferences: users can change `price_weight`, `rating_weight`, and `speed_weight`.

If `GEMINI_API_KEY` is configured, the service sends the scored options to Gemini and asks for a strict JSON answer with the best deal and detailed reasoning. If Gemini is unavailable, it automatically uses the local score so the API still works.

## Postman

Import:

```text
backend/postman/oneCompare.postman_collection.json
```

Set these collection variables after creating records:

- `baseUrl`
- `userId`
- `productId`
- `favoriteId`

## Testing

```bash
cd backend
pytest
```

The included tests cover the health endpoint and recommendation scoring fallback.

## Common Install Error

If you see this error:

```text
Failed building wheel for pydantic-core
link.exe not found
Python reports SOABI: cp314-win_amd64
```

You are using Python 3.14. Install Python 3.12, delete the old `.venv`, and create the virtual environment again with Python 3.12.

## Deployment

See `DEPLOYMENT.md` for Render, Railway, and MongoDB Atlas steps.
