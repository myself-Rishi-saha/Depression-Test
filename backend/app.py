from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, UTC
import joblib
import pandas as pd
import os
import json
# from services.gemini_service import generate_recommendation
from services.ollama_service import generate_recommendation
from db.repository import save_prediction

app = Flask(__name__)
CORS(app)

# --- Load model + feature order once ---
model = joblib.load("models/depression_svm_x3_model.pkl")
feature_order = joblib.load("data/svm_feature_order.pkl")

LOG_PATH = "data/log.txt"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    # Append log entry
    with open(LOG_PATH, "a", encoding="utf-8") as f:
        f.write(json.dumps({
            "timestamp": datetime.now().isoformat(),
            "request": data
        }) + "\n")

    # print("\n--- Incoming Request ---")
    # print("Raw data:", data)
    # print("------------------------\n")

    # # --- Validate name ---
    # name = data.get("name")
    # if not name:
    #     return jsonify({"error": "Missing name"}), 400

    # --- Generate server timestamp ---
    date_time = datetime.now(UTC).isoformat()

    # --- Prepare features in correct order ---
    try:
        input_features = [data[f] for f in feature_order]
    except KeyError as e:
        return jsonify({"error": f"Missing feature: {str(e)}"}), 400

    df = pd.DataFrame([input_features], columns=feature_order)

    # --- Prediction ---
    prediction = model.predict(df)[0]
    confidence = model.predict_proba(df).max()

    print(f"Prediction: {prediction}, Confidence: {confidence:.4f}")

    # --- Gemini recommendation ---
    # tip = generate_recommendation(prediction, confidence, data)

    # --- Ollama recommendation ← UNCOMMENTED ---
    tip = generate_recommendation(prediction, confidence, data)

    # --- Save to DB ---
    # save_prediction(name, date_time, int(prediction), float(confidence))

    #tip = "This is a placeholder tip."

    # --- Response ---
    return jsonify({
        "prediction": int(prediction),
        "confidence_score": float(confidence),
        "mental_health_tip": tip
    })


if __name__ == "__main__":
    app.run(debug=True)