from pydantic import BaseModel


class Resource(BaseModel):
    resource_id: str
    resource_type: str
    region: str
    cpu_utilization: float
    memory_utilization: float
    monthly_cost: float