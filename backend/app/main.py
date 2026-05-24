from contextlib import asynccontextmanager

from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api import cab_rides, favorites, history, products, recommendations, users
from app.core.config import get_settings
from app.core.database import close_mongo_connection, connect_to_mongo
from app.core.logging_config import configure_logging


settings = get_settings()
configure_logging()


@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    yield
    await close_mongo_connection()


app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
    description="Backend API for oneCompare electronics and cab fare comparison.",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(RuntimeError)
async def runtime_exception_handler(request: Request, exc: RuntimeError):
    return JSONResponse(
        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        content={"detail": str(exc)},
    )


@app.get("/health", tags=["System"])
async def health_check():
    return {"status": "ok", "service": settings.app_name}


app.include_router(products.router, prefix="/api/v1")
app.include_router(cab_rides.router, prefix="/api/v1")
app.include_router(users.router, prefix="/api/v1")
app.include_router(favorites.router, prefix="/api/v1")
app.include_router(history.router, prefix="/api/v1")
app.include_router(recommendations.router, prefix="/api/v1")

