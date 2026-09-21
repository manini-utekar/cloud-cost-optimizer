def analyze_resource(resource):
    cpu = resource.get("cpu_utilization", 0)
    memory = resource.get("memory_utilization", 0)
    monthly_cost = resource.get("monthly_cost", 0)

    # Idle resource
    if cpu < 10 and memory < 20:
        recommendation = "Stop resource"
        estimated_savings = monthly_cost

    # Underutilized resource
    elif cpu < 30 or memory < 30:
        recommendation = "Consider downsizing"
        estimated_savings = monthly_cost * 0.30

    # High resource usage
    elif cpu > 80 or memory > 80:
        recommendation = "Consider scaling"
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