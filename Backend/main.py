from fastapi import FastAPI
import pandas as pd
from routes.summary_routes import router as summary_router
from routes.resource_routes import router as resource_router
from routes.recommendation_routes import router as recommendation_router
from routes.optimization_routes import router as optimization_router
from routes.ml_routes import router as ml_router

app = FastAPI()

CSV_PATH = "data/cloud_optimization_results.csv"

# Include resource routes
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




@app.get("/recommendations")
def get_recommendations():

    df = pd.read_csv(CSV_PATH)

    recommendations = df[
        df["recommendation"] != "No optimization required"
    ]

    return recommendations[
        [
            "resource_id",
            "resource_type",
            "region",
            "cpu_utilization",
            "memory_utilization",
            "monthly_cost",
            "recommendation",
            "estimated_savings"
        ]
    ].to_dict(orient="records")