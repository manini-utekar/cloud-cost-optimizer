import pandas as pd
from database.mongodb import resources_collection

CSV_PATH = "data/cloud_optimization_results.csv"

# Read CSV
df = pd.read_csv(CSV_PATH)

# Convert data to dictionaries
resources = df.to_dict(orient="records")

# Insert into MongoDB
if resources:
    resources_collection.insert_many(resources)

print(f"{len(resources)} resources added to MongoDB!")