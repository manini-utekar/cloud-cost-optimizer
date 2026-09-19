from fastapi import FastAPI
import pandas as pd

from routes.resource_routes import router as resource_router


app = FastAPI()

CSV_PATH = "data/cloud_optimization_results.csv"

# Include resource routes
app.include_router(resource_router)


@app.get("/")
def root():
    return {
        "message": "Cloud Cost Optimization API is running"
    }


@app.get("/summary")
def get_summary():

    df = pd.read_csv(CSV_PATH)

    return {
        "total_resources": len(df),

        "total_monthly_cost": float(
            df["monthly_cost"].sum()
        ),

        "idle_resources": int(
            (
                (df["cpu_utilization"] < 10) &
                (df["memory_utilization"] < 20)
            ).sum()
        ),

        "underutilized_resources": int(
            (
                (df["cpu_utilization"] < 30) |
                (df["memory_utilization"] < 30)
            ).sum()
        ),

        "ml_anomalies": int(
            (df["ml_anomaly"] == -1).sum()
        ),

        "estimated_potential_savings": float(
            df["estimated_savings"].sum()
        )
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