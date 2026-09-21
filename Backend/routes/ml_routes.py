from fastapi import APIRouter

from services.resource_service import get_resources_with_anomalies

router = APIRouter()


@router.get("/anomalies")
def get_anomalies():
    return get_resources_with_anomalies()