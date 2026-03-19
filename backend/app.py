from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)

model = joblib.load("depression_svm_x3_model.pkl")
feature_order = joblib.load("svm_feature_order.pkl")

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json
    print("Incoming JSON:", data)
    print("Expected features:", feature_order)

    import pandas as pd

    input_features = [data[f] for f in feature_order]

    df = pd.DataFrame([input_features], columns=feature_order)

    prediction = model.predict(df)[0]
    probability = model.predict_proba(df).max()

    return jsonify({
        "prediction": int(prediction),
        "confidence": float(probability)
    })

if __name__ == "__main__":
    app.run(debug=True)