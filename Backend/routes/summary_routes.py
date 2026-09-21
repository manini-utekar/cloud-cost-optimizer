from fastapi import APIRouter

from services.resource_service import get_resource_summary

router = APIRouter()


@router.get("/summary")
def get_summary():
    return get_resource_summary()