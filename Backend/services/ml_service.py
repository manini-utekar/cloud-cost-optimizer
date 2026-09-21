import pandas as pd
from sklearn.ensemble import IsolationForest


def detect_anomalies(resources):
    if len(resources) < 3:
        return resources

    df = pd.DataFrame(resources)

    features = df[
        [
            "cpu_utilization",
            "memory_utilization",
            "monthly_cost"
        ]
    ]

    model = IsolationForest(
        contamination=0.15,
        random_state=42
    )

    df["ml_anomaly"] = model.fit_predict(features)

    return df.to_dict(orient="records")