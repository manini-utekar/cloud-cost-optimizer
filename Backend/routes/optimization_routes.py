from fastapi import APIRouter

from services.resource_service import analyze_all_resources

router = APIRouter()


@router.get("/optimization")
def get_optimization():
    return analyze_all_resources()