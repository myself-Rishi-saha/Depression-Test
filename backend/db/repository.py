from .database import get_db

def save_prediction(input_data, date_time, prediction, confidence, tip):
    db = get_db()
    collection = db["predictions"]

    document = {
        "input_data": input_data,
        "date_time": date_time,
        "prediction": prediction,
        "confidence": confidence,
        "recommendation": tip
    }

    result = collection.insert_one(document)

    return str(result.inserted_id)