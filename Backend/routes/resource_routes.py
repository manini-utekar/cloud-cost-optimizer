from fastapi import APIRouter
from models.resource_model import Resource
from services.resource_service import add_resource, get_all_resources


router = APIRouter()


@router.post("/resources")
def create_resource(resource: Resource):
    resource_id = add_resource(resource)

    return {
        "message": "Resource added successfully",
        "id": resource_id
    }


@router.get("/resources")
def get_resources():
    return get_all_resources()



