from database.mongodb import resources_collection
from models.resource_model import Resource


def add_resource(resource: Resource):
    resource_data = resource.model_dump()

    result = resources_collection.insert_one(resource_data)

    return str(result.inserted_id)


def get_all_resources():
    resources = list(resources_collection.find({}, {"_id": 0}))

    return resources