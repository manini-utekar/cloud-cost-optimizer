from models.resource_model import Resource
from services.resource_service import add_resource


resource = Resource(
    resource_id="EC2-001",
    resource_type="EC2",
    region="ap-south-1",
    cpu_utilization=18,
    memory_utilization=25,
    monthly_cost=42.50
)

resource_id = add_resource(resource)

print("Resource added successfully!")
print("MongoDB ID:", resource_id)