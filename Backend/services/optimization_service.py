def analyze_resource(resource):
    cpu = resource.get("cpu_utilization", 0)
    memory = resource.get("memory_utilization", 0)
    monthly_cost = resource.get("monthly_cost", 0)
    ml_anomaly = resource.get("ml_anomaly", 1)

    # Idle resource
    if cpu < 10 and memory < 20:
        recommendation = "Stop or terminate resource"
        estimated_savings = monthly_cost * 0.80

    # Underutilized resource
    elif cpu < 30 or memory < 30:
        recommendation = "Consider downsizing resource"
        estimated_savings = monthly_cost * 0.40

    # ML anomaly with high utilization
    elif ml_anomaly == -1 and cpu > 70 and memory > 70:
        recommendation = "Review capacity and performance"
        estimated_savings = 0

    # Other ML anomaly
    elif ml_anomaly == -1:
        recommendation = "Review resource usage pattern"
        estimated_savings = 0

    # Normal resource
    else:
        recommendation = "No optimization required"
        estimated_savings = 0

    return {
        "resource_id": resource.get("resource_id"),
        "resource_type": resource.get("resource_type"),
        "region": resource.get("region"),
        "cpu_utilization": cpu,
        "memory_utilization": memory,
        "monthly_cost": monthly_cost,
        "recommendation": recommendation,
        "estimated_savings": round(estimated_savings, 2)
    }