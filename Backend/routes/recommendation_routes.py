from fastapi import APIRouter

from services.resource_service import get_recommendations

router = APIRouter()


@router.get("/recommendations")
def recommendations():
    return get_recommendations()