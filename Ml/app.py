from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import json
import numpy as np
import pandas as pd

# Load model and meta
model = joblib.load('fraud_model.pkl')
with open('model_meta.json', 'r') as f:
    meta = json.load(f)

FEATURES = meta['features']
THRESHOLD = meta['threshold']

app = FastAPI()

# Input schema
class Transaction(BaseModel):
    F115: float = 0.0
    F321: float = 0.0
    F527: float = 0.0
    F531: float = 0.0
    F670: float = 0.0
    F1692: float = 0.0
    F2082: float = 0.0
    F2122: float = 0.0
    F2582: float = 0.0
    F2678: float = 0.0
    F2737: float = 0.0
    F2956: float = 0.0
    F3836: float = 0.0
    F3887: float = 0.0
    F3889: float = 0.0
    F3891: float = 0.0
    F3894: float = 0.0

@app.get("/")
def root():
    return {"status": "Fraud Detection API is running"}

@app.post("/score")
def score(txn: Transaction):
    # Make dataframe
    input_data = pd.DataFrame([txn.dict()])[FEATURES]

    # Predict
    proba = model.predict_proba(input_data)[0][1]
    is_fraud = int(proba >= THRESHOLD)

    # Risk level
    if proba >= 0.6:
        risk = "HIGH"
    elif proba >= 0.3:
        risk = "MEDIUM"
    else:
        risk = "LOW"

    return {
        "fraud_score": round(float(proba), 4),
        "is_fraud": is_fraud,
        "risk_level": risk,
        "threshold_used": THRESHOLD
    }
