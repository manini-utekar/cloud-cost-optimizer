from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.summary_routes import router as summary_router
from routes.resource_routes import router as resource_router
from routes.recommendation_routes import router as recommendation_router
from routes.optimization_routes import router as optimization_router
from routes.ml_routes import router as ml_router


app = FastAPI()


# Allow React frontend to communicate with FastAPI backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include API routes
app.include_router(resource_router)
app.include_router(summary_router)
app.include_router(recommendation_router)
app.include_router(optimization_router)
app.include_router(ml_router)


@app.get("/")
def root():
    return {
        "message": "Cloud Cost Optimization API is running"
    }