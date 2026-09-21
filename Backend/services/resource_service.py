from database.mongodb import resources_collection
from models.resource_model import Resource
from services.optimization_service import analyze_resource
from services.ml_service import detect_anomalies

def add_resource(resource: Resource):
    resource_data = resource.model_dump()

    result = resources_collection.insert_one(resource_data)

    return str(result.inserted_id)


def get_all_resources():
    resources = list(resources_collection.find({}, {"_id": 0}))

    return resources

def get_resource_summary():
    resources = list(resources_collection.find({}, {"_id": 0}))

    # Run the actual Isolation Forest model
    analyzed_resources = detect_anomalies(resources)

    total_resources = len(resources)

    total_monthly_cost = sum(
        resource.get("monthly_cost", 0)
        for resource in resources
    )

    idle_resources = sum(
        1
        for resource in resources
        if resource.get("cpu_utilization", 0) < 10
        and resource.get("memory_utilization", 0) < 20
    )

    underutilized_resources = sum(
        1
        for resource in resources
        if resource.get("cpu_utilization", 0) < 30
        or resource.get("memory_utilization", 0) < 30
    )

    # Count anomalies detected by Isolation Forest
    ml_anomalies = sum(
        1
        for resource in analyzed_resources
        if resource.get("ml_anomaly") == -1
    )

    estimated_potential_savings = sum(
        resource.get("estimated_savings", 0)
        for resource in resources
    )

    return {
        "total_resources": total_resources,
        "total_monthly_cost": total_monthly_cost,
        "idle_resources": idle_resources,
        "underutilized_resources": underutilized_resources,
        "ml_anomalies": ml_anomalies,
        "estimated_potential_savings": estimated_potential_savings
    }

def get_recommendations():
    resources = list(
        resources_collection.find({}, {"_id": 0})
    )

    analyzed_resources = []

    for resource in resources:
        result = analyze_resource(resource)

        if result["recommendation"] != "No optimization required":
            analyzed_resources.append(result)

    return analyzed_resources

def analyze_all_resources():
    resources = list(
        resources_collection.find({}, {"_id": 0})
    )

    analyzed_resources = []

    for resource in resources:
        result = analyze_resource(resource)
        analyzed_resources.append(result)

    return analyzed_resources

def get_resources_with_anomalies():
    resources = list(
        resources_collection.find({}, {"_id": 0})
    )

    return detect_anomalies(resources)